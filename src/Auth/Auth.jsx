import React from "react";
import Main from "./Main";
import LoginUnSaved from "./LoginUnSaved";
import './Auth.css'
import axiosInstance from '../axios/Base'
import axiosFetchInstance from "../axios/Fetch";

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.loginUnSavedRef = React.createRef()
    this.loginSavedRef = React.createRef()
    this.state = {
      open: false,
      Cscreen: "main",
      email: "",
      password: "",
      age: "",
      username: "",
      gender: "",
      country: "",
      language: "",
      loginEmail: "",
      loginPassword: "",
    }
  }

  handleClickOpen = (type) => {
    this.setState({ open: true })

    if (type === "signup")
      this.switchScreen("main")
    else if (type === "login")
      this.switchScreen("unsavedLogin")
  };

  handleClose = () => {
    this.setState({ open: false });
  }

  collectFromMain = (obj) => {
    const user = {
      email: obj.email,
      username: obj.username,
      password: obj.password
    }

    const jsonUser = JSON.stringify(user)
    axiosInstance
      .post('/auth/users/', jsonUser)
      .then(res => {
        if (res.statusText === 'Created')
          axiosInstance
            .post('auth/jwt/create/', JSON.stringify({
              username: res.data.username,
              password: user.password,
            }))
            .then(res2 => {
              localStorage.setItem('pinterestAccessToken', res2.data.access)
              localStorage.setItem('pinterestRefreshToken', res2.data.refresh)
              window.location.href = '/'
            })
      })
      .catch(err => console.log(err))
  }

  collectFromFirst = (username) => {
    this.setState({ username: username })
  }

  collectFromSecond = (obj) => {
    this.setState({ gender: obj.gender })
  }

  collectFromLoginUnSaved = (obj) => {
    axiosInstance
      .post('auth/jwt/create', {
        username: obj.loginUsername,
        password: obj.loginPassword,
        grant_type: "password",
      })
      .then(res => {
        localStorage.setItem('pinterestAccessToken', res.data.access)
        localStorage.setItem('pinterestRefreshToken', res.data.refresh)
        axiosFetchInstance.defaults.headers['Authorization'] = `JWT ${res.data.access}`
        window.location.reload()
      })
      .catch(err => {
        this.loginUnSavedRef.current.state.loginFailed = true;
        this.loginUnSavedRef.current.setState({ loginPassword: "" })
      })
  }

  render() {
    const CssTextField = {
      '& label.Mui-focused': {
        color: '#e60023',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#e60023',
      },
      '& .MuiOutlinedInput-root': {
        maxHeight: '50px',
        borderRadius: 20,
        '&.Mui-focused fieldset': {
          borderColor: '#e60023',
          borderWidth: 3,

        },
      },
    };

    return <div>
      {this.state.Cscreen === "main" &&
        <Main switch={this.switchScreen} handle={this.handleClickOpen} open={this.state.open} close={this.handleClose} collect={this.collectFromMain} inputStyle={CssTextField} />}

      {this.state.Cscreen === "unsavedLogin" &&
        <LoginUnSaved switch={this.switchScreen} ref={this.loginUnSavedRef} open={this.state.open} close={this.handleClose} collect={this.collectFromLoginUnSaved} inputStyle={CssTextField} />}
    </div>
  }
}
