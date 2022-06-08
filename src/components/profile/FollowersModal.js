import { Modal, Stack, Typography, Box, Avatar, Button } from "@mui/material";
import { useContext, useEffect, useState, Fragment } from "react";
import { UserContext } from "../../context";
import Styles from "../../styles/Styles";


function FollowersModal({ open, onClose, followersNum, username, handleFollow, handleUnfollow, updateTrigger }) {
  const classes = Styles()
  const { headers, host, authedUser, loading } = useContext(UserContext)

  const [followers, setFollowers] = useState([])
  const [authedFollowingIds, setAuthedFollowingIds] = useState([])

  useEffect(() => {
    return () => {
      setFollowers([])
    }
  }, [])

  useEffect(() => {
    fetch(`${host}/user_profile/followers?username=${username}`, { headers })
      .then(res => res.json())
      .then(data => {
        setFollowers(data.map(user => ({
          id: user.follower[0].id,
          fullName: user.follower[0].full_name,
          profilePic: user.follower[0].profile_pic,
          username: user.follower[0].username,
        })))
      })
  }, [username, headers, host, updateTrigger])

  useEffect(() => {
    if (!loading)
      fetch(
        `${host}/user_profile/following/`,
        { headers }
      )
        .then(res => res.json())
        .then(data => (
          setAuthedFollowingIds(data.map(user => (user.following[0].id)))
        ))
  }, [loading, authedUser?.username, headers, host, authedUser?.following, updateTrigger])


  async function handleToFollow(e, id) {
    const status = await handleFollow(e, id)
    if (status === 201) {
      setAuthedFollowingIds(prev => [...prev, id])
    }
  }

  async function handleToUnfollow(e, id) {
    const status = await handleUnfollow(e, id)
    if (status === 200) {
      setAuthedFollowingIds(prev => prev.filter(userId => userId !== id))
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box className={classes.modal}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            {followersNum} Followers
          </Typography>
        </Box>
        <Stack spacing={3}>
          {followers.map(follower => (
            <Fragment key={follower.id}>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <a className={classes.link} href={`/profile/${follower.username}`}>
                    <Avatar sx={{ width: 56, height: 56 }} src={follower.profilePic} />
                  </a>
                  <a className={classes.link} href={`/profile/${follower.username}`}>
                    <Typography fontWeight="bold">{follower.fullName}</Typography>
                  </a>
                </Stack>
                {follower.id !== authedUser.id && (
                  authedFollowingIds.includes(follower.id)
                    ? <Button onClick={(e) => handleToUnfollow(e, follower.id)} variant="text" color="warning">Unfollow</Button>
                    : <Button onClick={(e) => handleToFollow(e, follower.id)} variant="text">Follow</Button>
                )}
              </Stack>
            </Fragment>
          ))}
          {!followers.length && <Typography textAlign="center">There are no following users</Typography>}
        </Stack>
      </Box>
    </Modal>
  );
}

export default FollowersModal;