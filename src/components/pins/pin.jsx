import React, { useState, useEffect, useContext } from "react";
import "./pin_styles.css"
import { UserContext } from '../../context'
import Button from '@mui/material/Button';
import { Modal, Box, Stack, Typography, Avatar } from '@mui/material';
import Styles from "../../styles/Styles";
import CircularProgress from '@mui/material/CircularProgress';


// const handelfocus = () => {
// 	let ftarget = document.getElementById("comment_controllers")
// 	ftarget.classList.add("comment_vis")
// }

// const handelclick = () => {
// 	let btarget = document.getElementById("comment_controllers")

// 	btarget.classList.remove("comment_vis")
// 	btarget.classList.add("comment_hide")
// }

// const handelchange = (event) => {
// 	let target = document.getElementsByClassName("comment_done")
// 	target.item(0).disabled = false;
// 	target.item(0).classList.add("comment_done_edite")
// 	if (event.target.value === "") {
// 		target.item(0).disabled = true;
// 		target.item(0).classList.remove("comment_done_edite")
// 	}
// }

// const commentclick = () => {
// 	let dis = document.getElementById("comment_area_container")
// 	dis.classList.toggle("comment_area_container");
// }


function Pin({ open, onClose, removeItem, pinItem }) {
	const classes = Styles()
	const [pin, setPin] = useState(pinItem)
	const { authedUser, headers, host } = useContext(UserContext)
	const [owner, setOwner] = useState({})
	const [loaded, setLoaded] = useState(false)


	// useEffect(() => {
	// 	fetch(`${host}/pin/${id}`)
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			// console.log(data)
	// 			setPin(data)
	// 		})
	// }, [host, id])
	useEffect(() => {
		setPin(pinItem)
	}, [pinItem])

	useEffect(() => {
		if (pin.owner) {
			// console.log(pin.owner)
			fetch(`${host}/profile/details/${pin.owner}`, { headers })
				.then(res => {
					// console.log({ res })
					return res.json()
				})
				.then(data => {
					// console.log({ data })
					setOwner(data)
				})
		}
	}, [headers, host, pin])

	const handleDelete = () => {
		fetch(`${host}/profile/pins-delete/${pin.id}/`, {
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
					{/* </div> */}
					{/* </div> */}

					{/* </div> */}
					<Stack spacing={2} width={300}>
						{/* <div className="right-side col-md-5"> */}
						{/* <div className="section1 row">
							<div className="icons col-6">
								<div className="icon_more"> */}
						{/* <i className="fas fa-ellipsis-h"></i> */}
						{/* </div> */}
						{/* <div className="upload">
									<i className="fas fa-upload"></i>
								</div>
								<div className="favorite">
									<i className="far fa-star"></i>
								</div> */}
						{/* </div> */}

						{/* <div > */}
						<Stack direction="row" justifyContent="flex-end">
							{(authedUser.id === pin.owner) && <Button onClick={handleDelete} variant="outline" color="primary" sx={{ color: "white !important", backgroundColor: " #e33225 !important" }}>Delete</Button>}
						</Stack>
						{/* </div> */}

						{/* </div> */}

						{/* <div className="section2 row">
							<div className="section2_header col-12"> */}
						{loaded
							? <>
								<Stack direction="row" alignItems="center" spacing={1}>
									<a href={`/profile?username=${owner.username}`} className={classes.link}>
										<Avatar src={owner.profile_pic || ""} />
									</a>
									{/* {owner.profile_pic} */}
									<a href={`/profile?username=${owner.username}`} className={classes.link}>
										<Typography>{owner.full_name || owner.username}</Typography>
									</a>
								</Stack>
								<Typography variant="h3">{pin.title}</Typography>
								<Typography variant="body1">{pin.description}</Typography>
							</>
							: <Stack direction="row" justifyContent="center"><CircularProgress /></Stack>}

						{/* <div className="pin_description_for_pin">{pin.desc}</div> */}
						{/* </div> */}
						{/* <div className="user_details row">
							<div className="user_icon col-1"><span>m</span></div>
							<div className="user_name col-4"><span>momen awad</span></div>
						</div> */}


						{/* <div className="note">
							<div className="note_head">
								Note to self
							</div>
							<div className="note_details">
								what do you want to remember about this pin?
							</div>
							<div className="add_note" ><span>Add note</span></div>
						</div> */}


						{/* <div className="section3">
							<div className="comment_head">
								<h3>comments</h3>
								<div className="comment_icon" onClick={commentclick}>
									<i className="fas fa-chevron-down"></i>
								</div>
							</div>
							<div className="comment_area_container" id="comment_area_container">
								<div className="comment_area_header">
									share feedback, ask a question or give a high five
								</div>

								<div className="comment_area">
									<div className="persons_icon"><span>A</span></div>
									<div className="text">
										<input type="text" placeholder="Add a comment" name="comment" className="comment-btn" onFocus={handelfocus} onChange={handelchange} />
									</div>
								</div>
								<div className="comment_controllers" id="comment_controllers">
									<input type="button" value="Cancel" name="comment_canceled" className="comment_canceled" onClick={handelclick} />
									<input type="button" value="Done" name="comment_done" className="comment_done" disabled />
								</div>
							</div>
						</div> */}


						{/* </div> */}
						{/* <div className="bord_name">
							<div className="bord_items">
								<div className="comment_icon"><span>M</span></div>
								<div className="bord_content">
									<span>you saved to bord name</span>
								</div>
							</div>
						</div> */}
					</Stack>
				</Stack>
				{/* <div className="container"> */}
				{/* <div className="sides row"> */}

				{/* <div className="left-side col-md-5"> */}
				{/* <div className="modals_pin_pin"> */}
				{/* <div className="pin_image_pin"> */}

				{/* </div> */}
				{/* </div> */}
			</Box>
		</Modal >
	);
}

export default Pin