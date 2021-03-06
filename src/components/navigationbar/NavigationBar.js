import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Button from '@mui/material/Button';
import { makeStyles } from "@mui/styles";
import { Link } from 'react-router-dom';
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
  const { authedUser, headers, loading } = useContext(UserContext);
  const [reserve, setReserve] = useState([])
  const [profilePicture, setProfilePicture] = useState("")

  const handleSubmit = (e) => e.preventDefault();

  useEffect(() => {
    if (props.pins.length > reserve.length)
      setReserve(props.pins)
  }, [props.pins, reserve.length])

  function search(e) {
    if (e.target.value === '') {
      props.setPins(reserve)
    }
    else {
      let res = []
      for (let i = 0; i < reserve.length; i++) {
        if (reserve[i].title.toLowerCase().includes(e.target.value.toLowerCase()))
          res.push(reserve[i])
      }
      props.setPins(res);
    }
  }

  useEffect(() => {
    try {
      setProfilePicture(authedUser.profile_pic)
    }
    catch (err) {
    }

  }, [authedUser, headers]);

  const isMenuOpen = Boolean(anchorEl);
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
    window.location.href = "/app/"
  }

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

      <Link to="/app/profile/" className={classes.link}>
        <MenuItem onClick={handleMenuClose}>
          Profile
        </MenuItem>
      </Link>

      <Link to="/app/settings/" className={classes.link}>
        <MenuItem onClick={handleMenuClose}>
          Settings
        </MenuItem>
      </Link>

      <MenuItem onClick={handleLogout}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      color="text"
      sx={{ boxShadow: '0px 0px', mx: 1.9 }}
    >
      <Toolbar>
        <Link to="/">
          <LogoWrapper>
            <IconButton>
              <PinterestIcon />
            </IconButton>
          </LogoWrapper>
        </Link>

        {!loading && authedUser
          ?
          <Fragment>
            <SearchWrapper>
              <SearchBarWrapper>
                <IconButton>
                  <SearchIcon></SearchIcon>
                </IconButton>

                <form onSubmit={(e) => { handleSubmit(e) }}>
                  <input
                    type="text"
                    onChange={search}
                    placeholder="Search..."
                  />
                </form>
              </SearchBarWrapper>
            </SearchWrapper>

            <Box sx={{ display: { md: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="Profile Picture" src={profilePicture} />
              </IconButton>
            </Box>
            {renderMenu}
          </Fragment>
          :
          <Stack width={'100%'} marginX={1} spacing={1} direction="row-reverse">
            <Button onClick={() => runAuth("signup")}>Signup</Button>
            <Button variant="outlined" onClick={() => runAuth("login")}>Sign in</Button>
          </Stack>
        }
      </Toolbar>
    </AppBar>
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