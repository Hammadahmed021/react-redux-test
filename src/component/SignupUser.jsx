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
    const [country , setCountry] = useState([]);
   

    const getCountry = async () => {
        try {
            const {data : { data } } = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/unicode');
            setCountry(data);
          

        
           
           
        } catch (error) {
        console.log(error);            
        }
    }

    const [city , setCity] = useState([]);

    const getCity = async (param) => {
        try {
          setCity([]);

            const { data : {data}} = await axios.post('https://countriesnow.space/api/v0.1/countries/cities/', {
                country: param
                          });
            setCity(data);
           

            
        } catch (error) {
            console.log(error);
            
        }
    }

    const [area , setArea] = useState([]);

    const getArea = async (param) => {

 
        
        try {
            console.log(param);
            
            const { data : {data} }  = await API.get("/city-areas" ,  {
       
                city: param
                          });
            setArea(data);
            console.log(data);
            // console.log(area);
          } catch (error) {
            console.log(error);
          }
      
          
      
        };
    useEffect(() => {
        getCountry(); 
      
        
       
    }, []); 

  const [form] = Form.useForm();

  

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
//   const suffixSelector = (
//     <Form.Item name="suffix" noStyle>
//       <Select
//         style={{
//           width: 70,
//         }}
//       >
//         <Option value="USD">$</Option>
//         <Option value="CNY">¥</Option>
//       </Select>
//     </Form.Item>
//   );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

//   const onWebsiteChange = (value) => {
//     if (!value) {
//       setAutoCompleteResult([]);
//     } else {
//       setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
//     }
//   };

//   const websiteOptions = autoCompleteResult.map((website) => ({
//     label: website,
//     value: website,
//   }));
  return (
    <div className="container">
        <div className='row p-5'>
            {/* <div className='col-md-4'>

            </div> */}
            <div className='col-md-12'>

    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="upload"
        label="Image"
        valuePropName="fileList"
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
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
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
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
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
            message: 'Please enter your name!',
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
            message: 'Please select your country!',
          },
        ]}
      >
        <Select showSearch placeholder="select your country"  onChange={getCity}>
            {
                country?.map((item , ind) => (
                    <Option  key={ind} value={item.name}>{ item.name}</Option>
                ))
            }
          
         
        </Select>
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        rules={[
          {
            required: true,
            message: 'Please select your city!',
          },
        ]}
      >
        <Select showSearch disabled={!city.length} placeholder="select your city" onChange={getArea}>
        {
                city?.map((item , ind) => (
                    <Option  key={ind} value={item}>{ item }</Option>
                ))
            }
         
        </Select>
      </Form.Item>

      <Form.Item
        name="area"
        label="Area"
        rules={[
          {
            required: true,
            message: 'Please select your area!',
          },
        ]}
      >
        <Select showSearch disabled={!area.length} placeholder="select your area" >
        {
                area?.map((item , ind) => (
                    <Option  key={ind} value={item}>{ item }</Option>
                ))
            }
          
        </Select>
      </Form.Item>

      
    {/* <div className='lat-long-flex'> */}
      <Form.Item
        name="lat"
        label="Latitude"
        // tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: '0.23290213',
            // whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        name="long"
        label="Longitude"
        // tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: '0.23290213',
            // whitespace: true,
          },
        ]}
      >
        <Input />
        {/* <Input style={{ width: 260 }}/> */}
      </Form.Item>
      <Form.Item
        name="service-time"
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
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          // addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      {/* <Form.Item
        name="donation"
        label="Donation"
        rules={[
          {
            required: true,
            message: 'Please input donation amount!',
          },
        ]}
      >
        <InputNumber
          addonAfter={suffixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item> */}

      {/* <Form.Item
        name="website"
        label="Website"
        rules={[
          {
            required: true,
            message: 'Please input website!',
          },
        ]}
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
          <Input />
        </AutoComplete>
      </Form.Item> */}

      <Form.Item
        name="desc"
        label="Description"
        rules={[
          {
            required: true,
            message: 'Please enter description',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={200} />
      </Form.Item>

      {/* <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: 'Please select gender!',
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item> */}

      {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the captcha you got!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item> */}

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
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

export default SignupUser;
