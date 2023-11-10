import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import PaymentInfo from '../../components/Checkout/PaymentInfo';
import PaymentForm from '../../components/Checkout/PaymentForm';

const PaymentPage = () => {
    const { stripePromise, setWithNav } = useOutletContext();

    useEffect(() => {
        setWithNav(false);
        window.scrollTo(0, 0);
    }, []);

    
    return (
        <div className='flex flex-col gap-4'>
            <h1 className="text-[22px] 800px:text-[24px] font-[500]">Step 2：订单支付</h1>

            <PaymentInfo />

            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>

        </div>
    )
}

export default PaymentPage