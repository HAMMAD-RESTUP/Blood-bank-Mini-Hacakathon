import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Pagenotfound from "../screens/notfound";
import Home from "../screens/home";
import SignUp from "../screens/signup";
import Donor from "../screens/donor";
import Acceptor from "../screens/acceptor";
import GroupA from "../screens/bloodgroups/groupa";
import GroupB from "../screens/bloodgroups/groupb";
import GroupAB from "../screens/bloodgroups/groupab";
import GroupO from "../screens/bloodgroups/groupo";
import Protected from "../screens/protected";




export default function AppRouter() {
    return (

        <Router>
            <Routes>
            <Route path="/" element={<Home/>}  />
            <Route path="signup" element={<SignUp/>}  />
            <Route path="donor" element={< Protected Screen= {Donor}/>}  />
            <Route path="acceptor" element={< Protected Screen = {Acceptor}/>}  />
            <Route path="groupa" element={< Protected Screen={GroupA}/>}  />
            <Route path="groupb" element={<Protected Screen={GroupB}/>}  />
            <Route path="groupab" element={<Protected Screen={GroupAB}/>}  />
            <Route path="groupo" element={<Protected Screen={GroupO}/>}  />
            <Route path="*" element={<Pagenotfound/>}  />
            </Routes>
        </Router>


    );
}