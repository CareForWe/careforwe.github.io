import { Link } from "react-router-dom"
import logo_nav from "../../assets/cfw_nav.png"
import "./navbar.css"
import { useState } from "react"

const Navbar = () => {
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("burgerNavMenu hidden");
    const [isMenuClicked, setIsMenuClicked]= useState(false);

    const updateBurgerMenu = ()=> {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("burgerNavMenu visible")
        } else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("burgerNavMenu hidden")
        }
        
        setIsMenuClicked(!isMenuClicked)
    }

    return(
        <nav className='navbar'>
            <Link to='/'><img className="logo_nav" src={logo_nav} /></Link>
            <div className="allNavbarItems">
                <Link to='/' className="navbarItem">Home</Link>
                <Link to='/learn' className="navbarItem">Learn</Link>
                <Link to='/contact' className="navbarItem">Contact</Link>
                <Link to='/signin' className="navbarItem">Sign In</Link>
            </div>

            <div className="burger-menu" onClick={updateBurgerMenu}>
                <div className={burger_class} ></div>
                <div className={burger_class} ></div>
                <div className={burger_class} ></div>
            </div>

            {/* <img className="burgerMenuImg" src={burger} alt="Menu" style={{display: showBurgerMenu? 'none' : 'flex'}} onClick={() => setShowBurgerMenu(!showBurgerMenu)}/>
            <img className="burgerCrossImg" src={cross} alt="Menu" style={{display: showBurgerMenu? 'flex' : 'none'}} onClick={() => setShowBurgerMenu(!showBurgerMenu)}/> */}

            <div className={menu_class}>
                <Link to='/' className="navbarItem"  onClick={updateBurgerMenu}>Home</Link>
                <Link to='/learn' className="navbarItem" onClick={updateBurgerMenu}>Learn</Link>
                <Link to='/contact' className="navbarItem" onClick={updateBurgerMenu}>Contact</Link>
                <Link to='/signin' className="navbarItem" onClick={updateBurgerMenu}>Sign In</Link>
            </div>
        </nav>
    )
}

export default Navbar