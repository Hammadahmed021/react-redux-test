import React, { useState, useEffect } from "react";
import { Button, Steps } from "antd";

const StepPanel = ({ steps, stepForm }) => {
  const [activeStep, setActiveStep] = useState(0);
  const next = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const prev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    stepForm
      .validateFields()
      .then(() => {
        next()
        // do whatever you need to
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeStep]);

  return (
    <>
      <Steps
        current={activeStep}
        style={{ width: 400, margin: `0 auto`, paddingBottom: 30 }}
      >
        {steps?.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {steps?.map((item) => (
        <div
          className={`steps-content ${
            item.step !== activeStep + 1 && "hidden"
          }`}
        >
          {item.content}
        </div>
      ))}
      <div className="steps-action">
        {activeStep < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {activeStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Previous
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </div>
    </>
  );
};

export default StepPanel;
