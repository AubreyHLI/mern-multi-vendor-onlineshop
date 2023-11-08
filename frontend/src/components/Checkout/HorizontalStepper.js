import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const stepStyle = {
      
    "& .Mui-active": {
        "&.MuiStepIcon-root": {
            color: "#787aff",
            fontSize: "32px",
        },
        "& .MuiStepConnector-line": {
            borderColor: "rgb(132 204 22)"
        }
    },
    "& .Mui-completed": {
        "&.MuiStepIcon-root": {
            color: "rgb(132 204 22)",
            fontSize: "32px",
        },
        "& .MuiStepConnector-line": {
            borderColor: "rgb(132 204 22)"
        }
    },
    "& .Mui-disabled": {
        "& .Mui-disabled .MuiStepIcon-root": {
            color: "#fff",
            fontSize: "30px",
            border: "1px solid #333333",
            borderRadius: "100px",
            "& .MuiStepIcon-text": {
                fill: "#333333",
                fontSize: '13px',
                fontWeight: '500',
            },
        },
        "& .MuiStepConnector-line": {
            // borderColor: "#5a5a5a"
        }
    },
    "& .MuiStepConnector-root": {
        top: '15px',
    },
    "& .MuiStepLabel-label": {
        fontSize:'12px',
        fontWeight: '400',
        marginTop: '2px',
    }
};

const steps = [
  '确认订单',
  '订单支付',
  '下单成功',
];

const HorizontalStepper = ({activeStep}) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel={false} sx={stepStyle} >
                {steps.map((label) => (
                <Step key={label} >
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default HorizontalStepper;