import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Learn from "./components/learn/learn";
import Contact from "./components/contact/CONTACT.JSX";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className='Appcontainer'>
        <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path = "/learn" element = {<Learn/>} />
          <Route path = "/contact" element = {<Contact/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
