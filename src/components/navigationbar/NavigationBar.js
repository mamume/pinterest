import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Button from '@mui/material/Button';
import { makeStyles } from "@mui/styles";
import { Link } from 'react-router-dom';
//import {Redirect } from 'react-router';
import React, { useEffect, useContext, Fragment, useState } from "react";
import { UserContext } from "../../context";
import { Stack } from '@mui/material';




const useStyles = makeStyles({
  link: {
    textDecoration: "inherit",
    color: "inherit",
    '&:hover': {
      textDecoration: "inherit",
    }
  },
});

export default function PrimarySearchAppBar(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [, setMobileMoreAnchorEl] = React.useState(null);
  const { authedUser, headers } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [reserve, setReserve] = useState([])
  // const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
    //setReserve(...props.pins)
    let res = []
    for (let i = 0; i < props.pins.length; i++) {
      if (props.pins[i].title === searchValue) {
        res.push(props.pins[i])
      }
    }
    props.setPins(res);

  }

  useEffect(() => {
    //if (authedUser)
    //setReserve(...props.pins)
  }, [props.pin])

  useEffect(() => {
    if (props.pins !== reserve && !submitted) {
      setReserve(props.pins)
    }
    console.log(reserve);
    if (searchValue === "" && submitted) {
      setSubmitted(false)
      props.setPins(reserve)
    }
  }, [searchValue, submitted])





  //const [formData, setFormData] = useState({email: "", password: "", age:"", username={}, gender: "", country: "", language: "", loginEmail: "", loginPassword: ""})

  useEffect(() => {
    // console.log(authedUser)
    try {
      setProfilePicture(authedUser.profile_pic)
    }
    catch (err) {
    }

  }, [authedUser, headers]);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { runAuth } = props;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    localStorage.setItem("pinterestAccessToken", "")
    localStorage.setItem("pinterestRefreshToken", "")
    setAnchorEl(null);
    handleMobileMenuClose();
    // return <Navigate to='/'/>;

    window.location.href = "/"

  }



  // useEffect( ()=> {

  //   //setUpdate(1);

  // },[headers])


  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu style={{ zIndex: 1000001 }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <Link to="/profile" className={classes.link}>
        <MenuItem onClick={handleMenuClose}>
          Profile
        </MenuItem>
      </Link>

      <MenuItem onClick={handleLogout}>
        Logout
      </MenuItem>

    </Menu>
  );

  // const mobileMenuId = 'primary-search-account-menu-mobile';
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  // {/* <MenuItem>
  //       <IconButton size="large" aria-label="show 4 new mails" color="inherit">
  //         <Badge badgeContent={4} color="error">
  //           <MailIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Messages</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton
  //         size="large"
  //         aria-label="show 17 new notifications"
  //         color="inherit"
  //       >
  //         <Badge badgeContent={17} color="error">
  //           <NotificationsIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Notifications</p>
  //     </MenuItem> */}
  //   <MenuItem onClick={handleProfileMenuOpen}>
  //     <IconButton
  //       size="large"
  //       aria-label="account of current user"
  //       aria-controls="primary-search-account-menu"
  //       aria-haspopup="true"
  //       color="inherit"
  //     >
  //       <AccountCircle />
  //     </IconButton>
  //     <p>Profile</p>
  //   </MenuItem>
  // </Menu>
  // );

  return (
    <Box sx={{ flexGrow: 1 }} style={{ margin: 0, position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1250 }}>

      <AppBar position="static" color="text">
        <Toolbar>
          <Link to="/">
            <LogoWrapper>
              <IconButton>
                <PinterestIcon />
              </IconButton>
            </LogoWrapper>


          </Link>

          <SearchWrapper>

            <SearchBarWrapper>
              <IconButton>
                <SearchIcon></SearchIcon>
              </IconButton>

              <form onSubmit={(e) => { handleSubmit(e) }}>
                <input type="text" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} placeholder="Search..." />
                <button type="submit" >Submit</button>
              </form>

            </SearchBarWrapper>
          </SearchWrapper>
          {authedUser ?
            (<Fragment>
              <Box sx={{ display: { md: 'flex' } }}>
                {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {authedUser ? <Avatar alt="Remy Sharp" src={profilePicture} /> : <div></div>}
                </IconButton>
              </Box>
              {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box> */}
              {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 2 }}
          >
            <KeyboardArrowDownIcon />
          </IconButton> */}


            </Fragment>) : (<Stack marginX={1} spacing={1} direction="row">

              <Button onClick={() => runAuth("signup")}>Signup</Button>
              <Button variant="outlined" onClick={() => runAuth("login")}>Signin</Button>
            </Stack>)}





        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {renderMenu}

    </Box >
  );
};



const SearchWrapper = styled.div`
    flex: 1;
`
const LogoWrapper = styled.div`
    .MuiSvgIcon-root{
        color: #e60023;
        font-size: 32px;
        cursor: pointer;
    }
`

const SearchBarWrapper = styled.div`
    background-color: #efefef;
    display: flex;
    height: 48px;
    width: 100%;
    border-radius: 50px;
    border: none;

    form{
        display: flex;
        flex: 1;
    }
    form > input{
        background-color: transparent;
        border: none;
        width: 100%;
        margin-left: 5px;
        font-size: 16px;
    }

    form > button{
        display: none;

    }

    input:focus{
        outline: none;
    }
`

