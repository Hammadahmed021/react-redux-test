import React, {useEffect ,useState} from 'react'
import  API from '../services/API';
import { getToken } from '../services/Constant';

 const Service = () => {
    const [repo , setRepo] = useState([])
   
  
    const getService = () => {
        
        let token =   JSON.parse(localStorage.getItem('token'));
        // let user = JSON.parse(localStorage.getItem('token'));
        // const token = user.token;

       API.get('https://beauty-service.staginganideos.com/api/user/services', { 
            headers: {
            "Authorization": `Bearer ${token}`
         } })
        .then((response) => {
            const myRepo = response.data;
            setRepo(myRepo)
              
                  console.log(response );
                  console.log(response.data);
                })
                .catch((err) => {
                  console.log(err.response);
                         
                //   return response.data;
                });
        };
        useEffect(() => {
            getToken()
            .then((obj) => {
                console.log('ohj',obj)
            })
            .catch((err) => {
                console.log('er',err)
            })
            getService();
           
        }, [])
      
    return (
        <div>
            Service
            <button onClick={getService} >View services</button>
            {/* <div className='show-service'>
                {
                    repo.map( repos => (
                        <div key={repos.id}>
                          
                                {repos.title}
                            
                        </div>
                    ))
                }
            </div> */}
        </div>
    )
    
}
export default Service;
