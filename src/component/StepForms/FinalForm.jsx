import React, { Component } from "react";
import { StepForm1 } from "./StepForm1";
import { StepForm2 } from "./StepForm2";
import moment from "moment";
import API from "../../services/API";

import { Form , notification } from "antd";

class FinalForm extends Component {
  state = { stepOne: {}, stepTwo: {}, step: 1, finalValues: {} };

  handleNextButton = () =>
    this.setState((prevState) => ({ step: prevState.step + 1 }));

  handleBackButton = () =>
    this.setState((prevState) => ({ step: prevState.step - 1 }));

  handleConfirmButton = (values) =>
    this.setState(
      (prevState) => ({
        finalValues: {
          ...prevState.stepOne,
          ...prevState.stepTwo,
          ...values,
        },
      }),
      () => this.onFinish(this.state.finalValues)
    );

  saloonRegister = async (params) => {
    try {
      // console.log(params);
      const { data, status } = await API.post("/salon/register", params);
      {
        console.log(data);

        if (status === 200) {
          notification.success({
            message: "Salon Registered",
            description:
              "Congragulation your salon has been registered successfully.",
          });
          window.location.href = "https://metglam-portal.staginganideos.com/";
        }
      }
    } catch (error) {
      notification.error({
        message: "Alert",
        description: error?.response?.data?.message || "unknown error",
      });
    }
  };

  onFinish = (values) => {
    console.log("Received values of form: ", values);
    const timeTo = moment(values.servicetime[0]._d).format(" h:mm:ss a");
    const timeFrom = moment(values.servicetime[1]._d).format(" h:mm:ss a");

    const params = {
    //   type: values.type,
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
        val.forEach((val)=>formData.append(`${key}[]`, `${val}`))
      } else formData.append(key, val);
    });
    // console.log(params);

    this.saloonRegister(formData).then((res) => Form.setFieldsValue([]));
  };

  getFinalStepValue = (values) => {
    this.setState((prevState) => ({
      finalValues: {
        ...prevState.stepOne,
        ...prevState.stepTwo,
        ...values,
      },
      stepOne: prevState.stepOne,
    }));
  };

  getStepOneValue = (values) =>
    this.setState({ stepOne: values }, () => console.log(this.state));

  render() {
    const { step, stepOne } = this.state;
    if (step === 1) {
      return (
        <div className="container">
      <div className="row justify-content-center">
        <div className="col-9">
          {/* {<h2 className="heading-form-step"> Salon Info </h2>} */}
          <StepForm1
            values={stepOne}
            handleNextButton={this.handleNextButton}
            submittedValues={this.getStepOneValue}
          />
        </div>
        </div>
        </div>
      );
    } else {
      return (
        <div className="container">
      <div className="row justify-content-center">
        <div className="col-9">
          {/* {<h2 className="heading-form-step"> Salon Info </h2>} */}
          <StepForm2
            handleConfirmButton={this.handleConfirmButton}
            handleBackButton={this.handleBackButton}
            submittedValues={this.getFinalStepValue}
          />
        </div>
        </div>
        </div>
      );
    }
  }
}

export default FinalForm;
