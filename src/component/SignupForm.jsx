// import React, { useEffect, useState } from "react";
// import {
//   Form,
//   Input,
//   InputNumber,
//   Cascader,
//   Select,
//   Row,
//   Col,
//   Checkbox,
//   Button,
//   AutoComplete,
//   TimePicker,
//   Upload,
//   notification
// } from "antd";
// import axios from "axios";
// import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
// import moment from "moment";
// import API from "../services/API";
// import { Route, useNavigate } from "react-router";
// import ReCAPTCHA from "react-google-recaptcha";
// // import { Link, Route } from "react-router-dom";
  

// const { Option } = Select;

// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 12,
//     },
//     sm: {
//       span: 3,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 12,
//     },
//     sm: {
//       span: 21,
//     },
//   },
// };
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 24,
//       offset: 3,
//     },
//   },
// };

// const RegistrationForm = () => {
//   const [country, setCountry] = useState([]);
//   const [city, setCity] = useState([]);
//   const [form] = Form.useForm();

//   const getCountry = async () => {
//     try {
//       const {
//         data: { data },
//       } = await axios.get(
//         "https://countriesnow.space/api/v0.1/countries/flag/unicode"
//       );
//       setCountry(data);
//     } catch (error) {
//       // console.log(error);
//     }
//   };

//   const getCity = async (param) => {
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
//       // console.log(error);
//     }
//   };

//   const [area, setArea] = useState([]);

//   const getArea = async (param) => {
//     try {
//       // console.log(param);

//       const response = await API.get("/city-areas", {
//         params: { city: param },
//       });
//       setArea(response.data.areas);
//       // console.log(response);
//       // console.log(area);
//     } catch (error) {
//       // console.log(error);
//     }
//   };
 
//   const navigate = useNavigate();
//   const saloonRegister = async (params) => {
   
    
//     try {

      
//       // console.log(params);
//       const { data, status } = await API.post("/salon/register", params);{
//         console.log(data);
       
//      if( status === 200){      
//       notification.success({
//         message: 'Salon Registered',
//         description:
//           'Congragulation your salon has been registered successfully.',
//       })
//       window.location.href = 'https://metglam-portal.staginganideos.com/';
          
//     }  
    
//      }
      
   
//     } catch (error) {      
//       notification.error({
//         message: "Alert",
//         description: error?.response?.data?.message || "unknown error",
//       });
      
     
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
//   useEffect(() => {
//     getCountry();
//     getUserLatLong();
//   }, []);

//   const onFinish = (values) => {
  
  
//     // console.log("Received values of form: ", values);
//     const timeTo = moment(values.servicetime[0]._d).format(" h:mm:ss a");
//     const timeFrom = moment(values.servicetime[1]._d).format(" h:mm:ss a");
//     const params = {
//       title: values.title,
//       description: values.description,
//       image: values?.upload[0]?.originFileObj,
//       lat: values.latitude,
//       long: values.longitude,
//       from: timeFrom,
//       to: timeTo,
//       name: values.name,
//       email: values.email,
//       password: values.password,
//       confirm_password: values.confirmPas,
//       city: values.city,
//       country: values.country,
//       phone: values.phone,
//       area: values?.area,
      
      
//     };
//     const formData = new FormData();
    
//     Object.entries(params).forEach(([key, val]) => {
//       if (key == "area") {
//         formData.append(`${key}[]`, `[${val}]`);
//       } else formData.append(key, val);
//     });
//     // console.log(params);

    
//   };
  

//   const normFile = (e) => {
//     // console.log("Upload event:", e);

//     if (Array.isArray(e)) {
//       return e;
//     }

//     return e && e.fileList;
//   };
//  const onChange = (value) => {
//     console.log("Captcha value:", value);
//   }

//   return (
//     <div className="container">
//       <div className="row justify-content-center p-5">
//         <div className="col-md-10">
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;
