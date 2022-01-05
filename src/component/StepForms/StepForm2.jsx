import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

export const StepForm2 = (props) => {
  const [form] = Form.useForm();

  const validateInput = (values) => {
    props.handleConfirmButton(values);
  };
  const storeValues = () => {
    const values = form.getFieldsValue();
    props.submittedValues(values);
    props.handleBackButton();
  };
  const onChange = (value) => {
    console.log("Captcha value:", value);
  };

  return (
    <div>
          <Form form={form} onFinish={validateInput}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
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
              name="confirmPas  "
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

            <Form.Item>
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
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
              <Button type="default" onClick={storeValues}>
                Back
              </Button>
            </Form.Item>
          </Form>
        </div>
    
  );
};
