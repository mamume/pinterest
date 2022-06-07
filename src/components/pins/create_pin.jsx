import React from 'react';
import { useState, useContext } from 'react';
import "./create_pin_styles.css";
import Button from '@mui/material/Button';
import { UserContext } from "../../context";
import { IconButton, Modal, Stack, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const check_size = (event) => {
    const imgSize = event.target
    imgSize.classList.add("pin_max_width");
    if (imgSize.getBoundingClientRect().width < imgSize.parentElement.getBoundingClientRect().width ||
        imgSize.getBoundingClientRect().height < imgSize.parentElement.getBoundingClientRect().height
    ) {
        imgSize.classList.remove("pin_max_width");
        imgSize.classList.add("pin_max_height");
    }
    imgSize.style.opacity = 1;
}

const MoreOptions = () => {
    let element = document.getElementsByClassName("more_options_btn");
    element.item(0).classList.toggle("more_options_btn_display");
}

const Create = ({ open, onClose, addItem, setPinItems }) => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const [boardId] = useState(params.get('board_id'))
    const [pinDetails] = useState({
        author: "",
        board: "",
        title: "",
        description: "",
        festination: "",
        img_blob: ""
    });

    const { authedUser, headers, host } = useContext(UserContext)
    const [title, setTitle] = useState("")
    const [image, setImage] = useState(null)
    const [imageSrc, setImageSrc] = useState(null)
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState("")

    const handlePost = () => {
        if (title === "")
            setMessage("Please Enter Title")
        else if (!image)
            setMessage("Please select an image")
        else {

            const fd = new FormData()
            fd.append('content_src', image, image.name.slice(0, 100))
            fd.append('title', title)
            fd.append('content_type', 'image')
            fd.append('owner', authedUser.id)
            description && fd.append('description', description)
            if (boardId) {
                fd.append('board_id', boardId)
            }

            if (host) {
                fetch(`${host}/pin/create/`, {
                    method: 'POST',
                    body: fd,
                    headers: {
                        'Authorization': headers.Authorization
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        addItem(data)
                        if (setPinItems) {
                            setPinItems(pinItems => [data, ...pinItems])
                        }
                        onCloseModal()
                    });
            }
        }
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0])

        const reader = new FileReader()
        reader.onload = (e) => {
            setImageSrc(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    function onCloseModal() {
        setImage(null)
        setImageSrc(null)
        setTitle("")
        setDescription("")
        onClose()
    }
    const [showLabel] = useState(true);
    const [showModalPin] = useState(false);

    return (
        <Modal
            style={{ zIndex: 1000001 }}
            open={open}
            onClose={onCloseModal}
        >
            <div>
                <div className="add_pin_modal">
                    <div className="add_pin_container">
                        <div className="side" id="left_side">
                            <IconButton onClick={onCloseModal} sx={{ display: "flex" }}>
                                <CloseIcon color="primary" />
                            </IconButton>

                            <div className="section1">
                                <div className="pin_mock_icon_container" onClick={MoreOptions}>
                                    <i className="fas fa-ellipsis-h"></i>
                                </div>
                            </div>

                            <div className="section2">
                                <label htmlFor="upload_img" id="upload_img_label"
                                    style={{
                                        display: showLabel ? "block" : "none"
                                    }}
                                >
                                    <div className="dotted_border">
                                        <img style={{ maxHeight: 'inherit' }} src={imageSrc || "/images/upload_image_placeholder.svg"} alt="upload_img" className="pin_mock_icon" onChange={(e) => { handleImageChange(e) }} />
                                    </div>

                                    <input onChange={event => handleImageChange(event)} type="file" name="upload_img" id="upload_img" value="" />
                                </label>
                                <div className="modals_pin"
                                    style={{
                                        display: showModalPin ? "block" : "none"
                                    }}
                                >
                                    <div className="pin_image">
                                        <img onLoad={check_size} src={pinDetails.img_blob} alt="pin_image" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Stack className="side" id="right_side" mt={7}>
                            <Stack mt={4} >
                                <TextField label="Title" fullWidth placeholder="Add pin title" onChange={(e) => { handleTitleChange(e) }} />
                                <Typography variant='caption' color="primary">{message}</Typography>
                                <br />
                                <TextField label="Description" fullWidth placeholder="Add Description" onChange={(e) => setDescription(e.target.value)} />
                            </Stack>
                            <Stack direction="row" justifyContent="end" mt={2}>
                                <Button onClick={handlePost}>Save</Button>
                            </Stack>
                        </Stack>
                        <div className="more_options_btn">
                            <div className="m_delete">Delete</div>
                            <div className="m_duplicate"><span>Duplicate</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    );
}

export default Create;