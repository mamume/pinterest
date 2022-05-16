import React from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import { FcGoogle } from "react-icons/fc";
import axiosInstance from '../axios/Base'
import axiosFetchInstance from "../axios/Fetch";
import SimpleReactValidator from 'simple-react-validator';


export default class Main extends React.Component {
  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      validators: {
        usedEmail: {
          message: "Email used try another email"
        }
      }
    })
    this.state = {
      email: "",
      password: "",
      age: "",
      emailError: false
    }

  }
  collectInput = (e) => {
    this.setState({ [e.target.name]: e.target.value, emailError: false })

  }

  sendData = () => {
    let data = {
      email: this.state.email,
      password: this.state.password,
      age: this.state.age,
    }
    if (this.validator.allValid()) {
      axiosInstance
        .post('/account/checkmail', { "email": this.state.email })
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            this.props.collect(data)
            this.props.switch('first')
          } else {
            this.setState({ emailError: true })
          }
        })

    } else {
      this.validator.showMessages()
      this.forceUpdate()
    }
  }

  responseFacebook = (response) => {
    // console.log(response.accessToken)

    axiosInstance
      .post('/account/auth/convert-token', {
        grant_type: "convert_token",
        client_id: "cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
        client_secret: "tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
        backend: "facebook",
        token: response.accessToken
      }).then(res => {
        localStorage.setItem('pinterestAccessToken', res.data.access_token)
        localStorage.setItem('pinterestRefreshToken', res.data.refresh_token)
        axiosFetchInstance.defaults.headers['Authorization'] = res.data.access_token
        localStorage.setItem('pinterestAccount', response.email)
        window.location.href = '/'
      }).catch(err => {
        // console.log(err)
      })

    //   let obj = {
    //     grant_type:"convert_token",
    //     client_id:"cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
    //     client_secret:"tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
    //     backend:"facebook",
    //     token:response.accessToken
    //   }
    //   let jsonObj = JSON.stringify(obj)
    //   fetch(
    //     'http://localhost:8000/account/auth/convert-token',{
    //     method:"POST",
    //     headers:{'content-type':"application/json"},
    //     body:jsonObj
    //   }).then(res =>{
    //     console.log(res)
    //     return res.json()
    //   }).then(json =>{
    //     if(json.access_token){
    //       localStorage.setItem('pinterestAccessToken', json.access_token)
    //       localStorage.setItem('pinterestRefreshToken', json.refresh_token)
    //       localStorage.setItem('pinterestAccount', response.email)
    //       window.location.href = 'http://localhost:3000/'
    //     }else console.log(json)
    //   })
  }

  responseGoogle = (response) => {
    // console.log(response)
    console.log(response)
    axiosInstance
      .post('/account/auth/convert-token', {
        grant_type: "convert_token",
        client_id: "cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
        client_secret: "tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
        backend: "google-oauth2",
        token: response.accessToken
      }).then(res => {
        localStorage.setItem('pinterestAccessToken', res.data.access_token)
        localStorage.setItem('pinterestRefreshToken', res.data.refresh_token)
        axiosFetchInstance.defaults.headers['Authorization'] = res.data.access_token
        localStorage.setItem('pinterestAccount', response.vu.jv)
        window.location.href = '/'
      })
    // .catch(err => {
    // console.log(err)
    // })

    // let obj = {
    //   grant_type:"convert_token",
    //   client_id:"cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
    //   client_secret:"tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
    //   backend:"google-oauth2",
    //   token:response.accessToken
    // }
    // let jsonObj = JSON.stringify(obj)
    // fetch(
    //   'http://localhost:8000/account/auth/convert-token',{
    //   method:"POST",
    //   headers:{'content-type':"application/json"},
    //   body:jsonObj
    // }).then(res =>{
    //   console.log(res)
    //   return res.json()
    // }).then(json =>{
    //   if(json.access_token){
    //     localStorage.setItem('pinterestAccessToken', json.access_token)
    //     localStorage.setItem('pinterestRefreshToken', json.refresh_token)
    //     localStorage.setItem('pinterestAccount', response.vu.jv)
    //     window.location.href = 'http://localhost:3000/'
    //   }else console.log(json)
    // })
  }


  render() {

    return <Dialog open={this.props.open} maxWidth='xs' fullWidth={false}>
              <IconButton
          aria-label="close"
          onClick={this.props.close}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: 'black',
            fontWeight: 'bold'
          }}
        >
          <CloseIcon />
        </IconButton>
      {/* <DialogTitle sx={{ textAlign: "center" }}>

      </DialogTitle> */}
      <DialogContent sx={{ textAlign: "center" }}>
        <DialogContentText sx={{ margin: '0 0 1rem 0' }}>
          <PinterestIcon fontSize="large"
            sx={{
              color: '#e60023',
              marginBottom: 2
            }} />
          <Typography variant="h4" sx={{ color: 'black' }}>
            Welcome to Pinterest
          </Typography>
          <Typography variant="subtitle2">
            Find new ideas to try
          </Typography>
        </DialogContentText>

        <div style={{ width: "70%", textAlign: "center", margin: 'auto' }}>
          <form>
            <TextField
              autoFocus
              required
              sx={this.props.inputStyle}
              margin="dense"
              name="email"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={this.state.email}
              onChange={this.collectInput}
              helperText={
                this.state.emailError ?
                  "Email exists" :
                  this.validator.message('email', this.state.email, "required|email")
              }
            />
            <TextField
              required
              sx={this.props.inputStyle}
              margin="dense"
              name="password"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={this.state.password}
              onChange={this.collectInput}
              helperText={this.validator.message('password', this.state.password, "required|min:8")}

            />
            <TextField
              sx={this.props.inputStyle}
              margin="dense"
              name="age"
              id="age"
              label="Age"
              type="number"
              fullWidth
              variant="outlined"
              value={this.state.age}
              onChange={this.collectInput}
              helperText={this.validator.message('age', this.state.age, "required|min:2")}


            />
            <div style={{ width: "100%", marginTop: '0.5rem' }}>
              <Button
                onClick={this.sendData}
                variant="contained"
                size='large'
                fullWidth
                sx={{
                  backgroundColor: "#e60023",
                  '&:hover': { backgroundColor: "#e60023" },
                  borderRadius: 10,
                  textTransform: 'none'
                }}
              >
                Continue</Button>
            </div>
            <div style={{ width: "90%", margin: '0.25rem auto', textAlign: 'center' }}>
              <Typography variant="h6">OR</Typography>
            </div>
            <div style={{ width: "100%" }}>
              <FacebookLogin
                appId="1730643360462848"
                fields='name,email,picture,first_name,last_name'
                callback={this.responseFacebook}
                render={renderProps => (
                  <Button
                    onClick={renderProps.onClick}
                    variant="contained"
                    size='large'
                    fullWidth
                    sx={{
                      backgroundColor: "#4267b2",
                      '&:hover': { backgroundColor: "#4267b2" },
                      borderRadius: 10,
                      textTransform: 'none',
                      paddingLeft: '0.1rem',
                      paddingRight: '0.5rem'
                    }}
                  >
                    <FacebookTwoToneIcon sx={{ marginRight: '0.5rem' }} />
                    Continue With Facebook</Button>
                )}
              />
            </div>
            <div style={{ width: "100%", marginTop: '1rem' }}>
              <GoogleLogin
                clientId="679751054018-2l8lc8ijibfr7ammo77vfu59epohaiu9.apps.googleusercontent.com"
                render={renderProps => (
                  <Button
                    onClick={renderProps.onClick}
                    variant="contained"
                    size='large'
                    fullWidth
                    sx={{
                      backgroundColor: "rgb(255, 255, 255)",
                      color: 'rgba(0, 0, 0, 0.54)',
                      '&:hover': { backgroundColor: "rgb(255, 255, 255)" },

                      borderRadius: 10,
                      textTransform: 'none',
                      paddingLeft: '0.1rem',
                      paddingRight: '0.5rem'
                    }}
                  >
                    <FcGoogle style={{ marginRight: '0.5rem', fontSize: '1.5rem' }} />
                    Continue With Google</Button>
                )}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </form>
          <div style={{ width: "90%", margin: '1rem auto', textAlign: 'center' }}>
            <Typography variant="caption">
              By continuing you agree to pinterest's <button className="asAnchor">Terms of Service</button> and
              acknowledge you've read our <button className="asAnchor">Privacy Policy</button>
            </Typography>
          </div>

        </div>
        <DialogContentText>
          <Typography variant="caption">
            <button className="asAnchor" onClick={() => this.props.handle("login")}>Are you a member? Log in</button>
          </Typography>
        </DialogContentText>
      </DialogContent>

    </Dialog>
  }
}