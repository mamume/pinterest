import { Box, Avatar, Button, IconButton, Stack, TextField, Typography, Modal, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox } from "@mui/material";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Fragment, useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Styles from "../../styles/Styles";


function InviteModal({ handleClose }) {
  const classes = Styles()
  const [openPermissions, setOpenPermissions] = useState(false);

  const handleOpenPermissions = () => {
    setOpenPermissions(true)
  }

  const handleClosePermissions = () => {
    setOpenPermissions(false)
  }

  return (
    <Fragment>
      <Box className={classes.modal}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Invite Collaborators
          </Typography>
        </Box>

        <Typography variant="caption">
          Collaborators can...
        </Typography>

        <Stack mt={1} direction="row" justifyContent="space-between">
          <div>
            <Typography fontWeight="bold" variant="h6">Do (almost) everything</Typography>
            <Typography variant="subtitle2" color="text.secondary">Add, move or delete Pins and sections, comment and react</Typography>
          </div>

          <IconButton onClick={handleOpenPermissions}>
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </Stack>

        <Stack mb mt direction="row" spacing justifyContent="space-between">
          <TextField value="https://pin.it/id" fullWidth sx={{ maxWidth: 250 }} />
          <Button color="grey">Copy Link</Button>
        </Stack>

        <TextField label="Search" placeholder="Search by name or email" fullWidth margin="dense" />
        {/* List of users */}
        <Stack mb mt direction="row" justifyContent="space-between">
          <div>
            <Stack direction="row" justifyContent="space-between" spacing>
              <Avatar alt="User Name" src="#" />
              <Stack>
                <Typography fontWeight="bold">User Name</Typography>
                <Typography variant="caption" color="text.secondary">username</Typography>
              </Stack>
            </Stack>
          </div>
          <Button>Invite</Button>
        </Stack>
      </Box>

      <Modal
        open={openPermissions}
        onClose={handleClosePermissions}
      >
        <Box className={classes.modal}>
          <Stack mb={2} direction="row" justifyContent="space-between" alignItems="center">
            <IconButton onClick={handleClosePermissions}>
              <ArrowBackIosNewRoundedIcon color="black" />
            </IconButton>
            <Typography variant="h5" fontWeight="bold">
              Collaborators can...
            </Typography>

            <IconButton onClick={handleClose}>
              <CloseRoundedIcon color="black" />
            </IconButton>
          </Stack>

          <Typography variant="caption">
            Permissions
          </Typography>

          <RadioGroup
            defaultValue="any"
            name="permissions"
            sx={{ marginY: 1 }}
          >
            <FormControlLabel sx={{ marginY: 1 }} value="any" control={<Radio />}
              label={
                <Fragment>
                  <Typography>Do (almost) everything</Typography>
                  <Typography variant="subtitle2" color="text.secondary">Add, move or delete Pins and sections, coment</Typography>
                </Fragment>
              } />
            <FormControlLabel sx={{ marginY: 1 }} value="saveAndComment" control={<Radio />} label={
              <Fragment>
                <Typography>Save and comment</Typography>
                <Typography variant="subtitle2" color="text.secondary">Save Pins, organize them, comment, and react. For more permissions, reach out to the board owner!</Typography>
              </Fragment>
            } />
          </RadioGroup>

          <Typography variant="caption">
            Invitations
          </Typography>

          <FormGroup>
            <FormControlLabel sx={{ marginY: 1 }} control={<Checkbox />} label={
              <Fragment>
                <Typography>Invite other people</Typography>
                <Typography variant="subtitle2" color="text.secondary">Collaborators can invite others to this board</Typography>
              </Fragment>
            } />
            <FormControlLabel sx={{ marginY: 1 }} control={<Checkbox />} label={
              <Fragment>
                <Typography>Board requests</Typography>
                <Typography variant="subtitle2" color="text.secondary">People can request to join this board</Typography>
              </Fragment>
            } />
          </FormGroup>

          <Stack mt={1} direction="row" justifyContent="flex-end">
            <Button disabled>Done</Button>
          </Stack>
        </Box>
      </Modal>
    </Fragment>
  );
}

export default InviteModal;