import { Fragment } from "react";
import React, { useState, useEffect, useContext } from "react";
import SinglePin from '../components/pins/SinglePin'
import Masonry from 'react-masonry-component';
import AddButton from "../components/navigationbar/AddButton"
import { UserContext } from "../context";
// import CircularProgress from '@mui/material/CircularProgress';
// import { Stack } from "@mui/material";
import Styles from '../styles/Styles'
import Pin from '../components/pins/pin'


function Homepage({ pins, addItem, removeItem }) {
  const classes = Styles()
  // const [loaded, setLoaded] = useState(false)
  const { authedUser, host, headers } = useContext(UserContext)
  const [boards, setBoards] = useState([])

  const [open, setOpen] = useState(false)
  // const onClose = () => setOpen(false)
  // const onOpen = () => setOpen(true)
  const [pinModalItem, setPinModalItem] = useState({})

  useEffect(() => {
    if (authedUser.id) {
      fetch(`${host}/board/list?owner_id=${authedUser.id}`, { headers })
        .then(res => res.json())
        .then(data => setBoards(data))

    }
  }, [authedUser.id, headers, host])


  // useEffect(() => {
  //   pins.length /*&& boards.length*/
  //     ? setLoaded(true)
  //     : setLoaded(false)
  // }, [pins.length])

  function onOpenPinModal(pinItem) {
    setPinModalItem(pinItem)
    setOpen(true)
  }

  function onClosePinModal() {
    setOpen(false)
    setPinModalItem({})
  }

  return (
    <Fragment>
      {/* {loaded
        ?  */}
      {authedUser
        ? (
          <Fragment>
            <AddButton addItem={addItem} />
            <Masonry className={classes.masonry}  >

              {pins.map((pin) => (
                <SinglePin onOpenPinModal={() => onOpenPinModal(pin)} key={pin.id} pinItem={pin} img={pin.content_src} external_link={pin.external_website} id={pin.id} boards={boards || []} sub_board={pin.board || []} removeItem={removeItem} />
              ))}
            </Masonry>
            <Pin pinItem={pinModalItem} open={open} onClose={onClosePinModal} removeItem={removeItem} />
          </Fragment>
        )
        : <div>Please Login</div>}
      {/* : <Stack direction="row" justifyContent="center" mt={10}><CircularProgress /></Stack>
      } */}
    </Fragment >
  );
}

export default Homepage;