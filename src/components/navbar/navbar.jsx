import { Link, useNavigate } from "react-router-dom"
import logo_nav from "../../assets/cfw_nav.png"
import "./navbar.css"
import { useState } from "react"
import { useAuth } from "../context/authContext"

const Navbar = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("burgerNavMenu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
        // Close mobile menu if open
        if (isMenuClicked) {
            updateBurgerMenu();
        }
    };

    const updateBurgerMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("burgerNavMenu visible")
        } else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("burgerNavMenu hidden")
        }

        setIsMenuClicked(!isMenuClicked)
    }

    return (
        <nav className='navbar'>
            {/* Navbar -  Links to Desktop Nav Bar clicked */}
            <Link to='/'><img className="logo_nav" src={logo_nav} /></Link>
            <div className="allNavbarItems">
                <Link to='/' className="navbarItem">Home</Link>
                <Link to='/contact' className="navbarItem">Contact</Link>
                {user ? (
                    <>
                        <Link to='/videos' className="navbarItem">Videos</Link>
                        <button onClick={handleSignOut} className="navbarItem" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit', color: 'inherit' }}>Sign Out</button>
                    </>
                ) : (
                    <Link to='/signin' className="navbarItem">Sign In</Link>
                )}
            </div>

            {/* Burger Menu -  Mobile Controls the burger icon animation (switches between "unclicked" and "clicked")*/}
            <div className="burger-menu" onClick={updateBurgerMenu}>
                <div className={burger_class} ></div>
                <div className={burger_class} ></div>
                <div className={burger_class} ></div>
            </div>

            {/* <img className="burgerMenuImg" src={burger} alt="Menu" style={{display: showBurgerMenu? 'none' : 'flex'}} onClick={() => setShowBurgerMenu(!showBurgerMenu)}/>
            <img className="burgerCrossImg" src={cross} alt="Menu" style={{display: showBurgerMenu? 'flex' : 'none'}} onClick={() => setShowBurgerMenu(!showBurgerMenu)}/> */}

            {/* Menu -  Mobile Controls menu visibility switch between hidden and visible*/}
            <div className={menu_class}>
                <Link to='/' className="navbarItem" onClick={updateBurgerMenu}>Home</Link>
                <Link to='/contact' className="navbarItem" onClick={updateBurgerMenu}>Contact</Link>
                {user ? (
                    <>
                        <Link to='/videos' className="navbarItem" onClick={updateBurgerMenu}>Videos</Link>
                        <button onClick={() => { handleSignOut(); updateBurgerMenu(); }} className="navbarItem" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit', color: 'inherit', width: '100%', textAlign: 'left', padding: 'inherit' }}>Sign Out</button>
                    </>
                ) : (
                    <Link to='/signin' className="navbarItem" onClick={updateBurgerMenu}>Sign In</Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar