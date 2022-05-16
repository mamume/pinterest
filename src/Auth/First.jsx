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
    MobileStepper,
    IconButton
} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axiosInstance from '../axios/Base'
import SimpleReactValidator from 'simple-react-validator';


export default class First extends React.Component{
    constructor(){
        super();
        this.validator = new SimpleReactValidator({
          autoForceUpdate:this,
          validators:{
            username:{
              message:"invalid user name",
              rule:(val, validator)=>{
                return validator.helpers.testRegex(val, /^[a-z0-9_.]+$/)
              }
            }
          }
        })
        this.state = {
            username:"",
            usernameError:false
        }
    }

    collectInput=(e)=>{
      
      this.setState({[e.target.name]:e.target.value, usernameError:false})
      
    }

    sendData=()=>{

      if(this.validator.allValid()){
        axiosInstance
          .post("/account/checkuser", {"username":this.state.username})
          .then(res =>{
            if(res.data.success){
              this.props.collect(this.state.username)
              this.props.switch('second')
            }else this.setState({usernameError:true})
          })

      }else{
        this.setState({usernameError:true})
      }

      
    }

    render(){
        return <Dialog open={this.props.open}  maxWidth='xs' fullWidth={false}>
        <DialogTitle mb={3} mt={1}>
        <IconButton
          aria-label="close"
          onClick={()=> this.props.switch("main")}
          sx={{
            position: 'absolute',
            left: 17.5,
            top: 17.5,
            color:'black',
            fontWeight:'bold'
          }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        <MobileStepper
        variant="dots"
        steps={3}
        position="static"
        activeStep={0}
        sx={{ maxWidth: 400, flexGrow: 1}}
        />
        </DialogTitle>
        <DialogContent sx={{textAlign:"center"}}>
        <Avatar
        sx={{ width: 100, height: 100 , margin:'auto', backgroundColor:"#f3f0f0"}}
        >
          <Typography variant="h3" sx={{color:'black', fontWeight:400, textTransform:'uppercase'}}>{this.props.email[0]}
          
          </Typography>
          </Avatar>
        <DialogContentText mt={2} >
        <Typography variant="body2">{this.props.email}</Typography>
        </DialogContentText>
        <DialogContentText my={2} >
        <Typography variant="h4" sx={{color:'black'}}>Welcome to Pinterest</Typography>
        </DialogContentText>  
          
          <div style={{width:"70%", textAlign:"center", margin:'auto'}}>

          <TextField
            autoFocus
            required
            sx={this.props.inputStyle}
            margin="dense"
            name="username"
            id="username"
            label="User Name"
            type="text"
            fullWidth
            variant="outlined"
            value={this.state.username}
            onChange={this.collectInput}
            helperText={this.state.usernameError?"User name exists":""}
          />

          <DialogContentText mt={3} >
          <Typography variant="body2">Your answers to the next few qustions will help us find the 
          the right ideas for you</Typography>
          </DialogContentText>
          </div>
          <div style={{width:"80%", textAlign:"center", margin:'auto'}}>
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
            marginTop:'1.5rem'
          }}
          >
          Next</Button>
          </div>
          

         <DialogContentText mt={2}> 
          <Typography variant="caption">
          <button className="asAnchor" onClick={()=> this.props.handle("login")}>Are you a member? Log in</button>
        </Typography>
        </DialogContentText>  

        </DialogContent>

      </Dialog>
    }
}