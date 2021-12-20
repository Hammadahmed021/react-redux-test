import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getToken } from '../services/Constant';



const Menu = () =>{

    return(
    <>
    <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/About">About</Link></li>
    <li><Link to="/Login">Login</Link></li>
    <li><Link to="/Signup">Signup</Link></li>
    {/* <li><Link to="/Dashboard">Dashboard</Link></li> */}
    
    
    </ul>
    </>
    )
}

const Menu2 = () =>{

    return(
    <>
    <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/About">About</Link></li>
    
    
    <li><Link to="/Dashboard">Dashboard</Link></li>
    <li><Link to="/Logout">Logout</Link></li>
    
    
    </ul>
    </>
    )
}

export const Navbar = () => {

    const [menuShow, setMenuShow] = useState(false)

    useEffect(() => {
        getToken()
        .then((obj) => {
            console.log('ohj',obj)
            if (obj.token !== null) {
                setMenuShow(true)
                console.log('true' , true);
            }
            else {
                setMenuShow(false)
                console.log(setMenuShow);
            }
        })
        .catch((err) => {
            console.log('er',err)
        })
    }, [])
    return (
       
       <div className="gpt3__navbar">
           <div className="gpt3__navbar__links">
               <div className="gpt3__navbar__links__logo">
                   <img src="" alt="Logo" />
               </div>
               <div className="gpt3__navbar__links_container">
                   {
                       menuShow ? 
                        <Menu2 />  : 
                       <Menu />
                   }
                
               </div>
           </div>

    </div>
            
        
    )
}
