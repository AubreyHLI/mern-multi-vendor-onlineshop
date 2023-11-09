import React, { useEffect, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom';
import { useGetPublicStripeKeyQuery } from '../../redux/features/checkout/checkoutApi';
import { loadStripe } from '@stripe/stripe-js';
import HorizontalStepper from '../Checkout/HorizontalStepper';


const CheckoutCommonLayout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { setWithNav } = useOutletContext();
    const [stripePromise, setStripePromise] = useState(null);
	const {data, isSuccess, isError, error} = useGetPublicStripeKeyQuery();

	useEffect(() => {
		if(isSuccess) {
			const { publishKey } = data;
			setStripePromise(loadStripe(publishKey));
		}
	}, [isSuccess])

    useEffect(() => {
        setWithNav(false);
    }, [])

    return (
        <div className="w-full mb-[20px] section">
            <div className='w-full 500px:w-[85%] 800px:w-[75%] max-w-[850px] mb-2 pt-7 pb-5 mx-auto 600px:pt-8 600px:pb-6 '>
                <HorizontalStepper activeStep={activeStep} />
            </div>

            <Outlet context={{setActiveStep, stripePromise}} />
        </div>
    )
}

export default CheckoutCommonLayout