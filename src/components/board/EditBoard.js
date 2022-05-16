import { Box, Button, FormControlLabel, Stack, TextField, Typography, Modal, Checkbox } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { UserContext } from "../../context";
import Styles from "../../styles/Styles";

function EditBoard({ boardId, openEditBoard, closeEditBoard, boardTitle, boardShare }) {
  const classes = Styles()
  const { headers, host } = useContext(UserContext)
  const [title, setTitle] = useState(boardTitle)
  const [share, setShare] = useState(boardShare)

  function editBoard() {
    const data = { title, share }

    fetch(`${host}/board/update/${boardId}/`, {
      headers,
      method: 'PATCH',
      body: JSON.stringify(data)
    })
      .then(window.location.reload())
  }

  return (
    <Modal
      open={openEditBoard}
      onClose={closeEditBoard}
    >
      <Box className={classes.modal}>
        <Box sx={{ marginBottom: 5 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Edit Board
          </Typography>
        </Box>

        <Stack spacing={3} marginY={1}>
          <TextField value={title} fullWidth label="Name" placeholder='Like "Places to Go" or "Recipes to Make"' onChange={e => setTitle(e.target.value)} />
          <FormControlLabel control={
            <Checkbox checked={!share} onChange={e => setShare(!e.target.checked)} color="black" />}
            label={
              <Fragment>
                <Typography fontWeight="bold">Keep this board secret</Typography>
                <Typography color="text_secondary">So only you and collaborators can see it</Typography>
              </Fragment>
            } />
          <Button onClick={editBoard}>Edit</Button>
        </Stack>
      </Box>
    </Modal >
  );
}

export default EditBoard;