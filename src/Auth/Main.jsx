import React from "react";
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
      username: "",
      password: "",
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
      username: this.state.username,
    }
    if (this.validator.allValid()) {
      this.props.collect(data)
    } else {
      this.validator.showMessages()
      this.forceUpdate()
    }
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
      <DialogContent sx={{ textAlign: "center" }}>
        <DialogContentText sx={{ margin: '0 0 1rem 0' }}>
          <PinterestIcon fontSize="large"
            sx={{
              color: '#e60023',
              marginBottom: 10,
              display: 'block',
              margin: 'auto',
            }}
          />
          <Typography component={'span'} variant="h4" sx={{ color: 'black' }}>
            Welcome to Pinterest
          </Typography>
          <br />
          <Typography component={'span'} variant="subtitle2">
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
              name="username"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              onChange={this.collectInput}
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
              helperText={this.validator.message('password', this.state.password, "required")}
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
                Sign Up
              </Button>
            </div>
          </form>
        </div>
        <DialogContentText>
          <Typography variant="caption">
            <button className="asAnchor" onClick={() => this.props.handle("login")}>
              Are you a member? Log in
            </button>
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  }
}