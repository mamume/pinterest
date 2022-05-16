import { Alert, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState, useContext } from "react";
import SettingsButtons from "./SettingsButtons";
import { UserContext } from '../../context'


function PublicProfile() {
  const { host, headers } = useContext(UserContext)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clear, setClear] = useState(false)
  const [change] = useState(true)
  const [message, setMessage] = useState("")

  const handleSave = () => {
    if (!oldPassword || !newPassword || !confirmPassword)
      setMessage("All Fields are required")
    else if (newPassword !== confirmPassword)
      setMessage("New password and confirm password are not the same")
    else if (oldPassword === newPassword)
      setMessage("Old and new password cannot be the same")
    else {
      const data = new FormData()
      data.append('old_password', oldPassword)
      data.append('new_password', newPassword)

      fetch(`${host}/account/update-password/`, {
        headers: {
          'Authorization': headers.Authorization
        },
        method: 'PUT',
        body: data
      })
        .then(res => res.status)
        .then((data) => {
          if (data === 200)
            window.location.href = `http://localhost:3000/profile`
        })
    }
  }

  useEffect(() => {
    if (oldPassword || newPassword || confirmPassword)
      setDisabled(false)
    else
      setDisabled(true)
  }, [confirmPassword, newPassword, oldPassword])

  useEffect(() => {
    if (clear) {
      setConfirmPassword(null)
      setNewPassword(null)
      setOldPassword(null)

      setClear(false)
    }
  }, [clear])


  return (
    <Fragment>
      {message &&
        <Alert severity="error">{message}</Alert>}

      <Typography variant="h5">Account Security</Typography>
      <Typography variant="subtitle1" paragraph>Change your account password</Typography>

      <TextField
        type="password"
        placeholder="Enter your old password"
        label="Old Password"
        fullWidth
        value={oldPassword}
        onChange={e => setOldPassword(e.target.value)}
      />
      <TextField
        type="password"
        placeholder="Enter your new password"
        label="New Password"
        fullWidth
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <TextField
        type="password"
        placeholder="Confirm your new password"
        label="Confirm Password"
        fullWidth
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
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