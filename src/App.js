import './App.css';
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import { Navbar } from './component/Navbar';
import {Home , About , Login , Signup , Dashboard, Service} from './Pages';
import { Logout } from './Pages/Logout';
import API, { setAuthToken } from './services/API';
import React , {useEffect , useState } from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function App() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [loading ,setLoading] = useState(false);
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));

    console.log(token);
    // setAuthToken(token);

    API.interceptors.request.use(
      (config) => {
        setLoading(true)
        console.log(config , 'config');
       
        config.headers.Authorization = `Bearer ${token}`;
        
        return config;
      },
      (error) => {
        setLoading(false)
        console.log(error);
      },
    );

    API.interceptors.response.use(
      (config) => {
        setLoading(false)
    
        return config;
      },
      (err) => {
        setLoading(false)
        console.log(err);
      },
    );
    
  }, [])

  console.log(loading);
 
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
      {
        loading && <div className='spinLoader'><Spin indicator={antIcon} /></div>
      } 
    </>

  
   
  );
}

export default App;
