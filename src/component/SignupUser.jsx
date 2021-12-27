import React, { useEffect, useState } from 'react'
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
    Upload
  } from 'antd';
  import axios from 'axios';
  import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
  import API from '../services/API';


  const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 16,
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
      offset: 4,
    },
  },
};

const SignupUser = () => {
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
      console.log(error);
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
      console.log(error);
    }
  };

  const [area, setArea] = useState([]);

  const getArea = async (param) => {
    try {
      console.log(param);

      const response = await API.get("/city-areas", {
        params: { city: param },
      });
      setArea(response.data.areas);
      console.log(response);
      // console.log(area);
    } catch (error) {
      console.log(error);
    }
  };

  const userRegister = async (params) => {
    try {
   
      const { data } = await API.post("/user/register", params);
      
      console.log(data);
      
      // console.log(area);
    } catch (error) {
      console.log(error);
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
    console.log("Received values of form: ", values);
 
    const params = {
      name: values.name,
      lat: String(values.latitude),
      long: String(values.longitude),     
      email: values.email,
      password: values.password,
      address: values.address,
      city: values.city,
      country: values.country,
      // phone: values.phone,
      area: values?.area,
    };
    // const formData = new FormData();
    // Object.entries(params).forEach(([key, val]) => {
    //   console.log(key , val);
    //   if (key == "area") {
    //     formData.append(`${key}[]`, `[${val}]`);
    //   } else formData.append(key, val);
    // });
    // console.log(params);
    // console.log(formData);
    userRegister(params).then(res=>form.setFieldsValue([]),  form.resetFields());
  };

 

  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-md-12">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            // initialValues={{
            //   residence: ["zhejiang", "hangzhou", "xihu"],
            //   prefix: "86",
            // }}
            scrollToFirstError
          >
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
              name="address"
              label="Address"
              // tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please enter your address",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item
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
            </Form.Item> */}

     

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
                // mode="multiple"
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
           
            {/* <Form.Item
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
            </Form.Item> */}

            

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

export default SignupUser;
