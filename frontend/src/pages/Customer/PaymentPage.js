import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import PaymentInfo from '../../components/Checkout/PaymentInfo';
import PaymentForm from '../../components/Checkout/PaymentForm';

const PaymentPage = () => {
    const { setActiveStep, stripePromise } = useOutletContext();

    useEffect(() => {
        setActiveStep(1);
        window.scrollTo(0, 0);
    }, []);

    
    return (
        <div className='flex flex-col gap-4'>
            
            <PaymentInfo />

            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>

        </div>
    )
}

export default PaymentPage