import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  Alert
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PinterestIcon from '@mui/icons-material/Pinterest';
import SimpleReactValidator from 'simple-react-validator';

export default class LoginUnSaved extends React.Component {
  constructor() {
    super()
    this.validator = new SimpleReactValidator()
    this.state = {
      loginEmail: "",
      loginUsername: "",
      loginPassword: "",
      loginFaild: false,
    }
  }

  collectInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendData = () => {
    let data = {
      loginUsername: this.state.loginUsername,
      loginPassword: this.state.loginPassword,
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
            this.state.loginFaild === true &&
            <Alert severity="error">login failed check username and password again</Alert>
          }
        </div>
        <div style={{ width: "70%", textAlign: "center", margin: 'auto', marginTop: '0.5rem' }}>
          <TextField
            autoFocus
            required
            sx={this.props.inputStyle}
            margin="dense"
            name="loginUsername"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            // value={this.state.loginUsername}
            onChange={this.collectInput}
            helperText={this.validator.message('Username', this.state.loginUsername, 'required', { style: { color: 'red' } })}
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
            helperText={this.validator.message("password", this.state.loginPassword, "required")}
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