import React, { useEffect, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom';
import { useGetPublicStripeKeyQuery } from '../../redux/features/checkout/checkoutApi';
import { loadStripe } from '@stripe/stripe-js';


const CheckoutCommonLayout = () => {
    const { setWithNav } = useOutletContext();
    const [stripePromise, setStripePromise] = useState(null);
	const {data, isSuccess } = useGetPublicStripeKeyQuery();

	useEffect(() => {
		if(isSuccess) {
			const { publishKey } = data;
			setStripePromise(loadStripe(publishKey));
		}
	}, [isSuccess])


    return (
        <div className="w-full my-7 section">
            <Outlet context={{stripePromise, setWithNav}} />
        </div>
    )
}

export default CheckoutCommonLayout