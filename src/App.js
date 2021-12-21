import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from './component/Navbar';
import {Home , About , Login , Signup , Dashboard, Service} from './Pages';
import { Logout } from './Pages/Logout';

function App() {
 
  return (
    
    <>  
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Logout" element={<Logout/>} />   
      <Route path="/Service" element={<Service/>} />   
      </Routes>
    </>

  
   
  );
}

export default App;
