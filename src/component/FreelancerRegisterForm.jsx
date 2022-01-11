import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Upload,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import API from "../services/API";
import { Route, useNavigate } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 24,
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
      offset: 0,
    },
  },
};
const onChange = (value) => {
  console.log("Captcha value:", value);
};

const FreelancerRegisterForm = () => {
  const [form] = Form.useForm();
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [area, setArea] = useState([]);

  const getCountry = async () => {
    try {
      const {
        data: { countries },
      } = await API.get("/countries");
      setCountry(countries);
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = async (country_id) => {
    try {
      setCity([]);
      const {
        data: { cities },
      } = await API.get(`/cities?country_id=${country_id}`);
      setCity(cities);
    } catch (error) {
      // console.log(error);
    }
  };

  const getArea = async (city_id) => {
    try {
      // console.log(param);
      console.log(city_id, "sds");

      const {
        data: { areas },
      } = await API.get(`/city-areas?city_id=${city_id}`);
      setArea(areas);

      // console.log(area);
    } catch (error) {
      // console.log(error);
    }
  };
  const freelancerRegister = async (params) => {
    try {
      // console.log(params);
      const { data, status } = await API.post("/freelancer/register", params);

      console.log(data, status);

      if (status === 200) {
        notification.success({
          message: "Freelancer Registered",
          description: "Congragulation you have been registered successfully.",
        });
        // window.location.href = 'https://metglam-portal.staginganideos.com/';
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
    const params = {
      image: values?.upload[0]?.originFileObj,
      lat: values.latitude,
      long: values.longitude,
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
        val.forEach((val) => formData.append(`${key}[]`, `${val}`));
      } else formData.append(key, val);
    });
    // console.log(params);

    freelancerRegister(formData).then((res) => form.setFieldsValue([]));
  };

  const normFile = (e) => {
    // console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-md-9">
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            name="register"
            onFinish={onFinish}
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
              name="upload"
              label="Profile Photo"
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
                filterOption={(input, option) =>
                  option.value?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0 ||
                  option.children?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                }
              >
                {country?.map((item, ind) => (
                  <Option key={item._id} value={item._id}>
                    {item.country}
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
                filterOption={(input, option) =>
                  option.value?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0 ||
                  option.children?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                }
              >
                {city?.map((item, ind) => (
                  <Option key={item._id} value={item._id}>
                    {item.city}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="area"
              label="Area"
              rules={[
                {
                  required: true,
                  message: "Please select your area!",
                },
              ]}
            >
              <Select
                showSearch
                disabled={!area.length}
                placeholder="select your area"
                allowClear
                mode="multiple"
                filterOption={(input, option) =>
                  option.value?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0 ||
                  option.children?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                }
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
              <Input disabled />
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
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="captcha"
              rules={[
                {
                  required: true,
                  message: "Should mark captcha!",
                },
              ]}
            >
              <ReCAPTCHA
                sitekey="6Le70NodAAAAAEN9c6qpqE0gPw6T5-lF4DuCWvbe"
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
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FreelancerRegisterForm;
