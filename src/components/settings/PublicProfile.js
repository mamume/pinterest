import { Avatar, Button, InputLabel, Stack, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Fragment, useEffect, useState, useContext } from "react";
import SettingsButtons from "./SettingsButtons";
import { UserContext } from '../../context'

const Input = styled('input')({
  display: 'none',
});

function PublicProfile() {
  const { authedUser, host, headers } = useContext(UserContext)

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [imageData, setImageData] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clear, setClear] = useState(false)
  const [change] = useState(true)

  useEffect(() => {
    setFname(authedUser.first_name || '')
    setLname(authedUser.last_name || '')
    setBio(authedUser.bio || '')
    setWebsite(authedUser.website || '')
    setUsername(authedUser.username || '')
    setProfilePic(authedUser.profile_pic)
  }, [authedUser])

  const handleSave = () => {
    const data = new FormData()
    data.append('first_name', fname)
    data.append('last_name', lname)
    data.append('bio', bio)
    website && data.append('website', website)
    data.append('username', username)
    imageData && data.append('profile_pic', imageData)

    fetch(`${host}/profile/update/${authedUser.id}/`, {
      headers: {
        'Authorization': headers.Authorization
      },
      method: 'PATCH',
      body: data
    })
      .then(res => res.status)
      .then(statusCode => {
        if (statusCode === 200)
          window.location.href = `http://localhost:3000/profile`
      })
  }

  useEffect(() => {
    if (fname || lname || bio || website || username || profilePic)
      setDisabled(false)
    else
      setDisabled(true)
  }, [fname, lname, bio, website, username, profilePic])

  useEffect(() => {
    if (clear) {
      setFname('')
      setLname('')
      setBio('')
      setWebsite('')
      setUsername('')

      setClear(false)
    }
  }, [clear])

  function readImage(image) {
    setImageData(image)

    const reader = new FileReader()
    reader.onload = (e) => {
      setProfilePic(e.target.result)
    }
    reader.readAsDataURL(image)
  }

  return (
    <Fragment>
      <Typography variant="h5">Public Profile</Typography>
      <Typography variant="subtitle1" paragraph>People visiting your profile will see following info</Typography>
      <InputLabel>Photo</InputLabel>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          sx={{ width: 75, height: 75 }}
          src={profilePic}
        />
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" type="file" onChange={(e) => readImage(e.target.files[0])} />
          <Button color="grey" variant="contained" component="span">
            Change
          </Button>
        </label>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          label="First Name"
          fullWidth
          value={fname}
          onChange={e => setFname(e.target.value)}
        />
        <TextField
          label="Last Name"
          fullWidth
          value={lname}
          onChange={e => setLname(e.target.value)}
        />
      </Stack>

      <TextField
        placeholder="Describe Yourself"
        label="Short Bio"
        fullWidth
        value={bio}
        onChange={e => setBio(e.target.value)}
      />
      <TextField
        placeholder="Add a link to drive traffic to your site"
        label="Website"
        fullWidth
        value={website}
        onChange={e => setWebsite(e.target.value)}
      />
      <TextField
        fullWidth
        label="Username"
        helperText={`www.pinterest.com/${username}`}
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <SettingsButtons
        disabled={disabled}
        setClear={setClear}
        change={change}
        handleSave={handleSave}
      />
    </Fragment >
  );
}

export default PublicProfile;