import React from "react";
import countryList from 'react-select-country-list';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  MobileStepper,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  IconButton
} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';




export default class Third extends React.Component {
  constructor() {
    super();
    this.state = {
      country: "EG",
    }
  }

  collectInput = (e) => {

    this.setState({ [e.target.name]: e.target.value })

  }

  sendData = () => {

    this.props.collect(this.state.country)
  }

  render() {
    let countryArr = countryList().getData()

    return <Dialog open={this.props.open} maxWidth='xs' fullWidth={true}>
      <DialogTitle mt={1}>
        <IconButton
          aria-label="close"
          onClick={() => this.props.switch("second")}
          sx={{
            position: 'absolute',
            left: 17.5,
            top: 17.5,
            color: 'black',
            fontWeight: 'bold'
          }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        <MobileStepper
          variant="dots"
          steps={3}
          position="static"
          activeStep={2}
          sx={{ maxWidth: 400, flexGrow: 1 }}
        />
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>

        <DialogContentText my={10} >
          <Typography variant="h4" sx={{ color: 'black' }}>Pick your country/region</Typography>
        </DialogContentText >
        <div style={{width:"85%", textAlign:"center", margin:'auto'}}>  
        <div style={{width:'100%', marginBottom:'1rem',}} >    
        <FormControl fullWidth  >
            <InputLabel id="demo-simple-select-label" >Country</InputLabel>
            <Select
                labelId="country-selector-label"
                id="contry-selector"
                name="country"
                // defaultValue='EG'
                value={this.state.country}
                label="Country"
                onChange={this.collectInput}
            >
                {countryArr.map((item)=>{
                    return <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                })}

              </Select>
            </FormControl>
          </div>


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
              marginTop: '5rem'
            }}
          >
            Next</Button>
        </div>


      </DialogContent>

    </Dialog>
  }
}