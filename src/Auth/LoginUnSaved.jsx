import React from 'react';
// import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  // Avatar,
  IconButton,
  Divider,
  Alert
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import { FcGoogle } from "react-icons/fc";
import axiosInstance from '../axios/Base'
import axiosFetchInstance from "../axios/Fetch";
import SimpleReactValidator from 'simple-react-validator';

export default class LoginUnSaved extends React.Component {
  constructor() {
    super()
    this.validator = new SimpleReactValidator()
    this.state = {
      loginEmail: "",
      loginPassword: "",
      loginFaild:false,
    }
  }

  collectInput = (e) => {

    this.setState({ [e.target.name]: e.target.value });

  }

  sendData = () => {
    let data = {
      loginEmail: this.state.loginEmail,
      loginPassword: this.state.loginPassword,
    }
    if(this.validator.allValid()) {
      this.props.collect(data)
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
        console.log(err)
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
      }).catch(err => {
        console.log(err)
      })

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
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={this.props.close}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: 'black',
            fontWeight: 'bold',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <div style={{ width: "90%", textAlign: "center", margin: 'auto' }}>
          <PinterestIcon fontSize="large"
            sx={{
              color: '#e60023',
              marginBottom: 2
            }} />
          <DialogContentText>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              Welcome to Pinterest
            </Typography>
          </DialogContentText>
        </div>
        <div style={{ width: "80%", textAlign: "center", margin: 'auto', marginTop: '0.5rem', }}>
        {
          this.state.loginFaild===true && 
          <Alert severity="error">login failed check email and password again</Alert>
        }
        </div>
        <div style={{ width: "70%", textAlign: "center", margin: 'auto', marginTop: '0.5rem' }}>

          <TextField

            autoFocus
            required
            sx={this.props.inputStyle}
            margin="dense"
            name="loginEmail"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={this.state.loginEmail}
            onChange={this.collectInput}
            helperText={this.validator.message('email', this.state.loginEmail, 'required|email', { style: { color: 'red' } })}
          />
          <TextField
            required
            sx={this.props.inputStyle}
            margin="dense"
            name="loginPassword"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={this.state.loginPassword}
            onChange={this.collectInput}
            helperText={this.validator.message("password", this.state.loginPassword, "required|min:8")}
          />
          <DialogContentText ml={1} sx={{ textAlign: "left" }}>
            <Typography variant="subtitle2"><a href="http://localhost:3000/password-reset">Forgot your password?</a>
            </Typography>
          </DialogContentText>

          <Button
            onClick={this.sendData}
            variant="contained"
            size='large'
            fullWidth
            sx={{
              backgroundColor: "#e60023",
              '&:hover': { backgroundColor: "#e60023" },
              borderRadius: 10,
              textTransform: 'none',
              marginTop: '1.5rem',

            }}
          >
            Next</Button>

          <DialogContentText my={1}>
            <Typography variant="h6">OR</Typography>
          </DialogContentText>
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
                  paddingRight: '0.5rem',
                  marginTop: '1rem'
                }}
              >
                <FcGoogle style={{ marginRight: '0.5rem', fontSize: '1.5rem' }} />
                Continue With Google</Button>
            )}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />

          <DialogContentText mt={2}>
            <Typography variant="caption">
              By continuing you agree to pinterest's <button className="asAnchor">Terms of Service</button> and
              acknowledge you've read our <button className="asAnchor">Privacy Policy</button>
            </Typography>
          </DialogContentText>
          <div style={{ width: '40%', margin: '1rem auto' }}><Divider /></div>
          <DialogContentText>
            <Typography variant="caption">
              <button className="asAnchor" onClick={() => this.props.switch('main')}>Not a pintersest yet? sign up</button>
            </Typography>
          </DialogContentText>

        </div>

      </DialogContent>

    </Dialog>
  }
}