// import React, { useEffect, useState } from "react";
// import {
//   Form,
//   Input,
//   Select,
//   Button,
//   AutoComplete,
//   TimePicker,
//   Upload,
//   notification,
//   Steps,
// } from "antd";
// import axios from "axios";
// import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
// import moment from "moment";
// import API from "../../services/API";
// import { Route, useNavigate } from "react-router";

// const normFile = (e) => {
//   // console.log("Upload event:", e);

//   if (Array.isArray(e)) {
//     return e;
//   }

//   return e && e.fileList;
// };
// const onChange = (value) => {
//   console.log("Captcha value:", value);
// };
// export const StepForm1 = ({ onSuccess, data }) => {
//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-9">
//           <Form onSuccess={onSuccess} data={data} autoComplete="off">
//             <Form.Item
//               name="title"
//               label="Salon's name"
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
//               name="upload"
//               label="Logo"
//               valuePropName="fileList"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please upload image!",
//                 },
//               ]}
//               getValueFromEvent={normFile}
//             >
//               <Upload name="logo" action="/upload.do" listType="picture">
//                 <Button icon={<UploadOutlined />}>Click to upload</Button>
//               </Upload>
//             </Form.Item>
//             <Form.Item
//               name="country"
//               label="Country"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please select your country!",
//                 },
//               ]}
//             >
//               <Select
//                 showSearch
//                 placeholder="select your country"
//                 onChange={getCity}
//               >
//                 {country?.map((item, ind) => (
//                   <Option key={ind} value={item.name}>
//                     {item.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="city"
//               label="City"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please select your city!",
//                 },
//               ]}
//             >
//               <Select
//                 showSearch
//                 disabled={!city.length}
//                 placeholder="select your city"
//                 onChange={getArea}
//               >
//                 {city?.map((item, ind) => (
//                   <Option key={item} value={item}>
//                     {item}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="area"
//               label="Area"
//               rules={[
//                 {
//                   required: false,
//                   message: "Please select your area!",
//                 },
//               ]}
//             >
//               <Select
//                 showSearch
//                 disabled={!area.length}
//                 placeholder="select your area"
//                 mode="multiple"
//                 allowClear
//               >
//                 {area?.map((item, ind) => (
//                   <Option key={item._id} value={item._id}>
//                     {item.area}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="latitude"
//               label="Latitude"
//               rules={[
//                 {
//                   required: true,
//                   //   message:'Only numbers can be entered',

//                   message: "0.23290213",
//                   // whitespace: true,
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               name="longitude"
//               label="Longitude"
//               rules={[
//                 {
//                   required: true,

//                   //   message:'Only numbers can be entered',

//                   message: "0.23290213",
//                   // whitespace: true,
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="servicetime"
//               label="Service Duration"
//               // tooltip="What do you want others to call you?"
//               rules={[
//                 {
//                   required: true,
//                   // message: '0.23290213',
//                   // whitespace: true,
//                 },
//               ]}
//             >
//               <TimePicker.RangePicker />
//             </Form.Item>
//             <Form.Item
//               name="description"
//               label="Description"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter description",
//                 },
//               ]}
//             >
//               <Input.TextArea showCount maxLength={200} />
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Next
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };
