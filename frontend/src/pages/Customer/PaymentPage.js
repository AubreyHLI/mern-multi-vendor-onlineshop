import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const PaymentPage = () => {
    const { setActiveStep, stripePromise } = useOutletContext();    

    useEffect(() => {
        setActiveStep(1);
        window.scrollTo(0, 0);
    }, []);

    
    return (
        <Elements stripe={stripePromise}>
            <div className='flex flex-col gap-4'>
                <h1 className="text-[22px] 800px:text-[24px] font-[500]">订单支付</h1>

            </div>
        </Elements>
    )
}

export default PaymentPage