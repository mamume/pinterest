import React, { Fragment, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CreatePin from '../pins/create_pin'



function AddButton({ addItem }) {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)
  return (
    <Fragment>
      <IconButton onClick={onOpen} color="primary" aria-label="add to shopping cart" style={{
        position: "fixed",
        bottom: 90,
        right: 50,
        padding: "15px",
        color: "black",
        zIndex: 10000,
        backgroundColor: "white"
      }} sx={{ boxShadow: 3, }}>
        <AddIcon sx={{
          fontSize: 20,
          transform: "scale(2)"

        }}
        />
      </IconButton>

      <CreatePin
        addItem={addItem}
        onClose={onClose}
        open={open}
      />
    </Fragment>
  )
}

export default AddButton
