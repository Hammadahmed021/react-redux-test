// import React, {useState} from "react";
// import API from '../services/API';
// import axios from 'axios';


 
 

//   const getCountry = async () => {
//     const [country, setCountry] = useState([]);
//     try {
//       const {
//         data: { data },
//       } = await axios.get(
//         "https://countriesnow.space/api/v0.1/countries/flag/unicode"
//       );
//       setCountry(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getCity = async (param) => {
//     const [city, setCity] = useState([]);
//     try {
//       setCity([]);

//       const {
//         data: { data },
//       } = await axios.post(
//         "https://countriesnow.space/api/v0.1/countries/cities/",
//         {
//           country: param,
//         }
//       );
//       setCity(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [area, setArea] = useState([]);

//   const getArea = async (param) => {
//     try {
//       console.log(param);

//       const response = await API.get("/city-areas", {
//         params: { city: param },
//       });
//       setArea(response.data.areas);
//       console.log(response);
//       // console.log(area);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const userRegister = async (params) => {
//     try {
   
//       const { data } = await API.post("/user/register", params);
      
//       console.log(data);
      
//       // console.log(area);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  
//   const getUserLatLong = () => {
//     if (navigator.geolocation) {
//       navigator.permissions
//         .query({ name: "geolocation" })
//         .then(function (result) {
//           if (result.state === "prompt") {
//             navigator.geolocation.getCurrentPosition(function (position) {
//               const { latitude, longitude } = position.coords;
//               // setLocation({latitude,longitude})
//               form.setFieldsValue({ latitude, longitude });
//             });
//           } else if (result.state === "granted")
//             navigator.geolocation.getCurrentPosition(function (position) {
//               const { latitude, longitude } = position.coords;
//               // setLocation({latitude,longitude})
//               form.setFieldsValue({ latitude, longitude });
//             });
//           else if (result.state === "denied")
//             alert("please allow your location for registration");

//           result.onchange = function () {
//             if (result.state === "denied") {
//               alert("please allow your location for registration");
//             }
//           };
//         });
//     } else {
//       alert("Sorry Not available!");
//     }
//   };


//   export default {
//     getUserLatLong,
//     userRegister,
//     getArea,
//     getCountry,
//     getCity,
//   }