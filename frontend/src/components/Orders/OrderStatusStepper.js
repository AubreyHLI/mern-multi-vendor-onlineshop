import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const stepStyle = {
    display: 'flex', 
    alignItems:'center',
    "& .Mui-active": {
        "&.MuiStepIcon-root": {
            color: '#fff',
            border: "2px solid rgb(132 204 22)",
            borderRadius: '100%',
            fontSize: "40px",
            "& .MuiStepIcon-text": {
                fill: "rgb(132 204 22)",
            },
        },
        "& .MuiStepConnector-line": {
            borderColor: "rgb(132 204 22)"
        },
        "&.MuiStepLabel-label": {
            fontSize: "16px",
            color: "rgb(132 204 22)",
        }
    },
    "& .Mui-completed": {
        "&.MuiStepIcon-root": {
            color: "rgb(132 204 22)",
            fontSize: "40px",
        },
        "& .MuiStepConnector-line": {
            borderColor: "rgb(132 204 22)"
        },
        "& .MuiStepLabel-label": {
            color: '#555555'
        }
    },
    "& .Mui-disabled": {
        "& .Mui-disabled .MuiStepIcon-root": {
            color: "#fff",
            fontSize: "32px",
            border: "1px solid #c1c1c1",
            borderRadius: "100px",
            "& .MuiStepIcon-text": {
                fill: "#c1c1c1",
            },
        },
        "&.MuiStepConnector-root": {
            top: '12px',
        },
    },
    "& .MuiStepConnector-root": {
        top: '20px',
    },
    "& .MuiStepLabel-label": {
        color: '#c1c1c1'
    }
};

const mobileStepStyle = {
    "& .Mui-active": {
        "&.MuiStepIcon-root": {
            color: '#fff',
            border: "1.5px solid rgb(132 204 22)",
            borderRadius: '100%',
            "& .MuiStepIcon-text": {
                fill: "rgb(132 204 22)",
                fontSize: '14px',
                fontWight: '500'
            },
        },
        "& .MuiStepConnector-line": {
            borderColor: "rgb(132 204 22)"
        },
        "&.MuiStepLabel-label": {
            color: "rgb(132 204 22)",
            fontSize: '14px'
        },
    },
    "& .Mui-completed": {
        "&.MuiStepIcon-root": {
            color: "rgb(132 204 22)",
        },
        "& .MuiStepConnector-line": {
            borderColor: "rgb(132 204 22)"
        },
        "& .MuiStepLabel-label": {
            color: '#555555'
        }
    },
    "& .Mui-disabled": {
        "& .Mui-disabled .MuiStepIcon-root": {
            color: "#fff",
            border: "1px solid #c1c1c1",
            borderRadius: "100px",
            "& .MuiStepIcon-text": {
                fill: "#c1c1c1",
            },
        },
    },
    "& .MuiStepLabel-label": {
        fontSize: '13px',
        color: '#c1c1c1',
        marginTop: '10px'
    }
};


const steps = [
    { key: "Processing",  value: "订单待发货" },
    { key: "Shipped",  value: "已发货" },
    { key: "Shipping",  value: "快递运输中" },
    { key: "Dispatching",  value: "派送中" },
    { key: "Delivered",  value: "买家已签收" },
];

const OrderStatusStepper = ({status}) => {
    const [activeStep, setAvctiveStep] = useState(0);

    useEffect(() => {
        let index = steps.findIndex(item => item.key === status);
        setAvctiveStep(index);
    }, [status])
   
    return (
    <>
        <div className='hidden 800px:block'>
            <Box sx={{ width: '100%', paddingY: '28px' }} >
                <Stepper activeStep={activeStep} alternativeLabel={true} sx={stepStyle} >
                    {steps.map(({key, value}) => (
                    <Step key={key} >
                        <StepLabel>{value}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>
        </div>
        <div className='800px:hidden'>
            <Box sx={{ width: '100%', paddingY: '18px' }} >
                <Stepper activeStep={activeStep} alternativeLabel={true} sx={mobileStepStyle} >
                    {steps.map(({key, value}) => (
                    <Step key={key} >
                        <StepLabel>{value}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>
        </div>
    </>
    );
}

export default OrderStatusStepper;