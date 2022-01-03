import React from 'react'
import { Link } from 'react-router-dom';
import { Login, Signup } from '../Pages';
import logo from './../assests/logo-dark.png'

const Main = () => {
    return (
        <section className='Main-section'>
        <div className='container'>
            <div className='row'>
                <div className=' main-landing'>
                    <div className='landing-sub'>
                <img src={logo} alt="" />
                <h1>Welcome to Metglam</h1>
                <div className='btn-together'>
                    <Link to="/Login">Signup as User</Link>
                    
                    <Link to="/Signup">Signup as Salon</Link>
                    </div>
                    </div>
                </div>
            </div>
            
        </div>
        </section>
    )
}
export default Main;