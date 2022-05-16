/*import React from 'react';
import { useState } from 'react';
import "./create_pin_styles.css"




function upload_img (event,pinDetails, setpinDetails, setShowLabel,setShowModalPin){
    if (event.target.files && event.target.files[0] ){
        if (/image\/*//*.test(event.target.files[0].type)){
            const reader = new FileReader();


            reader.onload = ()=> {
                setpinDetails({
                    ...pinDetails,
                    img_blob : reader.result
                });
                setShowLabel(false);
                setShowModalPin(true);
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }       
}*/

/*const check_size = (event) =>{
    const imgSize = event.target
    imgSize.classList.add("pin_max_width");
    if (imgSize.getBoundingClientRect().width < imgSize.parentElement.getBoundingClientRect().width ||
        imgSize.getBoundingClientRect().height < imgSize.parentElement.getBoundingClientRect().height 
    ){
        imgSize.classList.remove("pin_max_width");
        imgSize.classList.add("pin_max_height");
    }
    imgSize.style.opacity = 1;
}


const CreatTest = () => {
    const [pinDetails, setpinDetails] = useState({
        author: "",
        board : "",
        title : "",
        description : "",
        festination : "",
        img_blob : ""
    });

    const [showLable,setShowLabel] = useState(true);
    const [showModalPin,setShowModalPin] = useState(false);
    return ( 
        <div>
            <div className="add_pin_modal">
                <div className="add_pin_container">
                    <div className="side" id="left_side">
                            <div className="section1">
                                <div className="pin_mock_icon_container">
                                    <img src="/images/more-icon.png" alt="edit" className="pin_mock_icon"/>
                                </div>

                            </div>

                            <div className="section2">
                                <label htmlFor="upload_img" id="upload_img_label"
                                    style={{
                                        display : showLable ? "block" : "none"
                                    }}
                                >
                                    <div className="upload_img_container">
                                        <div className="dotted_border">
                                            <div className="pin_mock_icon_container">
                                                <img src="/images/up-arrow.png" alt="upload_img" className="pin_mock_icon"/>
                                            </div>
                                            <div>click to upload</div>
                                            <div id="recommend">Recmmendation: use high-quality .jpg files <br />less than 20 MB</div>
                                        </div>

                                        

                                        

                                    </div>
                                    <input onChange={event => upload_img(event,pinDetails,setpinDetails,setShowLabel,setShowModalPin)} type="file" name="upload_img" id="upload_img" value="" />

                                </label>
                                <div className="modals_pin"
                                    style={{
                                        display : showModalPin ? "block" : "none"
                                    }}
                                >
                                    <div className="pin_image">
                                        <img onLoad={check_size} src={pinDetails.img_blob} alt="pin_image"/>
                                    </div>
                                </div>


                            </div>
                           
                    </div>
                    <div className="side" id="right_side">
                        <div className="section1">
                            <div className="select_size">
                                <select defaultValue="Select" name="pin_size" id="pin size">
                                    <option value="">Select</option>
                                    <option value="small">small</option>
                                    <option value="medium">meduim</option>
                                    <option value="large">large</option>
                                </select>
                                <div className="save_pin">save</div>
                            </div>
                        </div>
                        <div className="section2">
                            <input placeholder="Add your title" type="text" className="new_pin_input" id="pin_title" />
                            <input placeholder="Tell everyone what your pin is about" type="text" className="new_pin_input" id="pin_description" />
                            <input type="button" value="Add alt text" id="alt-text-btn" />
                            <input placeholder="Add a destination link" type="text" className="new_pin_input" id="pin_destination" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default CreatTest;*/