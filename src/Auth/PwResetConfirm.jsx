import React from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios/Base';
import {
    Container,
    Grid,
    Button,
    TextField,
    Typography,
    DialogTitle,
    DialogContentText,
    Alert
} from "@mui/material";
import SimpleReactValidator from 'simple-react-validator';


class PwResetConfirmDone extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return <Grid container direction="row" justifyContent="center" alignItem="center" mt={5}>

            <Grid item xs={12} sm={8} md={5} sx={{ textAlign: "center" }}>
                <DialogContentText>
                    <Typography variant='h4'>
                        {this.props.msg}
                    </Typography>
                </DialogContentText>
                <Button
                    LinkComponent={Link}
                    to="/"
                    // onClick={()=> window.location.href="/"}
                    size="large"
                    variant="contained"
                    sx={{
                        backgroundColor: "#e60023",
                        '&:hover': { backgroundColor: "#e60023" },
                        borderRadius: 10,
                        textTransform: 'none',
                    }}
                >
                    Home</Button>
            </Grid>
        </Grid>
    }
}


class PwResetConfirmInput extends React.Component {
    constructor() {
        super();
        this.validator = new SimpleReactValidator({
            autoForceUpdate:this,

        })
        this.state = {
            password: "",
            passwordConfirm: "",
            passMissmatch:false
        };
    }

    collectInput = (e) => {

        this.setState({ [e.target.name]: e.target.value });

    }

    sendData = () => {
        let url_string = window.location.href;
        let url = new URL(url_string);
        let obj = {
            uid64: url.searchParams.get("uid64"),
            token: url.searchParams.get("token"),
            password: this.state.password,
            password_confirm: this.state.passwordConfirm
        }
        let jsonObj = JSON.stringify(obj)
        if(this.validator.allValid()){
            if(this.state.password===this.state.passwordConfirm){
                axiosInstance
                    .patch('/account/password-reset-complete', jsonObj)
                    .then(res => {
                        // console.log(res.error)
                        if (res.data.success) this.props.collectResult(res.data.success, "done")
                        if (res.data.token) this.props.collectResult("link has been expired", "done")
                        if (res.data.password) this.props.collectResult("invalid password", "done")
                        // console.log(res.data)
                    })
                    .catch(err => {
                        this.props.collectResult("link has been expired", "done")

                    })
            }else{
                 this.state.passMissmatch = true;  
                 this.setState({password:"", passwordConfirm:""})  
                }   
        }else this.validator.showMessages()
    }

    render() {
        return <Grid container direction="row" justifyContent="center" alignItem="center" mt={5}>
            <Grid item xs={12} sm={8} md={5} sx={{ textAlign: "center" }}>
                <DialogTitle>
                    <Typography variant='h4'>
                        Pick a new password
                    </Typography>
                </DialogTitle>
                <DialogContentText mb={0} sx={{ textAlign: "left" }}>
                    <Typography variant="subtitle2">New password
                    </Typography>
                </DialogContentText>
                {
                    this.state.passMissmatch && 
                    <Alert severity="error">login failed check email and password again</Alert>
                }
                <TextField
                    autoFocus
                    required
                    sx={this.props.inputStyle}
                    fullWidth
                    margin="dense"
                    name="password"
                    id="password"
                    label="New password"
                    type="password"
                    variant="outlined"
                    value={this.state.password}
                    onChange={this.collectInput}
                    helperText={this.validator.message("password", this.state.password, "required|string|min:8")}
                />
                <DialogContentText mt={2} sx={{ textAlign: "left" }}>
                    <Typography variant="subtitle2">Type it again
                    </Typography>
                </DialogContentText>
                <TextField
                    required
                    sx={this.props.inputStyle}
                    fullWidth
                    margin="dense"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    label="re-password"
                    type="password"
                    variant="outlined"
                    value={this.state.passwordConfirm}
                    onChange={this.collectInput}
                    
                />
                <div style={{ width: "100%", textAlign: "right", marginTop: "0.75rem" }}>
                    <Button
                        onClick={this.sendData}
                        size="large"
                        variant="contained"
                        sx={{
                            backgroundColor: "#e60023",
                            '&:hover': { backgroundColor: "#e60023" },
                            borderRadius: 10,
                            textTransform: 'none',
                        }}
                    >
                        Change password</Button>
                </div>
            </Grid>
        </Grid>
    }

}


export default class PwResetConfirm extends React.Component {
    constructor() {
        super();
        this.state = {
            Cscreen: "input",
            result: ""
        }
    };

    collectResult = (res, scr) => {
        this.setState({ result: res })
        this.setState({ Cscreen: scr })
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
        return <Container>
            {
                this.state.Cscreen === "input" &&
                <PwResetConfirmInput inputStyle={CssTextField} collectResult={this.collectResult} />
            }
            {
                this.state.Cscreen === "done" &&
                <PwResetConfirmDone msg={this.state.result} />
            }
        </Container>
    }
}
