import React, {useState } from 'react'
import RegistrationForm from '../component/SignupForm';
import API from './../services/API';
import logo from './../assests/logo-dark.png'
import { Footer } from './Footer';
import { MyStepForm } from '../component/MyStepForm';


// export default Signup;



const Signup = () => {
    return (
        <section className='signup'>
        <div className='container'>
        <div className='row'>
            <div className='signup-user signup-saloon'>
              <img src={logo} alt="" />
              <h1>Salon Registration</h1>
            </div>
            {/* <RegistrationForm /> */}
            {<MyStepForm />}
        </div>
        </div>
        <Footer />
        </section>
    )
}
export default Signup;