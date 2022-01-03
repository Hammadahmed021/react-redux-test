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
import { Footer } from './Pages/Footer';
import RegistrationForm from './component/SignupForm';

function App() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [loading ,setLoading] = useState(false);
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));

    console.log(token);
    // setAuthToken(token);
    API.interceptors.request.use(function (config) {
      setLoading(true)
      // Do something before request is sent
      return config;
    }, function (error) {
      setLoading(false)
      // Do something with request error
      return Promise.reject(error);
    });
    
    // Add a response interceptor
    API.interceptors.response.use(function (response) {
      setLoading(false)
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      setLoading(false)
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });
    
    
  }, [])

  console.log(loading);
 
  return (
    
    <>  
      
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/About" element={<About />} />
    
      <Route path="/Dashboard" element={<Dashboard/>} /> */}
     
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/RegistrationForm" element={<RegistrationForm /> } />
      {/* <Route path="/Logout" element={<Logout/>} />    */}
      {/* <Route path="/Service" element={<Service/>} />  */}
      
      </Routes>
      {
        loading && <div className='spinLoader'><Spin indicator={antIcon} /></div>
      } 
   
    </>

  
   
  );
}

export default App;
