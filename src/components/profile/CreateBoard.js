import { Box, Button, FormControlLabel, Stack, TextField, Typography, Modal, Checkbox } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { UserContext } from "../../context";
import { useNavigate } from 'react-router-dom';
import Styles from "../../styles/Styles";

function CreateBoard({ openCreateBoard, closeCreateBoard }) {
  const classes = Styles()
  const { authedUser, headers, host } = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [share, setShare] = useState(false)
  const navigate = useNavigate();

  function handleCreateBoard() {
    const data = {
      share,
      title,
      owner: authedUser.id
    }

    fetch(`${host}/board/list/`, {
      headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        navigate(`/app/board?board_id=${data.id}`)
      })
  }

  return (
    <Modal
      open={openCreateBoard}
      onClose={closeCreateBoard}
    >
      <Box className={classes.modal}>
        <Box sx={{ marginBottom: 5 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Create Board
          </Typography>
        </Box>

        <Stack spacing={3} marginY={1}>
          <TextField fullWidth label="Name" placeholder='Like "Places to Go" or "Recipes to Make"' onChange={e => setTitle(e.target.value)} />
          <FormControlLabel control={
            <Checkbox checked={!share} onChange={e => setShare(!e.target.checked)} color="black" />}
            label={
              <Fragment>
                <Typography fontWeight="bold">Keep this board secret</Typography>
                <Typography color="text_secondary">So only you and collaborators can see it</Typography>
              </Fragment>
            } />
          <Button onClick={handleCreateBoard}>Create</Button>
        </Stack>
      </Box>
    </Modal >
  );
}

export default CreateBoard;