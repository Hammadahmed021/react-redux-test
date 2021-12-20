import React, { useEffect } from 'react'
import { getToken } from '../services/Constant';

 const Dashboard = () => {

    useEffect(() => {
        getToken()
        .then((obj) => {
            console.log('ohj',obj)
        })
        .catch((err) => {
            console.log('er',err)
        })
    }, [])

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard;
