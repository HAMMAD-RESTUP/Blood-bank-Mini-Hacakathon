import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fbSignUp } from "../config/firebasemethods"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Logo from "../assets/blood_507559.png"

import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SignUp() {
  const [model, setModel] = useState<any>({});

  const fillModel = (key: string, val: any) => {
    model[key] = val;
    setModel({ ...model });
  };

  const navigate = useNavigate();
  const userSignUp = () => {
    
    fbSignUp(model)
      .then((res: any) => {
        if (model.Usertype == "donor") {
          navigate("/donor");
        } else if(model.Usertype == "acceptor") {
          navigate("/acceptor");
        }
        console.log(res)
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="h-screen w-[100%] d-flex justify-content-center align-items-center flex-column">
      <Typography sx={{ fontSize: "30px" }}> <img className="h-[60px]" src={Logo} alt="" />  Sign Up</Typography>
<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
<div className="py-1">
          <input
            value={model.userName}
            onChange={(e) => fillModel("userName", e.target.value)}
            className="form-control"
            placeholder="User Name"
            type="userName"
          />
        </div>
        <div className="py-1">
          <input
            value={model.email}
            onChange={(e) => fillModel("email", e.target.value)}
            className="form-control"
            placeholder="Email"
            type="email"
          />
        </div>

      
        <div className="py-1">
          <input
            value={model.password}
            onChange={(e) => fillModel("password", e.target.value)}
            className="form-control"
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="py-1">
          <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-filled-label">Select UserType</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={model.Usertype}
              onChange={(e) => fillModel("Usertype", e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="donor">Donor</MenuItem>
              <MenuItem value="acceptor">Acceptor</MenuItem>

            </Select>
          </FormControl>
        </div>
        <div className="py-1">
          <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-filled-label">Select Blood Group</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={model.Bloodgroup}
              onChange={(e) => fillModel("Bloodgroup", e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Blood A">Group A </MenuItem>
              <MenuItem value="Blood B">Group B </MenuItem>
              <MenuItem value="Blood AB">Group AB </MenuItem>
              <MenuItem value="Blood O">Group O</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="py-1">
          <button
            onClick={userSignUp}
            className="btn w-100 btn-block btn-danger"
          >
            Sign Up
          </button>
        </div>
        <div className="py-1">
          <Link to="/">Already Registered?</Link>
        </div>
      </div>
      </div>
    </>
  );
}