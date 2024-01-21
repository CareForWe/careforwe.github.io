import "./home.css"
import { Link } from "react-router-dom"
import landing_img from "../../assets/caregiving.png"

const Home = () => {
    return (
        <div className="home">
            <div className="landing">
                <div className="landing_introduction">
                    <div className="landing_content">
                        <div className="landing_subtitle">Make caregiving carefree with</div>
                        <div className="landing_title">Carefor<text className="landing_title_we">We</text></div>
                        
                        <div className="landing_text">
                            The Caregiver's Companion: Streamlining your caregiving journey, making every moment carefree.
                        </div>

                        <Link className="homeFindOutMoreBtn" to='/about'>
                            <text className='homeFindOutMoreBtnText'>Find Out More</text>
                        </Link>  

                    </div>
                    <div className="landing_pic">
                        <img src={landing_img} className="landing_img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home