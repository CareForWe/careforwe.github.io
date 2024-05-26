import "./home.css";
import { Link } from "react-router-dom";
import landing_img from "../../assets/caregiving.png";
import support_img from "../../assets/support.png";
import learn_img from "../../assets/learn.png";
import grow_img from "../../assets/grow.png";
import nus_img from "../../assets/NUS.png";
import { useRef } from "react";

const Home = () => {
    const ref = useRef(null);

    const handleClick = () => {
        document.querySelector('.aboutUs').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home">
            <section className="landing">
                <div className="landing_introduction">
                    <div className="landing_content">
                        <div className="landing_subtitle">Make caregiving carefree with</div>
                        <div className="landing_title">Carefor<text className="landing_title_we">We</text></div>
                        
                        <div className="landing_text">
                            The Caregiver's Companion: Streamlining your caregiving journey, making every moment carefree.
                        </div>
                        <Link className="earlyAdoptBtn" to='/contact'>
                            <text className='earlyAdoptBtnText'>Create change with us</text>
                        </Link>  
                    </div>
                    <div className="landing_pic">
                        <img src={landing_img} className="landing_img" />
                    </div>
                </div>
            </section>
            <svg id="visual" viewBox="0 500 900 84" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 527L18.8 525.8C37.7 524.7 75.3 522.3 112.8 517C150.3 511.7 187.7 503.3 225.2 508.8C262.7 514.3 300.3 533.7 337.8 533.7C375.3 533.7 412.7 514.3 450.2 507.8C487.7 501.3 525.3 507.7 562.8 521.5C600.3 535.3 637.7 556.7 675.2 560.5C712.7 564.3 750.3 550.7 787.8 541.3C825.3 532 862.7 527 881.3 524.5L900 522L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#C8F9FC" stroke-linecap="round" stroke-linejoin="miter"></path>
            </svg>
            <section className="aboutUs">
                <div className="aboutUs_content">
                    <div className="aboutUs_title">About CareforWe</div>
                    <div className="aboutUs_sec">
                        <img src={support_img} className="aboutUs_sec_img" />
                        <div className="aboutUse_sec_textcontent">
                            <div className="aboutUs_subtitle">
                                Empowering Caregivers with Knowledge and Support
                            </div>
                            <div className="aboutUs_text">
                                At CareForWe, we are deeply committed to transforming the caregiving experience. 
                                Recognizing the challenges and responsibilities that come with caregiving, we've created an innovative platform dedicated to supporting those who care for others.
                            </div>
                        </div>
                    </div>

                    <div className="aboutUs_sec">
                        <img src={learn_img} className="aboutUs_sec_img" />
                        <div className="aboutUse_sec_textcontent">
                            <div className="aboutUs_subtitle">
                                A Wealth of Resources at Your Fingertips
                            </div>
                            <div className="aboutUs_text">
                                CareForWe is rich with educational content covering a wide range of caregiving and health-related topics. 
                                Whether you're new to caregiving or have been in the role for years, our curated content is designed to enhance your knowledge and confidence.
                            </div>
                        </div>
                    </div>

                    <div className="aboutUs_sec">
                        <img src={grow_img} className="aboutUs_sec_img" />
                        <div className="aboutUse_sec_textcontent">
                            <div className="aboutUs_subtitle">
                                Connect, Share, and Grow Together
                            </div>
                            <div className="aboutUs_text">
                                CareForWe fosters a supportive community. Our platform enables caregivers to connect and communicate with each other, share experiences, and offer advice. 
                                Through our chat feature, you can engage in real-time conversations with fellow caregivers, forming a network of support and solidarity.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <svg id="visual-bot" viewBox="0 0 900 150" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 96L21.5 103.5C43 111 86 126 128.8 120.3C171.7 114.7 214.3 88.3 257.2 81.3C300 74.3 343 86.7 385.8 87.3C428.7 88 471.3 77 514.2 89.2C557 101.3 600 136.7 642.8 144.7C685.7 152.7 728.3 133.3 771.2 127.2C814 121 857 128 878.5 131.5L900 135L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z" fill="#C8F9FC" stroke-linecap="round" stroke-linejoin="miter"></path></svg>
            <section className="backedBySec">
                <div className="backedByContent">
                    <div className="backedByText">We are backed by:</div>
                    <img src={nus_img} className="nus_img" />
                </div>
            </section>
        </div>
    );
};

export default Home;
