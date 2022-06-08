import { MenuItem, Button, InputLabel, Select, Stack, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import SettingsButtons from "./SettingsButtons";
import countryList from 'react-select-country-list'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context'

function AccountSettings() {
  const { authedUser, setAuthedUser, host, headers } = useContext(UserContext)
  const countryOptions = useMemo(() => countryList().getData(), [])
  const navigate = useNavigate();

  const [clear, setClear] = useState(false)
  const [change] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [gender, setGender] = useState('male')

  useEffect(() => {
    if (authedUser) {
      setEmail(authedUser.email || '')
      setCountry(authedUser.country || '')
      setGender(authedUser.gender || '')
    }
  }, [authedUser])

  const HSave = () => {
    const data = new FormData()
    data.append('email', email)
    data.append('country', country)
    data.append('gender', gender)

    fetch(`${host}/user_profile/update/${authedUser.id}/`, {
      headers: {
        'Authorization': headers.Authorization
      },
      method: 'PATCH',
      body: data
    })
      .then(res => res.status)
      .then(statusCode => {
        if (statusCode === 200)
          window.location.href = `https://pinterest-mamume.herokuapp.com/profile`
      })
  }

  const HDelete = async () => {
    fetch(`${host}/user_profile/delete`, { headers, method: 'DELETE' })

    localStorage.removeItem('pinterestAccessToken')
    localStorage.removeItem('pinterestRefreshToken')
    localStorage.removeItem('pinterestAccount')
    navigate('/')
    setAuthedUser(null)
  }

  useEffect(() => {
    if (email || country || gender)
      setDisabled(false)
    else
      setDisabled(true)
  }, [email, country, gender])

  useEffect(() => {
    if (clear) {
      setEmail('')
      setCountry('')
      setGender('')

      setClear(false)
    }
  }, [clear])

  return (
    <Fragment>
      <Typography variant="h5">Account Settings</Typography>
      <Typography variant="subtitle1" paragraph>Set your login preferences, help us personalize your experience and make big account changes here</Typography>

      <Typography variant="h6">Basic Information</Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField label="Email" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
      </Stack>

      <FormControl fullWidth>
        <InputLabel id="country">Country</InputLabel>
        <Select
          labelId="country"
          id="country-select"
          label={country && countryList().getLabel(country)}
          fullWidth
          value={country}
          onChange={e => setCountry(e.target.value)}
        >
          {countryOptions.map(country => (
            <MenuItem key={country.value} value={country.value}>{country.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={e => setGender(e.target.value)}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>

      <Typography variant="h6">Account Changes</Typography>
      <Typography sx={{ fontWeight: 'bold' }}>Delete Account</Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Typography>Delete your account and account data</Typography>
        <Button color="error" variant="contained" component="span" onClick={HDelete}>
          Delete Account
        </Button>
      </Stack>

      <SettingsButtons
        disabled={disabled}
        setClear={setClear}
        change={change}
        handleSave={HSave}
      />
    </Fragment >
  );
}

export default AccountSettings;