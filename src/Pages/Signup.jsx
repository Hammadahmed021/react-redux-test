import React, {useState } from 'react'
import API from './../services/API';

const Signup = () => {
    const [name , setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [address, setAddress] = useState("");

    const [lat, setLat] = useState(0);

    const [long, setLong] = useState(0);

    const SignupUser = () => {
        console.log(name , email , password, address , lat ,long);
        const params = {name , email , password , address , lat , long};
        console.log(params)

        API.post('user/register' , params).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err.response);
        })
    };

    return (
        <div>
             <form action="">
                                <input type="name" placeholder="your name" value={name} onChange={({target}) => setName(target.value)} /><br />
                                <input type="email" placeholder="your email" value={email} onChange={({target}) => setEmail(target.value)} /><br />
                                <input type="password" placeholder="your password" value={password} onChange={({target}) => setPassword(target.value)} /><br />
                                <input type="text" placeholder="your address" value={address} onChange={({target}) => setAddress(target.value)} /><br />
                                <input type="number" placeholder="Latitude" value={lat} onChange={({target}) => setLat(target.value)} /><br />
                                <input type="number" placeholder="Longitude" value={long} onChange={({target}) => setLong(target.value)} /><br />
                                <input type="button" value="Signup" onClick={SignupUser}/>
                            </form>
        </div>
    )
}
export default Signup;