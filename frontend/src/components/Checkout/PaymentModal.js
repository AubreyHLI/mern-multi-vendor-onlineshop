import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useGetPublicStripeKeyQuery } from '../../redux/features/checkout/checkoutApi';

const PaymentModal = () => {
    const [stripePromise, setStripePromise] = useState(null);
	const [clientSecret, setClientSecret] = useState('');
	const [data, isSuccess, isError, error] = useGetPublicStripeKeyQuery();

	useEffect(() => {
		if(isSuccess) {
			const { publishKey } = data;
			setStripePromise(loadStripe(publishKey));
		}
	}, [isSuccess])

    return (
        <div>Payment</div>
    )
}

export default PaymentModal