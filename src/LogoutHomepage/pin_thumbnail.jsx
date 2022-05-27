import React from 'react';
import "./pin_thumbnail_styles.css"

class PinThumbnail extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="pin_container">
                    <div className="pin_elements">
                        <div className="head_section">
                            <div className="save_card">
                                <span>Save</span>
                            </div>
                            <div className="Profile">
                                <select defaultValue="Profile" name="Select_Profile" id="Select_profile">
                                    <option value="" id="sh">Profile</option>
                                    <option value="option1">option1</option>
                                    <option value="option2">option2</option>
                                    <option value="option3">option3</option>
                                </select>
                            </div>
                        </div>
                        <div className="foot_section">
                            <div className="destination">
                                <div className="icon_container">
                                    <i className="fas fa-long-arrow-alt-up" id="arrow"></i>
                                </div>
                                <div className="dist_cont">www.momenawad.com</div>
                            </div>
                            <div className="icon_container">
                                <i class="fas fa-upload"></i>
                            </div>
                            <div className="icon_container">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    </div>
                    <div className="pin_image_container">
                        <img src="/images/movie2.jpg" alt="pin_img" className="pin_image" />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PinThumbnail;