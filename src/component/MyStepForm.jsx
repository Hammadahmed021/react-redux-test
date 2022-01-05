// import React, { useEffect, useState, useCallback } from "react";
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
//   notification,
//   Steps,
//   message,
//   PageHeader,
//   Radio,
// } from "antd";
// import StepPanel from "./StepPanel";
// import axios from "axios";
// import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
// import moment from "moment";
// import API from "../services/API";
// import { Route, useNavigate } from "react-router";
// import ReCAPTCHA from "react-google-recaptcha";
// import { StepForm1 } from "./StepForms/StepForm1";
// import { StepForm2 } from "./StepForms/StepForm2";

// const { Option } = Select;

// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 12,
//     },
//     sm: {
//       span: 24,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 12,
//     },
//     sm: {
//       span: 24,
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
//       offset: 0,
//     },
//   },
// };

// function MyStepForm() {
//   const [orm] = Form.useForm();
  

//   const navigate = useNavigate();
//   const saloonRegister = async (params) => {
//     try {
//       // console.log(params);
//       const { data, status } = await API.post("/salon/register", params);
//       {
//         console.log(data);

//         if (status === 200) {
//           notification.success({
//             message: "Salon Registered",
//             description:
//               "Congragulation your salon has been registered successfully.",
//           });
//           window.location.href = "https://metglam-portal.staginganideos.com/";
//         }
//       }
//     } catch (error) {
//       notification.error({
//         message: "Alert",
//         description: error?.response?.data?.message || "unknown error",
//       });
//     }
//   };

  

//   useEffect(() => {
    
//     getUserLatLong();
//   }, []);

//   // const normFile = (e) => {
//   //   // console.log("Upload event:", e);

//   //   if (Array.isArray(e)) {
//   //     return e;
//   //   }

//   //   return e && e.fileList;
//   // };
 

 

 

//   const onFinish = (values) => {
//     console.log("Received values of form: ", values);
//     const timeTo = moment(values.servicetime[0]._d).format(" h:mm:ss a");
//     const timeFrom = moment(values.servicetime[1]._d).format(" h:mm:ss a");

//     const params = {
//       type: values.type,
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

//     saloonRegister(formData).then((res) => stepForm.setFieldsValue([]));
//   };

//   // const steps = [
//   //   {
//   //     step: 1,
//   //     title: "Service Info",
//   //     content: <Step1Form />,
//   //   },

//   //   {
//   //     step: 2,
//   //     title: "User Info",
//   //     content: <Step2Form />,
//   //   },
//   // ];
//   const [data, setData] = useState({});
//   const [step, setStep] = useState(1);

//   const handleNextStep = 
//     (data) => {
//       console.log(data);
//       setData(data);
//       setStep(step + 1);
//     }


//   const handlePrevStep = useCallback(
//     (data) => {
//       setData(data);
//       setStep(step - 1);
//     },
//     [step]
//   );

//   return (
//     // <PageHeader title="Step Form" subTitle="Multi-Step form">
//     // <PageHeader>
//     //   <Form
//     //     {...formItemLayout}
//     //     form={stepForm}
//     //     layout="vertical"
//     //     name="register"
//     //     onFinish={onFinish}
//     //     scrollToFirstError
//     //   >
//     //     <StepPanel {...{ steps, stepForm }} />
//     //   </Form>
//     // </PageHeader>
//     <div className="App">
//       <h2>Step {step} of 2</h2>
//       {step === 1 && <StepForm1 data={data} onSuccess={handleNextStep} />}

//       {step === 2 && (
//         <StepForm2
//           data={data}
//           onSuccess={onFinish}
//           onBack={handlePrevStep}
//         />
//       )}
//     </div>
//   );
// }
// export { MyStepForm };
