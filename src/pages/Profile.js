import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import NotFound from './NotFound'
import ShareButton from '../components/profile/ShareButton'
import FollowersModal from '../components/profile/FollowersModal'
import FollowingModal from '../components/profile/FollowingModal'
import { UserContext } from "../context";
import Masonry from 'react-masonry-component';
import CreateBoard from '../components/profile/CreateBoard'
import CreatePin from '../components/pins/create_pin'
import CircularProgress from '@mui/material/CircularProgress';
import Styles from "../styles/Styles";
import BoardThumbnail from "../components/profile/BoardThumbnail";
import ProfilePins from "../components/profile/ProfilePins";


function Profile({ addItem }) {
  const classes = Styles()
  const { authedUser, headers, host } = useContext(UserContext)

  const [fullName, setFullName] = useState('')
  const [followingNum, setFollowingNum] = useState(0)
  const [followersNum, setFollowersNum] = useState(0)
  const [profilePic, setProfilePic] = useState('')
  const [userName, setUserName] = useState('')
  const [bioText, setBioText] = useState('')
  const [userId, setUserId] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openCreateBoard, setOpenCreateBoard] = useState(false);
  const [pinItems, setPinItems] = useState([])
  const [boardItems, setBoardItems] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [isAuthedProfile, setIsAuthedProfile] = useState(false)
  const [updateTrigger, setUpdateTrigger] = useState(false)

  const handleOpenFollowers = () => setOpenFollowers(true);
  const handleCloseFollowers = () => setOpenFollowers(false);
  const handleOpenFollowing = () => setOpenFollowing(true);
  const handleCloseFollowing = () => setOpenFollowing(false);
  const handleOpenCreateBoard = () => setOpenCreateBoard(true);
  const handleCloseCreateBoard = () => setOpenCreateBoard(false);
  const [openCreatePin, setOpenCreatePin] = useState(false)

  const { usernameParam } = useParams()
  const [url, setUrl] = useState(null)

  useEffect(() => {
    return () => setFollowed(false)
  }, [])

  useEffect(() => {
    setUrl(
      usernameParam
        ? `${host}/user_profile/list?username=${usernameParam}`
        : `${host}/user_profile/list`
    )
  }, [host, usernameParam])

  useEffect(() => {
    fetch(`${host}/user_profile/following/`, { headers })
      .then(res => res.json())
      .then(data => {
        const followingUsers = data[0]?.following
        if (followingUsers) {
          try {
            for (const user of followingUsers) {
              if (user.username === userName) {
                setFollowed(true)
                break
              }
            }
          } catch (error) {
            console.log({ error })
          }
        }
      })
  }, [headers, host, userName])

  useEffect(() => {
    console.log({ url })
    fetch(url, { headers })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (!data.length)
          setNotFound(true)
        else {
          const { id, full_name, username, profile_pic, following_count, followers_count, bio, pins, boards } = data[0]
          setFullName(full_name)
          setFollowingNum(following_count)
          setFollowersNum(followers_count)
          setProfilePic(profile_pic)
          setUserName(username)
          setBioText(bio)
          setUserId(id)
          setPinItems(pins)
          setBoardItems(boards)
        }
      })
      .catch((error, res) => console.log({ error, res }))
  }, [headers, url, followed, updateTrigger])

  useEffect(() => {
    console.log({ userName, userId })
    if (userName && userId) {
      setLoaded(true)
    }
  }, [userName, userId])

  useEffect(() => {
    userName === authedUser?.username && setIsAuthedProfile(true)
  }, [authedUser?.username, userName])

  async function handleFollow(e, id = userId) {
    let statusCode

    await fetch(`${host}/user_profile/follow/${id}`, { headers })
      .then(res => res.status)
      .then((status) => statusCode = status)

    if (statusCode === 201 && id === userId) {
      setFollowed(true)
      setUpdateTrigger(prev => !prev)
    }

    return statusCode
  }

  async function handleUnfollow(e, id = userId) {
    let statusCode

    await fetch(`${host}/user_profile/unfollow/${id}`, { headers })
      .then(res => res.status)
      .then(status => statusCode = status)

    if (statusCode === 200 && id === userId) {
      setFollowed(false)
      setUpdateTrigger(prev => !prev)
    }
    return statusCode
  }

  return (
    <Fragment>
      {
        notFound
          ? <NotFound statusCode="400" message="User Not Found" />
          : loaded
            ? (
              <Fragment>
                <Stack direction="column" alignItems="center">
                  <Avatar src={profilePic} sx={{ width: 120, height: 120 }} size='large' alt="Profile Image" />

                  <Typography mt fontWeight="bold" variant="h4">{fullName}</Typography>
                  <Typography>@{userName}</Typography>
                  <Typography textAlign="center" sx={{ maxWidth: "640px" }}>{bioText}</Typography>
                  <Typography fontWeight="bold">
                    <Button disabled={!followersNum} disableRipple variant="text" onClick={handleOpenFollowers} color="black">
                      {followersNum} followers
                    </Button>
                    ·
                    <Button disabled={!followingNum} disableRipple variant="text" onClick={handleOpenFollowing} color="black">
                      {followingNum} following
                    </Button>
                  </Typography>

                  <FollowersModal
                    followersNum={followersNum}
                    username={userName}
                    handleFollow={handleFollow}
                    handleUnfollow={handleUnfollow}
                    open={openFollowers}
                    onClose={handleCloseFollowers}
                    updateTrigger={updateTrigger}
                  />

                  <FollowingModal
                    username={userName}
                    handleFollow={handleFollow}
                    handleUnfollow={handleUnfollow}
                    open={openFollowing}
                    onClose={handleCloseFollowing}
                    updateTrigger={updateTrigger}
                  />

                  <Stack direction="row" spacing={1} mt>
                    <ShareButton />
                    {isAuthedProfile
                      ? (<Link to="/settings" className={classes.link}>
                        <Button color="grey">Edit Profile</Button>
                      </Link>)
                      : <Fragment>
                        {followed
                          ? <Button color="black" onClick={handleUnfollow}>Unfollow</Button>
                          : <Button onClick={handleFollow}>Follow</Button>
                        }</Fragment>
                    }
                  </Stack>
                </Stack>

                <Divider sx={{ marginY: 5 }} />
                <Stack direction='row' justifyContent="space-between" mt={3}>
                  <Typography fontWeight="bold" variant="h6">Boards</Typography>
                  {isAuthedProfile && <Button color="grey" onClick={handleOpenCreateBoard}>Create Board</Button>}
                </Stack>

                <CreateBoard
                  openCreateBoard={openCreateBoard}
                  closeCreateBoard={handleCloseCreateBoard}
                />

                {Boolean(boardItems.length)
                  ? <Masonry className={classes.masonry}>
                    {boardItems.map((item, index) => (
                      <BoardThumbnail isAuthedProfile={isAuthedProfile} board={item} key={index} />
                    ))}
                  </Masonry>
                  : <Typography textAlign="center">There are no Boards</Typography>
                }

                <Divider sx={{ marginY: 5 }} />
                <Stack direction='row' justifyContent="space-between" mt={3}>
                  <Typography fontWeight="bold" variant="h6">Pins</Typography>
                  {isAuthedProfile && <>
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
                  </>}
                </Stack>

                {Boolean(pinItems.length)
                  ? <ProfilePins pins={pinItems} isAuthedProfile={isAuthedProfile} />
                  : <Typography textAlign="center" mb={3}>There are no pins</Typography>}
              </Fragment>
            )
            : <Stack direction="row" justifyContent="center" mt={10}><CircularProgress /></Stack>
      }
    </Fragment>
  );
}

export default Profile;