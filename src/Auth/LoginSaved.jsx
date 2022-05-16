import React from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Avatar,
    IconButton,
    Divider,
    Alert
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PinterestIcon from '@mui/icons-material/Pinterest';


export default class LoginSaved extends React.Component{
    constructor(){
        super()
        this.state = {
          loginPassword:"",
          loginFaild:false,
        }
    }

    collectInput=(e)=>{
      
      this.setState({[e.target.name]:e.target.value});
      
    }

    sendData=()=>{
      this.props.collect(this.state.loginPassword)  
    }


    render(){
        return <Dialog open={this.props.open}  maxWidth='xs' fullWidth={true}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={this.props.close}
            sx={{
              position: 'absolute',
              right: 10,
              top: 10,
              color:'black',
              fontWeight:'bold',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{textAlign:"center"}}>
        <div style={{width:"80%", textAlign:"center", margin:'auto'}}>
          <PinterestIcon fontSize="large" 
          sx={{
            color:'#e60023',
            marginBottom:2
          }} />
          <DialogContentText>
            <Typography variant="h4" sx={{fontWeight:400, textTransform:'capitalize'}}>Welcome back, {this.props.email[0]}
            
            </Typography>
          </DialogContentText>
          <Avatar
          sx={{ width: 100, height: 100 , margin:'auto', backgroundColor:"#f3f0f0"}}
          >
            <Typography variant="h3" sx={{color:'black', fontWeight:400, textTransform:'uppercase'}}>{this.props.email[0]}
            
            </Typography>
          </Avatar>
          </div>
        <div style={{ width: "80%", textAlign: "center", margin: 'auto', marginTop: '0.5rem', }}>
          {
            this.state.loginFaild===true && 
            <Alert severity="error">login failed check email and password again</Alert>
          }
        </div>
          
          <div style={{width:"70%", textAlign:"center", margin:'auto', marginTop:'0.5rem'}}>

          <TextField
            autoFocus
            required
            sx={this.props.inputStyle}
            margin="dense"
            name="loginPassword"
            id="loginPassword"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={this.state.loginPassword}
            onChange={this.collectInput}
          />
          <DialogContentText ml={1} sx={{textAlign:"left"}}>
            <Typography variant="subtitle2"><a href="http://localhost:3000/password-reset">Forgot your password?</a>
            </Typography>
          </DialogContentText>

          <Button
          onClick={this.sendData}
          variant="contained" 
          size='large' 
          fullWidth
          sx={{
            backgroundColor:"#e60023", 
            '&:hover':{backgroundColor:"#e60023"}, 
            borderRadius:10,
            textTransform:'none',
            marginTop:'1.5rem',
            marginBottom:'2.5rem'
          }}
          >
          Next</Button>

        </div>

        <Divider/> 

        <div style={{width:"80%", textAlign:"center", margin:'auto'}}>

         <DialogContentText mt={2}> 
          <Typography variant="caption">
          <button className="asAnchor" onClick={()=> this.props.switch('unsavedLogin')}>Not you? log in with a deffrent account</button>
        </Typography>
        </DialogContentText>
        <DialogContentText> 
          <Typography variant="caption">
          <button className="asAnchor" onClick={()=> this.props.switch('main')}>Need an account? sign up now</button>
        </Typography>
        </DialogContentText>  
        </div>  

        </DialogContent>

      </Dialog>
    }
}