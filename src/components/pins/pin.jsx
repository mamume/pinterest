import React, { useState, useEffect, useContext } from "react";
import "./pin_styles.css"
import { UserContext } from '../../context'
import Button from '@mui/material/Button';
import { Modal, Box, Stack, Typography, Avatar } from '@mui/material';
import Styles from "../../styles/Styles";
import CircularProgress from '@mui/material/CircularProgress';


function Pin({ open, onClose, removeItem, pinItem }) {
	const classes = Styles()
	const [pin, setPin] = useState(pinItem)
	const { authedUser, headers, host } = useContext(UserContext)
	const [owner, setOwner] = useState({})
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		setPin(pinItem)
	}, [pinItem])

	useEffect(() => {
		if (pin.owner) {
			fetch(`${host}/user_profile/details/${pin.owner}`, { headers })
				.then(res => {
					return res.json()
				})
				.then(data => {
					setOwner(data)
				})
		}
	}, [headers, host, pin])

	const handleDelete = () => {
		fetch(`${host}/user_profile/pins-delete/${pin.id}/`, {
			headers,
			method: "DELETE"
		})
			.then(res => res.json())
			.catch(() => {

				removeItem(pin.id);
				onClose();
			})
	}

	useEffect(() => {
		owner.id ? setLoaded(true) : setLoaded(false)
	}, [owner.id])

	return (
		<Modal
			open={open}
			onClose={onClose}
			style={{ zIndex: "90000000000000" }}
			sx={{ overflow: "auto" }}
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					maxWidth: '1000px',
					backgroundColor: 'white',
					borderRadius: "32px",
					boxShadow: '24px',
					padding: "20px 10px",
					marginTop: "20% auto"
				}}
			>
				<Stack direction="row" justifyContent="space-around" spacing={5} style={{ maxHeight: "600px" }}>
					<img src={pin.content_src} style={{ borderRadius: 16, maxWidth: "500px", maxHeight: "500px" }} alt="pin_image" />
					<Stack spacing={2} width={300}>
						<Stack direction="row" justifyContent="flex-end">
							{(authedUser?.id === pin.owner) && <Button onClick={handleDelete} variant="outline" color="primary" sx={{ color: "white !important", backgroundColor: " #e33225 !important" }}>Delete</Button>}
						</Stack>

						{loaded
							?
							<>
								<Stack direction="row" alignItems="center" spacing={1}>
									<a href={`/user_profile?username=${owner.username}`} className={classes.link}>
										<Avatar src={owner.profile_pic || ""} />
									</a>

									<a href={`/user_profile?username=${owner.username}`} className={classes.link}>
										<Typography>{owner.full_name || owner.username}</Typography>
									</a>
								</Stack>

								<Typography variant="h3">{pin.title}</Typography>
								<Typography variant="body1">{pin.description}</Typography>
							</>
							: <Stack direction="row" justifyContent="center"><CircularProgress /></Stack>}
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
}

export default Pin