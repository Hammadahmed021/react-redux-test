import React, {useState} from 'react'
import API from '../services/API';
import { baseUrl } from '../services/BaseUrl';
import { _login } from '../store/actions/loginaction'
import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Ajux_loader from './../assests/Ajux_loader.gif';
import SignupUser from '../component/SignupUser';



const Login = (props) => {
    const navigate = useNavigate()
    console.log('props',props);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  const LoginUser = () => {
     
    console.log(email, password);
    const params = { email, password };
    

    const obj = {
        email: email,
        password: password
        // email: 'zavierblade@mailinator.com',
        // password: 'password'  
    }
   props.is_login(obj)
   if(props.isLoggedIn.isLoggedIn !== null  ){
        navigate('/')
   }
    // API.post(baseUrl+'user/login',obj)
    // .then((obj) => {
    //     console.log('obj',obj)
    //     localStorage.setItem('token', JSON.stringify(obj.data.token))
    // })
    // .catch((err) => {
    //     console.log('err',err)
    // })
  };
    return (
      <>
        <div>
            <form action="" >
                <input
                  type="email"
                  placeholder="type email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)} />
                <br /> <br />
                <input
                  type="password"
                  placeholder="type password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                <br /> <br />
               
                
                <input type="button" value="Submit" onClick={LoginUser} />
               
              </form>
            
        </div>
        <div className='container'>
          <div className='row'>
            <SignupUser />
          </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
            isLoggedIn: state
            
           
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        is_login: (obj) => {
            dispatch(_login(obj))
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
// export default Login;