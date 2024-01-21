import { Link } from "react-router-dom"
import logo_nav from "../../assets/cfw_index.png"
import "./navbar.css"

const Navbar = () => {
    return(
        <nav className='navbar'>
            <Link to='/'><img className="logo_nav" src={logo_nav} /></Link>
            
            <div className="allNavbarItems">
                <Link to='/about' className="navbarItem">About</Link>
                <Link to='/learn' className="navbarItem">Learn</Link>
                <Link to='/app' className="navbarItem">App</Link>
                <Link to='/contact' className="navbarItem">Contact</Link>
            </div>

            <div className="profile">
                <Link to='/profile' className="navbarItem">Hello, John!</Link>
            </div>

        </nav>
    )
}

export default Navbar