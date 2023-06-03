import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const DesktopStepper = ({ steps, activeStep }) => {
  return (
    <Stepper orientation="horizontal" activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default DesktopStepper;
