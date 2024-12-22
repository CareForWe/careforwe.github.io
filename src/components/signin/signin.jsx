import React, { useState } from 'react';
import { Link } from "react-router-dom"
import doctor_img from "../../assets/doctor.png"
import basic_img from "../../assets/basic.png"
import cancer_img from "../../assets/cancer.png"
import Popup from '../util/popup';

const SignIn = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleButtonClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    return(
        <div className="learn">
            <div className="welcomeSecWrapper">
                <div className="welcomeSec">
                    <img src={doctor_img} className="doctor_img" />
                    <div className="welcomeSec_content">
                        <div className="welcomeTitle">Hello there!</div>
                        <div className="welcomeText">What would you like to learn today?</div>
                    </div>
                </div>
            </div>
            
            <div className="learn_content">
                <div className="learn_path_sec">
                    <img src={basic_img} className="basic_img" />
                    <div className="pathSec_content">
                        <div className="pathSec_title">
                            Learning Pathway: Caregiving Basics 101
                        </div>
                        <div className="pathSec_subtitle">
                            This pathway offers a comprehensive introduction, covering essential topics such as basic care techniques, effective communication strategies, 
                            and self-care practices for caregivers. Ideal for beginners, this module provides the crucial knowledge and skills needed to confidently navigate the early stages of caregiving, 
                            ensuring a supportive, compassionate, and effective care experience for both the caregiver and their loved one.
                        </div>
                        <Link className="learnExploreBtn" to='/learn' onClick={handleButtonClick}>
                            <text className='learnExploreBtnText'>Explore Pathway</text>
                        </Link> 
                    </div>
                </div>

                <div className="learn_path_sec">
                    <img src={cancer_img} className="basic_img" />
                    <div className="pathSec_content">
                        <div className="pathSec_title">
                            Learning Pathway: Understanding Cancer
                        </div>
                        <div className="pathSec_subtitle">
                            Understanding Cancer is a specialized learning pathway focused on equipping caregivers with essential knowledge about cancer care. 
                            This course delves into the intricacies of cancer, its various types, treatment options, and the physical and emotional impact on patients. 
                            It aims to provide caregivers with a deeper understanding of cancer management and ways to support patients through their treatment journey. 
                        </div>
                        <Link className="learnExploreBtn" to='/learn' onClick={handleButtonClick}>
                            <text className='learnExploreBtnText'>Explore Pathway</text>
                        </Link> 
                    </div>
                </div>
            </div>
            <Popup isOpen={isPopupOpen} closePopup={handleClosePopup}>
                <div>We are still working on it!
                    <p>This pathway will open soon. Stay tuned!</p></div>
            </Popup>
        </div>
    )
}

export default SignIn