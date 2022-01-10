import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
  TimePicker,
  Upload,
  notification,
  Steps,
} from "antd";
import axios from "axios";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import API from "../../services/API";
import { Route, useNavigate } from "react-router";

export const StepForm1 = (props) => {
  console.log(props);
  const [form] = Form.useForm();

  const { Option } = Select;
  const normFile = (e) => {
    // console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);

  const getCountry = async () => {
    try {
      const {
        data: { countries },
      } = await API.get("/countries");
      setCountry(countries);
      console.log(countries);
      console.log(countries, "sdsadsdsasd");
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
      console.log(cities);
      setCity(cities);
    } catch (error) {
      // console.log(error);
    }
  };

  const [area, setArea] = useState([]);

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
    form.setFieldsValue(props.values);
  }, []);
  const validateInput = (values) => {
    // e.preventDefault();
    console.log(values);
    props.submittedValues(values);
    props.handleNextButton();
    // form.validateFields((err, values) => {
    //   if (!err) {
    //   }
    //   console.log(err, values, val);
    // });
  };

  return (
    <div>
      <Form form={form} onFinish={validateInput}>
        <Form.Item
          name="title"
          label="Salon name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="upload"
          label="Logo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload image!" }]}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select
            showSearch
            placeholder="select your country"
            onChange={getCity}
            filterOption={(input, option) =>
              option.value?.toLowerCase().indexOf(input.toLowerCase()) >=
              0 ||
              option.children?.toLowerCase().indexOf(input.toLowerCase()) >=
              0}
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
          rules={[{ required: true, message: "Please select your city!" }]}
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
              0}
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
          rules={[{ required: true, message: "Please select your area!" }]}
        >
          <Select
            showSearch
            disabled={!area.length}
            placeholder="select your area"
            mode="multiple"
            allowClear
            filterOption={(input, option) =>
              option.value?.toLowerCase().indexOf(input.toLowerCase()) >=
              0 ||
              option.children?.toLowerCase().indexOf(input.toLowerCase()) >=
              0}
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
          rules={[{ required: true, message: "0.23290213" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="longitude"
          label="Longitude"
          rules={[{ required: true, message: "0.23290213" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="servicetime"
          label="Service Duration"
          rules={[{ required: true }]}
        >
          <TimePicker.RangePicker />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea showCount maxLength={200} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
