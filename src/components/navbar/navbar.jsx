import { Link } from "react-router-dom"
import logo_nav from "../../assets/cfw_nav.png"
import "./navbar.css"

const Navbar = () => {
    return(
        <nav className='navbar'>

            <Link to='/'><img className="logo_nav" src={logo_nav} /></Link>
            <div className="allNavbarItems">
                <Link to='/' className="navbarItem">Home</Link>
                <Link to='/learn' className="navbarItem">Learn</Link>
                <Link to='/contact' className="navbarItem">Contact</Link>
            </div>

        </nav>
    )
}

export default Navbar