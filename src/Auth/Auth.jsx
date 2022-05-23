import React from "react";
// import { Container, Button } from "@mui/material";
import Main from "./Main";
import First from "./First"
import Second from "./Second";
import Third from "./Third";
import LoginSaved from "./LoginSaved";
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
    if (type === "signup") {
      this.switchScreen("main")
    } else if (type === "login") {
      // if (localStorage.pinterestAccount) {
      //   // this.state.loginEmail = localStorage.getItem('pinterestAccount')
      //   // console.log(localStorage.getItem('pinterestAccount'))
      //   // console.log(this.state.loginEmail)
      //   this.setState({ loginEmail: localStorage.getItem('pinterestAccount') })
      //   // this.setState({loginEmail:this.state.loginEmail})
      //   this.switchScreen("savedLogin")
      // } else {
      this.switchScreen("unsavedLogin")
      // }
    }
  };
  handleClose = () => {
    this.setState({ open: false });
  }
  collectFromMain = (obj) => {
    this.setState({
      email: obj.email,
      password: obj.password,
      age: obj.age
    });

  }

  collectFromFirst = (username) => {

    // this.state.username = obj.username
    // this.setState({username:this.state.username})
    this.setState({ username: username })
  }

  collectFromSecond = (obj) => {
    this.setState({ gender: obj.gender })
  }

  collectFromThird = (country) => {
    // this.state.country = obj.country
    // this.setState({country:this.state.country});
    // this.setState({language:obj.lang})
    this.setState({ country: country })
    // console.log(this.state.username)
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      age: this.state.age,
      gender: this.state.gender,
      country: country
    }
    // console.log(user)
    const jsonUser = JSON.stringify(user)
    axiosInstance
      .post('/account/signup', jsonUser).then(res => {
        localStorage.setItem('pinterestAccessToken', res.data.access_token)
        localStorage.setItem('pinterestRefreshToken', res.data.refresh_token)
        axiosFetchInstance.defaults.headers['Authorization'] = res.data.access_token
        localStorage.setItem('pinterestAccount', this.state.email)
        window.location.href = '/'
      }).catch(err => {
        console.log(err)
      })
    // let user = {
    //   email:this.state.email,
    //   password:this.state.password,
    //   username:this.state.username,
    //   age:this.state.age,
    //   gender:this.state.gender,
    //   country:this.state.country,
    //   // language:this.state.language
    // }
    // let jsonUser = JSON.stringify(user)
    // console.log(user)
    // fetch(
    //   'http://localhost:8000/account/signup',{
    //   method:"POST",
    //   headers:{'content-type':"application/json"},
    //   body:jsonUser
    // }).then(res => {
    //   return res.json()
    // }).then(json =>{
    //   if(json.token){
    //     localStorage.setItem('pinterestToken', json.token)
    //     localStorage.setItem('pinterestAccount', this.state.email)
    //     window.location.href = 'http://localhost:3000/'
    //   }else{
    //     console.log(json)
    //   }
    // })

  }
  collectFromLoginSaved = (password) => {
    // this.state.loginPassword = password
    // this.setState({loginPassword:this.state.loginPassword})
    this.setState({ loginPassword: password })

    axiosInstance
      .post('/account/auth/token', {
        username: this.state.loginEmail,
        password: this.state.loginPassword,
        grant_type: "password",
        client_id: "cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
        client_secret: "tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
      }).then(res => {
        localStorage.setItem('pinterestAccessToken', res.data.access_token)
        localStorage.setItem('pinterestRefreshToken', res.data.refresh_token)
        localStorage.setItem('pinterestAccount', this.state.loginEmail)
        axiosFetchInstance.defaults.headers['Authorization'] = res.data.access_token
        window.location.reload()
      }).catch(err => {
        console.log(err)
        this.loginSavedRef.current.state.loginFailed = true;
        this.loginSavedRef.current.setState({ loginPassword: "" })

      })

    // let userLogin = {
    //   username:this.state.loginEmail,
    //   password:this.state.loginPassword,
    //   grant_type:"password",
    //   client_id:"cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
    //   client_secret:"tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
    // }
    // let jsonUser = JSON.stringify(userLogin)
    // fetch(
    //   'http://localhost:8000/account/auth/token',{
    //   method:"POST",
    //   headers:{
    //     'content-type':"application/json",
    //     // 'Authorization':`jwt ${localStorage.getItem('pinterestToken')}`
    //   },
    //   body:jsonUser
    // }).then(res => {
    //   return res.json()
    // }).then(json =>{
    //   if(json.access_token){
    //     localStorage.setItem('pinterestAccessToken', json.access_token)
    //     localStorage.setItem('pinterestRefreshToken', json.refresh_token)
    //     localStorage.setItem('pinterestAccount', this.state.loginEmail)
    //     window.location.reload()
    //   }else{
    //     console.log(json)
    //   }
    // })
  }

  collectFromLoginUnSaved = (obj) => {

    axiosInstance
      .post('auth/jwt/create', {
        username: obj.loginUsername,
        password: obj.loginPassword,
        grant_type: "password",
        // client_id:"cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
        // client_secret:"tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
      }).then(res => {
        console.log(res)
        localStorage.setItem('pinterestAccessToken', res.data.access_token)
        localStorage.setItem('pinterestRefreshToken', res.data.refresh_token)
        localStorage.setItem('pinterestAccount', obj.loginEmail)
        axiosFetchInstance.defaults.headers['Authorization'] = res.data.access_token
        // window.location.reload()
      }).catch(err => {
        console.log(err)
        this.loginUnSavedRef.current.state.loginFailed = true;
        this.loginUnSavedRef.current.setState({ loginPassword: "" })
      })

    //   let userLogin = {
    //     username:obj.loginEmail,
    //     password:obj.loginPassword,
    //     grant_type:"password",
    //     client_id:"cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
    //     client_secret:"tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
    //   }
    //   let jsonUser = JSON.stringify(userLogin)
    //   console.log(userLogin)
    //   console.log(jsonUser)
    //   fetch(
    //     'http://localhost:8000/account/auth/token',{
    //     method:"POST",
    //     headers:{
    //       'content-type':"application/json",
    //       // 'Authorization':`jwt ${localStorage.getItem('pinterestToken')}`
    //     },
    //     body:jsonUser
    //   }).then(res => {
    //     return res.json()
    //   }).then(json =>{
    //     if(json.access_token){
    //       localStorage.setItem('pinterestAccessToken', json.access_token)
    //       localStorage.setItem('pinterestRefreshToken', json.refresh_token)
    //       localStorage.setItem('pinterestAccount', userLogin.username)
    //       window.location.reload()
    //     }else{
    //       console.log(json)
    //     }
    //   })
  }

  componentWillUnmount() {
  }

  switchScreen = (screen) => {
    this.setState({ Cscreen: screen })
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
      {/* <div style={{margin:'5rem auto', maxWidth:'150px'}}>
          <div style={{display: "flex"}}>
            <Button ml={8} onClick={()=> this.handleClickOpen("signup")} style={{width: "100px"}}>Sign Up</Button> 
            <Button onClick={()=> this.handleClickOpen("login")}>Log In</Button></div>

          </div> */}
      {
        this.state.Cscreen === "main" &&
        <Main switch={this.switchScreen} handle={this.handleClickOpen} open={this.state.open} close={this.handleClose} collect={this.collectFromMain} inputStyle={CssTextField} />
      }
      {
        this.state.Cscreen === "first" &&
        <First switch={this.switchScreen} handle={this.handleClickOpen} open={this.state.open} collect={this.collectFromFirst} inputStyle={CssTextField} email={this.state.email} />
      }
      {
        this.state.Cscreen === "second" &&
        <Second switch={this.switchScreen} open={this.state.open} collect={this.collectFromSecond} />
      }
      {
        this.state.Cscreen === "third" &&
        <Third switch={this.switchScreen} open={this.state.open} close={this.handleClose} collect={this.collectFromThird} />
      }
      {
        this.state.Cscreen === "savedLogin" &&
        <LoginSaved switch={this.switchScreen} ref={this.loginSavedRef} open={this.state.open} close={this.handleClose} collect={this.collectFromLoginSaved} email={this.state.loginEmail} inputStyle={CssTextField} />
      }
      {
        this.state.Cscreen === "unsavedLogin" &&
        <LoginUnSaved switch={this.switchScreen} ref={this.loginUnSavedRef} open={this.state.open} close={this.handleClose} collect={this.collectFromLoginUnSaved} inputStyle={CssTextField} />
      }
    </div>

  }
}
