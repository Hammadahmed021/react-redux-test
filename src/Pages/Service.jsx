import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "../services/API";
import { getToken } from "../services/Constant";

const Service = () => {
  const [repo, setRepo] = useState([]);

  const getService = async () => {
    try {
    //   let token = JSON.parse(localStorage.getItem("token"));

    //   setAuthToken(token);
      const {
        data: { services },
      } = await API.get("user/services");
      setRepo(services);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // getToken()
    // .then((obj) => {
    //     console.log('ohj',obj)
    // })
    // .catch((err) => {
    //     console.log('er',err)
    // })
    getService();
  }, []);

  return (
    <div>
      Service
      {/* <button onClick={getService} >View services</button> */}
      <div className="show-service">
        {
                    repo.map( (repos,ind) => (
                        <div key={ind}>
                          
                                <p>{repos.title}</p>
                            
                        </div>
                    ))
                }
      </div>
    </div>
  );
};
export default Service;
