import "./home.css"
import { Link } from "react-router-dom"
import landing_img from "../../assets/caregiving.png"
import support_img from "../../assets/support.png"
import learn_img from "../../assets/learn.png"
import grow_img from "../../assets/grow.png"
import { useRef } from "react"

const Home = () => {
    const ref = useRef(null);

    const handleClick = () => {
        document.querySelector('.aboutUs').scrollIntoView({behavior: 'smooth'})
    }

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

                        <Link className="homeFindOutMoreBtn" to='/' onClick={handleClick}>
                            <text className='homeFindOutMoreBtnText'>Find Out More</text>
                        </Link>  

                    </div>
                    <div className="landing_pic">
                        <img src={landing_img} className="landing_img" />
                    </div>
                </div>
            </section>
            <div class="wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                </svg>
            </div>
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
                                CareForWe rich with educational content covering a wide range of caregiving and health-related topics. 
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
        </div>
    )
}

export default Home