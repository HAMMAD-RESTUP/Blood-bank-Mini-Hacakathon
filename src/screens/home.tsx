import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import HomeImage from "../assets/bg1.png";

import { fbLogin } from "../config/firebasemethods";
import Logo from "../assets/blood_507559.png";

export default function Home() {
    const navigate = useNavigate();

    const [model, setModel] = useState<any>({});
    const [error, setError] = useState<string | null>(null);

    const fillModel = (key: string, val: any) => {
        model[key] = val;
        setModel({ ...model });
    };

    const loginUser = (e: any) => {
        e.preventDefault();
        fbLogin(model)
            .then((res: any) => {
                console.log(res);
                if (res.Usertype == "donor") {
                    navigate("/donor");
                } else {
                    navigate("/acceptor");
                }
                setModel({ email: '', password: '' });
                setError(null); // Reset error message on successful login
            })
            .catch((err: any) => {
                console.log(err);
                if (err.code === "auth/user-not-found") {
                    setError("User not registered. Please sign up.");
                } else if (err.code === "auth/wrong-password" || err.code === "auth/invalid-email") {
                    setError("Incorrect email or password. Please try again.");
                } else {
                    setError("Please Enter correct login Credentials");
                }
            });
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <Typography sx={{ fontSize: "40px", textAlign: "Center", marginTop: "30px", fontWeight: "800" }}>
                        Welcome to Blood Bank
                    </Typography>

                    <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 mt-10">
                        <img className="h-screen h-[600px] w-[100%] d-flex justify-content-center align-items-center flex-column " src={HomeImage} alt="homeimage" />
                    </div>

                    <div className="h-screen d-flex justify-content-center align-items-center flex-column col-xs-12 col-sm-12 col-md-5 col-lg-5 ">
                        <Typography sx={{ fontSize: "30px" }}>
                            <img className=" h-[60px]" src={Logo} alt="" /> Login
                        </Typography>
                        <form onSubmit={(e) => loginUser(e)}>
                            <div className="py-1">
                                <input
                                    value={model.email}
                                    onChange={(e) => fillModel("email", e.target.value)}
                                    className="form-control"
                                    placeholder="Email"
                                    type="email"
                                />
                            </div>
                            <div className="py-3">
                                <input
                                    value={model.password}
                                    onChange={(e) => fillModel("password", e.target.value)}
                                    className="form-control"
                                    placeholder="Password"
                                    type="password"
                                />
                            </div>
                            <div className="py-3">
                                <button
                                    onClick={loginUser}
                                    className="btn w-100 btn-block btn-danger"
                                >
                                    Login
                                </button>
                            </div>
                            {error && <div className="text-danger">{error}</div>}
                            <div className="py-1">
                                <Link to="/signup">Create Account?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
