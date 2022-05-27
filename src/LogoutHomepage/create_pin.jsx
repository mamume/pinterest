import React from 'react';
import { useState } from 'react';
import "./create_pin_styles.css"


function upload_img(event, pinDetails, setPinDetails, setShowLabel, setShowModalPin) {
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)) {
            const reader = new FileReader();
            reader.onload = () => {
                setPinDetails({
                    ...pinDetails,
                    img_blob: reader.result
                });
                setShowLabel(false);
                setShowModalPin(true);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
}

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

const handelFocus = (event) => {
    let ftitle = event.target
    console.log(ftitle)
    ftitle.classList.add("pin_title_on_focus");
    console.log("changed")
}

const handelBlur = (event) => {
    let ftitle = event.target
    ftitle.classList.remove("pin_title_on_focus");
    console.log("changed")

}

const handelClick = (event) => {
    event.target.classList.add("alt_text_btn_disappears")
    let alttext = document.getElementsByClassName("alt_text")
    alttext.item(0).classList.add("alt_text_display")
}
const MoreOptions = () => {
    let element = document.getElementsByClassName("more_options_btn");
    element.item(0).classList.toggle("more_options_btn_display");
}

const Create = () => {
    const [pinDetails, setpinDetails] = useState({
        author: "",
        board: "",
        title: "",
        description: "",
        festination: "",
        img_blob: ""
    });

    const [showLable, setShowLabel] = useState(true);
    const [showModalPin, setShowModalPin] = useState(false);
    return (
        <div>
            <div className="add_pin_modal">
                <div className="row add_pin_container">
                    <div className="side col-md-5" id="left_side">
                        <div className="section1 row">
                            <div className="pin_mock_icon_container" onClick={MoreOptions}>
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>

                        <div className="section2">
                            <label htmlFor="upload_img" id="upload_img_label"
                                style={{
                                    display: showLable ? "block" : "none"
                                }}
                            >
                                <div className="upload_img_container">
                                    <div className="dotted_border">
                                        <div className="pin_mock_icon_container">
                                            <img src="/images/up-arrow.png" alt="upload_img" className="pin_mock_icon" />
                                        </div>
                                        <div>click to upload</div>
                                        <div id="recommend">Recmmendation: use high-quality .jpg files <br />less than 20 MB</div>
                                    </div>
                                </div>

                                <input onChange={event => upload_img(event, pinDetails, setpinDetails, setShowLabel, setShowModalPin)} type="file" name="upload_img" id="upload_img" value="" />
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

                    <div className="side col-md-5" id="right_side">
                        <div className="section1">
                            <div className="select_size">
                                <select defaultValue="Select" name="pin_size" id="pin size">
                                    <option value="">Select</option>
                                    <option value="option1">option1</option>
                                    <option value="option2">option2</option>
                                    <option value="option3">option3</option>
                                </select>
                                <div className="save_pin">save</div>
                            </div>
                        </div>

                        <div className="section2">
                            <input placeholder="Add your title" type="text" className="new_pin_input pin_title" id="pin_title" onFocus={(event) => handelFocus(event)} onBlur={(event) => handelBlur(event)} />
                            <input placeholder="Tell everyone what your pin is about" type="text" className=" pin_description" id="pin_description" onFocus={(event) => handelFocus(event)} onBlur={(event) => handelBlur(event)} />
                            <input type="button" value="Add alt text" id="alt-text-btn" onClick={(event) => handelClick(event)} />
                            <input placeholder="Explain what people can see in the pin" type="text" className="alt_text" onFocus={(event) => handelFocus(event)} onBlur={(event) => handelBlur(event)} />
                            <input placeholder="Add a destination link" type="text" className="pin_destination" id="pin_destination" onFocus={(event) => handelFocus(event)} onBlur={(event) => handelBlur(event)} />
                        </div>
                    </div>

                    <div className="more_options_btn col-2">
                        <div className="m_delete col-3">Delete</div>
                        <div className="m_duplicate col-3"><span>Duplicate</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;