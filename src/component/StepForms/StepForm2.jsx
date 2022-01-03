// import React, { useEffect, useState } from "react";
// import { Form, Input, Checkbox, Button } from "antd";
// import { useDataRef } from "rjv-react";

// import axios from "axios";
// import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
// import moment from "moment";
// import API from "../../services/API";

// import ReCAPTCHA from "react-google-recaptcha";

// function BackBtn({ onBack }) {
//   const dataRef = useDataRef("/");

//   return <Button onClick={() => onBack(dataRef.value)}>Back</Button>;
// }

// export const StepForm2 = ({ data, onSuccess, onBack, onFinish }) => {
//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-9">
//           <Form onSuccess={onSuccess} data={data} onFinish={onFinish}>
//             <Form.Item
//               name="name"
//               label="Name"
//               // tooltip="What do you want others to call you?"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter your name!",
//                   whitespace: true,
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               name="phone"
//               label="Phone Number"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your phone number!",
//                 },
//               ]}
//             >
//               <Input
//                 // addonBefore={prefixSelector}
//                 style={{
//                   width: "100%",
//                 }}
//               />
//             </Form.Item>

//             <Form.Item
//               name="email"
//               label="E-mail"
//               rules={[
//                 {
//                   type: "email",
//                   message: "The input is not valid E-mail!",
//                 },
//                 {
//                   required: true,
//                   message: "Please input your E-mail!",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your password!",
//                 },
//               ]}
//               hasFeedback
//             >
//               <Input.Password />
//             </Form.Item>

//             <Form.Item
//               name="confirmPas"
//               label="Confirm Password"
//               dependencies={["password"]}
//               hasFeedback
//               rules={[
//                 {
//                   required: true,
//                   message: "Please confirm your password!",
//                 },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue("password") === value) {
//                       return Promise.resolve();
//                     }

//                     return Promise.reject(
//                       new Error(
//                         "The two passwords that you entered do not match!"
//                       )
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password />
//             </Form.Item>

//             {/* <Form.Item>
//               <ReCAPTCHA
//                   sitekey= "6Le70NodAAAAAEN9c6qpqE0gPw6T5-lF4DuCWvbe"
//                   onChange={onChange}
//                 />
//               </Form.Item> */}

//             <Form.Item
//               name="agreement"
//               valuePropName="checked"
//               rules={[
//                 {
//                   validator: (_, value) =>
//                     value
//                       ? Promise.resolve()
//                       : Promise.reject(new Error("Should accept agreement")),
//                 },
//               ]}
//               // {...tailFormItemLayout}
//             >
//               <Checkbox>
//                 I have read the <a href="">agreement</a>
//               </Checkbox>
//             </Form.Item>

//             <Form.Item>
//               <BackBtn onBack={onBack} />
//               &nbsp;
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };
