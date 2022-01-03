import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  TimePicker,
  Upload,
  notification
} from "antd";
import axios from "axios";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import API from "../services/API";
import { Route, useNavigate } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";
// import { Link, Route } from "react-router-dom";
  

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 3,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 21,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 3,
    },
  },
};

const RegistrationForm = () => {
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [form] = Form.useForm();

  const getCountry = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/flag/unicode"
      );
      setCountry(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const getCity = async (param) => {
    try {
      setCity([]);

      const {
        data: { data },
      } = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities/",
        {
          country: param,
        }
      );
      setCity(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const [area, setArea] = useState([]);

  const getArea = async (param) => {
    try {
      // console.log(param);

      const response = await API.get("/city-areas", {
        params: { city: param },
      });
      setArea(response.data.areas);
      // console.log(response);
      // console.log(area);
    } catch (error) {
      // console.log(error);
    }
  };
 
  const navigate = useNavigate();
  const saloonRegister = async (params) => {
   
    
    try {

      
      // console.log(params);
      const { data, status } = await API.post("/salon/register", params);{
        console.log(data);
       
     if( status === 200){      
      notification.success({
        message: 'Salon Registered',
        description:
          'Congragulation your salon has been registered successfully.',
      })
      window.location.href = 'https://metglam-portal.staginganideos.com/';
          
    }  
    
     }
      
   
    } catch (error) {      
      notification.error({
        message: "Alert",
        description: error?.response?.data?.message || "unknown error",
      });
      
     
    }
  };

  

  const getUserLatLong = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(function (position) {
              const { latitude, longitude } = position.coords;
              // setLocation({latitude,longitude})
              form.setFieldsValue({ latitude, longitude });
            });
          } else if (result.state === "granted")
            navigator.geolocation.getCurrentPosition(function (position) {
              const { latitude, longitude } = position.coords;
              // setLocation({latitude,longitude})
              form.setFieldsValue({ latitude, longitude });
            });
          else if (result.state === "denied")
            alert("please allow your location for registration");

          result.onchange = function () {
            if (result.state === "denied") {
              alert("please allow your location for registration");
            }
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  };
  useEffect(() => {
    getCountry();
    getUserLatLong();
  }, []);

  const onFinish = (values) => {
  
  
    // console.log("Received values of form: ", values);
    const timeTo = moment(values.servicetime[0]._d).format(" h:mm:ss a");
    const timeFrom = moment(values.servicetime[1]._d).format(" h:mm:ss a");
    const params = {
      title: values.title,
      description: values.description,
      image: values?.upload[0]?.originFileObj,
      lat: values.latitude,
      long: values.longitude,
      from: timeFrom,
      to: timeTo,
      name: values.name,
      email: values.email,
      password: values.password,
      confirm_password: values.confirmPas,
      city: values.city,
      country: values.country,
      phone: values.phone,
      area: values?.area,
      
      
    };
    const formData = new FormData();
    
    Object.entries(params).forEach(([key, val]) => {
      if (key == "area") {
        formData.append(`${key}[]`, `[${val}]`);
      } else formData.append(key, val);
    });
    // console.log(params);

    
  };
  

  const normFile = (e) => {
    // console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
 const onChange = (value) => {
    console.log("Captcha value:", value);
  }

  return (
    <div className="container">
      <div className="row justify-content-center p-5">
        <div className="col-md-10">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="title"
              label="Salon's name"
              // tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please enter your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="upload"
              label="Logo"
              valuePropName="fileList"
              rules={[
                {
                  required: true,
                  message: "Please upload image!",
                  
                },
              ]}
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPas"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="name"
              label="Name"
              // tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please enter your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
           
              
              rules={[
                {
                  required: true,
                  message: "Please select your country!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="select your country"
               
                onChange={getCity}
              >
                {country?.map((item, ind) => (
                  <Option key={ind} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
          
              rules={[
                {
                  required: true,
                  message: "Please select your city!",
                },
              ]}
            >
              <Select
                showSearch
                disabled={!city.length}
                placeholder="select your city"
                onChange={getArea}
              >
                {city?.map((item, ind) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="area"
              label="Area"
              rules={[
                {
                  required: false,
                  message: "Please select your area!",
                },
              ]}
            >
              <Select
                showSearch
                disabled={!area.length}
                placeholder="select your area"
                mode="multiple"
                allowClear
              >
                {area?.map((item, ind) => (
                  <Option key={item._id} value={item._id}>
                    {item.area}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="latitude"
              label="Latitude"
              rules={[
                {
                  required: true,
                  message: "0.23290213",
                  // whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="longitude"
              label="Longitude"
              rules={[
                {
                  required: true,
                  message: "0.23290213",
                  // whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="servicetime"
              label="Service Duration"
              // tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  // message: '0.23290213',
                  // whitespace: true,
                },
              ]}
            >
              <TimePicker.RangePicker />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                // addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter description",
                },
              ]}
            >
              <Input.TextArea showCount maxLength={200} />
            </Form.Item>

            {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button>Get captcha</Button>
                </Col>
              </Row>
            </Form.Item> */}

            <Form.Item>
            <ReCAPTCHA
                sitekey= "6Le70NodAAAAAEN9c6qpqE0gPw6T5-lF4DuCWvbe"
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
