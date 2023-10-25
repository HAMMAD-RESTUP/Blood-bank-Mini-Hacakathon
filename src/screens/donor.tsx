import { useEffect, useState } from "react";
import { fbAdd, fbGet, fbLogout } from "../config/firebasemethods";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import donoricon from "../assets/bloodacceptor.png"

export default function Donor() {
  const [donor, setdonor] = useState<any[]>([]);
  const [model, setModel] = useState<any>({
    Name: '',
    Father: '',
    Cnic: '',
    Contact: '',
    Bloodgroup: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const getdonor = () => {
    fbGet("users")
      .then((res: any) => {
        console.log(res);
        setdonor(res);
        console.log(donor)
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getdonor();
  }, []);

  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const logOut = () => {
    fbLogout().then(() => {
      navigate("/");
    });
  };

  const fillModel = (key: string, val: any) => {
    setModel({ ...model, [key]: val });
  };

  const donate = (e: any) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!model.Name || !model.Father || !model.Cnic || !model.Contact || !model.Bloodgroup) {
      setErrorMessage('Please fill all input fields.');
      return;
    }

    // Clear previous error message
    setErrorMessage('');

    // Continue with donation logic
    fbAdd("donor", model)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });

    // Clear the form
    setModel({
      Name: '',
      Father: '',
      Cnic: '',
      Contact: '',
      Bloodgroup: '',
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    
    console.log(event.target.value);
  };
  console.log(handleChange)

  return (
    <>
      
      <AppBar position="static" sx={{ backgroundColor: '#dc3545' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                         Blood Donors
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                {/* <MenuIcon /> */}
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                      
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                           Blood Donors
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={logOut}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>


      <div className="h-screen d-flex justify-content-center align-items-center flex-column">
        <Typography sx={{ fontSize: "30px" }}> <img className="h-[100px] m-auto" src={donoricon} alt="" />   Donor Medical Information</Typography>
        <form onSubmit={(e) => donate(e)}>
          <div className="py-1">
            <input
              value={model.Name}
              onChange={(e) => fillModel("Name", e.target.value)}
              className="form-control"
              placeholder="Name"
              type="text"
            />
          </div>
          <div className="py-1">
            <input
              value={model.Father}
              onChange={(e) => fillModel("Father", e.target.value)}
              className="form-control"
              placeholder="Father Name"
              type="text"
            />
          </div>
          <div className="py-1">
            <input
              value={model.Cnic}
              onChange={(e) => fillModel("Cnic", e.target.value)}
              className="form-control"
              placeholder="CNIC"
              type="number"
            />
          </div>
          <div className="py-1">
            <input
              value={model.Contact}
              onChange={(e) => fillModel("Contact", e.target.value)}
              className="form-control"
              placeholder="Contact"
              type="number"
            />
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
            <p style={{ color: 'red' }}>{errorMessage}</p>
            <button
              className="btn w-100 btn-block btn-danger"
            >
              Donate Now
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
