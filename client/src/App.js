import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage'
import Home from "./components/Home/Home";
import DogDetail from "./components/DogDetail/DogDetail";
import DogCreate from "./components/DogCreate/DogCreate";




function App() {
  let location= useLocation()
  return (
    <div className='App'>
      <div className={location.pathname === "/" && "Landing"}>
        <Routes>
          <Route exact path= "/" element={<LandingPage/>} />
          <Route exact path= "/home" element={<Home/>} />
          <Route exact path= "/detail/:id" element={<DogDetail/>} />
          <Route exact path= "/dog" element={<DogCreate/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
