import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className='Appcontainer'>
        <Routes>
          <Route path = "/" element = {<Home/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
