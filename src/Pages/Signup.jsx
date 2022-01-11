import React, { useState } from "react";
import API from "./../services/API";
import logo from "./../assests/logo-dark.png";
import { Footer } from "./Footer";
// import { MyStepForm } from '../component/MyStepForm';
import FinalForm from "../component/StepForms/FinalForm";
import { Tabs } from "antd";
import FreelancerRegisterForm from "../component/FreelancerRegisterForm";

// export default Signup;

const { TabPane } = Tabs;

const Signup = () => {
  return (
    <section className="signup">
      <div className="container">
        <div className="row">
          <div className="signup-user signup-saloon">
            <img src={logo} alt="" />
            <h1>Service Provider Registration</h1>
          </div>
        
         
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Signup as Salon" key="1">
            {<FinalForm />}
            </TabPane>
            <TabPane tab="Signup as Freelancer" key="2">
              {<FreelancerRegisterForm />}
            </TabPane>
          
          </Tabs>
        </div>
      </div>
      <Footer />
    </section>
  );
};
export default Signup;
