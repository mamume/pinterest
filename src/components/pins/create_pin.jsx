import React from 'react';
import { useState, useContext } from 'react';
import "./create_pin_styles.css";
import Button from '@mui/material/Button';
import { UserContext } from "../../context";
import { IconButton, Modal, Stack, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';





// function upload_img(event, pinDetails, setpinDetails, setShowLabel, setShowModalPin) {
//     if (event.target.files && event.target.files[0]) {
//         if (/image\/*/.test(event.target.files[0].type)) {
//             const reader = new FileReader();


//             reader.onload = () => {
//                 setpinDetails({
//                     ...pinDetails,
//                     img_blob: reader.result
//                 });
//                 setShowLabel(false);
//                 setShowModalPin(true);
//             }

//             reader.readAsDataURL(event.target.files[0]);
//         }
//     }
// }


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

// const handelFocus = (event) => {
//     let ftitle = event.target
//     ftitle.classList.add("pin_title_on_focus");
//     // console.log("changed")
// }

// const handelBlur = (event) => {
//     let ftitle = event.target
//     ftitle.classList.remove("pin_title_on_focus");
//     // console.log("changed")

// }

// const handelClick = (event) => {
//     event.target.classList.add("alt_text_btn_disappears")
//     let alttext = document.getElementsByClassName("alt_text")
//     alttext.item(0).classList.add("alt_text_display")
// }
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
    // const [open, setOpen] = useState(false)
    // const onClose = () => setOpen(false)
    // const onOpen = () => setOpen(true)
    // let param = useParams();
    // useEffect(() => {

    //     console.log(props)
    // }, [])
    const handlePost = () => {
        if (title === "")
            setMessage("Please Enter Title")
        else if (!image)
            setMessage("Please select an image")
        else {

            const fd = new FormData()
            //headers["content-type"] =  'multipart/form-data' ;
            //headers["content-type"] ='multipart/form-data; boundary=something' ;
            // console.log(headers.Authorization)
            // console.log(authedUser)
            fd.append('content_src', image, image.name)
            fd.append('title', title)
            fd.append('content_type', 'image')
            fd.append('owner', authedUser.id)
            description && fd.append('description', description)
            if (boardId) {
                fd.append('board_id', boardId)
            }
            // for (var pair of fd.entries()) {
            // console.log(pair[0] + ', ' + pair[1]);
            // }

            // const config = {
            //     headers: headers
            // };
            /*const requestOptions = {
                method: 'POST',
                headers: headers ,
                body: fd
            }; */
            // console.log(host)
            if (host) {

                fetch(`${host}/pin/create`, {
                    method: 'POST',
                    body: fd,
                    headers: { 'Authorization': headers.Authorization }
                })
                    //axios.post('http://localhost:8000/pin/create', fd)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data)
                        addItem(data)
                        if (setPinItems) {
                            setPinItems(pinItems => [data, ...pinItems])
                        }
                        onClose()
                        //history(`/pin/${data.id}`)


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
        // console.log(e.target.files[0])
    }

    function handleTitleChange(event) {
        setTitle(event.target.value)
        // console.log(event.target.value);
    }

    /* const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ title: 'React POST Request Example' })
     };
     fetch('https://reqres.in/api/posts', requestOptions)
         .then(response => response.json())
         .then(data => this.setState({ postId: data.id }));
 }
 */

    function onCloseModal() {
        setImage(null)
        setImageSrc(null)
        setTitle("")
        setDescription("")
        onClose()
    }
    const [showLable] = useState(true);
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
                                        display: showLable ? "block" : "none"
                                    }}
                                >
                                    {/* <div className="upload_img_container"> */}
                                    <div className="dotted_border">
                                        {/* <div className="pin_mock_icon_container"> */}
                                        <img style={{ maxheight: 'inherit' }} src={imageSrc || "/images/upload_image_placeholder.svg"} alt="upload_img" className="pin_mock_icon" onChange={(e) => { handleImageChange(e) }} />
                                        {/* </div> */}
                                        {/* <div>click to upload</div> */}
                                        {/* <div id="recommend">Recmmendation: use high-quality .jpg files <br />less than 20 MB</div> */}
                                    </div>





                                    {/* </div> */}
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
                            {/* <div className="section1"> */}
                            {/* </div> */}
                            <Stack mt={4} >
                                <TextField label="Title" fullWidth placeholder="Add pin title" onChange={(e) => { handleTitleChange(e) }} />
                                <Typography variant='caption' color="primary">{message}</Typography>
                                <br />
                                <TextField label="Description" fullWidth placeholder="Add Description" onChange={(e) => setDescription(e.target.value)} />
                                {/* <input placeholder="Tell everyone what your pin is about" type="text" className=" pin_description" id="pin_description" onFocus={(event) => handelFocus(event)} onBlur={(event) => handelBlur(event)} /> */}
                                {/* <input type="button" value="Add alt text" id="alt-text-btn" onClick={(event) => handelClick(event)} /> */}
                                {/* <input placeholder="Explain what people can see in the pin" type="text" className="alt_text" onFocus={(event) => handelFocus(event)} onBlur={(event) => handelBlur(event)} /> */}
                                {/* <input placeholder="Add a destination link" type="text" className="pin_destination" id="pin_destination" onFocus={(event) => handelFocus(event)} onBlur={(event) => handelBlur(event)} /> */}
                            </Stack>
                            <Stack direction="row" justifyContent="end" mt={2}>
                                {/* <select defaultValue="Select" name="pin_size" id="pin size">
                                        <option value="">Select</option>
                                        <option value="option1">option1</option>
                                        <option value="option2">option2</option>
                                        <option value="option3">option3</option>
                                    </select> */}
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