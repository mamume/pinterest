import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import { UserContext } from "../context";
import NotFound from './NotFound'
import CircularProgress from '@mui/material/CircularProgress';
import CreatePin from '../components/pins/create_pin'
import DeleteIcon from '@mui/icons-material/Delete';
import BoardPins from "../components/board/BoardPins";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import EditBoard from "../components/board/EditBoard";

function Board({ addItem }) {
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const [boardId] = useState(params.get('board_id'))
  const [title, setTitle] = useState('')
  const [share, setShare] = useState(false)
  const [, setDescription] = useState('')
  const [pinItems, setPinItems] = useState([])
  const [coverImage, setCoverImage] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [openCreatePin, setOpenCreatePin] = useState(false)
  const [openEditBoard, setOpenEditBoard] = useState(false)
  const [ownerId, setOwnerId] = useState(null)
  const [isAuthedBoard, setIsAuthedBoard] = useState(false)
  const [authorized, setAuthorized] = useState(true)

  const { headers, host, authedUser } = useContext(UserContext)

  useEffect(() => {
    return () => {
      setTitle('')
      setShare(false)
      setDescription('')
      setPinItems([])
      setCoverImage('')
      setOwnerId(null)
    }
  }, [])

  useEffect(() => {
    if (boardId) {
      fetch(`${host}/board/list/${boardId}`, { headers })
        .then(res => res.json())
        .then(data => {
          if (!data.id)
            setNotFound(true)
          else {
            setTitle(data.title)
            setShare(data.share)
            setDescription(data.description)
            setPinItems(data.pins)
            setCoverImage(data.cover_img)
            setOwnerId(data.owner)
          }
        })
    }
    else
      setNotFound(true)
  }, [boardId, headers, host, authedUser?.id])

  useEffect(() => {
    title && authedUser.id && setLoaded(true)
  }, [title, authedUser?.id])

  useEffect(() => {
    ownerId === authedUser?.id && setIsAuthedBoard(true)
  }, [authedUser?.id, ownerId])

  useEffect(() => {
    !isAuthedBoard && !share
      ? setAuthorized(false)
      : setAuthorized(true)
  }, [isAuthedBoard, share])

  function deleteBoard() {
    fetch(`${host}/board/list/${boardId}/`, {
      headers,
      method: 'DELETE'
    })
      .then(
        window.location.href = `http://localhost:3000/profile`
      )
  }

  return (
    <Fragment>
      {notFound
        ? <NotFound statusCode={400} message="Board is not found" />
        : loaded
          ? authorized
            ? (
              <Fragment>
                <Stack direction="column" alignItems="center">
                  <Avatar src={coverImage || '/images/board_placeholder.png'} sx={{ width: 120, height: 120 }} size='large' alt="Profile Image">
                  </Avatar>
                  <Stack direction='row' alignItems="baseline">
                    <Typography mt fontWeight="bold" variant="h4">{title}</Typography>
                    {isAuthedBoard && <>
                      <IconButton color="info" onClick={() => setOpenEditBoard(true)}>
                        <EditTwoToneIcon />
                      </IconButton>
                      <EditBoard
                        openEditBoard={openEditBoard}
                        closeEditBoard={() => setOpenEditBoard(false)}
                        boardTitle={title}
                        boardShare={share}
                        boardId={boardId}
                      /></>}
                  </Stack>

                  <Typography>{share ? "Public" : "Private"} Board</Typography>
                </Stack>

                <Divider sx={{ marginY: 5 }} />

                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight="bold">{pinItems.length} Pins</Typography>
                  {isAuthedBoard && (
                    <Fragment>
                      <Button
                        color="grey"
                        onClick={() => setOpenCreatePin(true)}
                      >
                        Create Pin
                      </Button>

                      <CreatePin
                        setPinItems={setPinItems}
                        addItem={addItem}
                        open={openCreatePin}
                        onClose={() => setOpenCreatePin(false)}
                      />

                      <Button
                        sx={{ bgcolor: "white", position: "absolute", bottom: "10px", right: "20px", zIndex: "11" }}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={deleteBoard}
                      >
                        Delete Board
                      </Button>
                    </Fragment>
                  )}
                </Stack>

                {Boolean(pinItems.length)
                  ? <BoardPins isAuthedBoard={isAuthedBoard} boardId={boardId} pins={pinItems} />
                  : <Typography textAlign="center">There aren’t any Pins on this board yet</Typography>
                }
              </Fragment>
            )
            : <NotFound message="Private Board" />
          : <Stack direction="row" justifyContent="center" mt={10}><CircularProgress /></Stack>
      }
    </Fragment>
  );
}

export default Board;