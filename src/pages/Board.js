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
  }, [boardId, headers, host, authedUser.id])

  useEffect(() => {
    title && authedUser.id && setLoaded(true)
  }, [title, authedUser.id])

  useEffect(() => {
    ownerId === authedUser.id && setIsAuthedBoard(true)
  }, [authedUser.id, ownerId])

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
                  <Stack direction='row' alignItems="baseline" spacing>
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
                    {/* <MenuButton
                      icon={<MoreHorizIcon />}
                      options={["Edit Board", "Share", "Merge", "Archive"]}
                      label="Board Options"
                    /> */}
                  </Stack>

                  {/* <Button onClick={handleOpen} color="text" disableElevation sx={{ margin: 0, padding: 0, borderRadius: "16px" }}>
          <Stack direction='row' alignItems="center">
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src="#" />
              <Avatar alt="Travis Howard" src="#" />
              <Avatar alt="Cindy Baker" src="#" />
              <Avatar alt="Agnes Walker" src="#" />
              <Avatar alt="Trevor Henderson" src="#" />
            </AvatarGroup>
            <AddRoundedIcon fontSize="large" color="black" />
          </Stack>
        </Button> */}

                  {/* <Modal
                  open={open}
                  onClose={handleClose}
                >
                  <InviteModal
                    handleClose={handleClose}
                  />
                </Modal> */}

                  <Typography>{share ? "Public" : "Private"} Board</Typography>
                  {/* <Stack direction="row" spacing mt mb>
          <Stack alignItems="center">
            <IconButton sx={boardBtn}>
              <FlareRoundedIcon fontSize="large" color="black" />
            </IconButton>
            <Typography variant="caption">More Ideas</Typography>
          </Stack>

          <Stack alignItems="center">
            <IconButton sx={boardBtn}>
              <AppRegistrationRoundedIcon fontSize="large" color="black" />
            </IconButton>
            <Typography variant="caption">Organize</Typography>
          </Stack>

          <Stack alignItems="center">
            <IconButton sx={boardBtn}>
              <NotesRoundedIcon fontSize="large" color="black" />
            </IconButton>
            <Typography variant="caption">Notes</Typography>
          </Stack>
        </Stack> */}
                </Stack>

                <Divider sx={{ marginY: 5 }} />

                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight="bold">{pinItems.length} Pins</Typography>
                  {/* <Link className={classes.link} to={`/create_pin?board_id=${boardId}`}> */}
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
                  {/* </Link> */}

                  {/* <MenuButton
          icon={<MenuRoundedIcon fontSize="large" />}
          label="Sort boards by"
          options={["A to Z", "Drag and drop", "Last saved to"]}
        /> */}
                </Stack>

                {Boolean(pinItems.length)
                  ? <BoardPins isAuthedBoard={isAuthedBoard} boardId={boardId} pins={pinItems} />

                  : <Typography textAlign="center">There aren’t any Pins on this board yet</Typography>
                }
              </Fragment >
            )
            : <NotFound message="Private Board" />
          : <Stack direction="row" justifyContent="center" mt={10}><CircularProgress /></Stack>
      }
    </Fragment >
  );
}

export default Board;