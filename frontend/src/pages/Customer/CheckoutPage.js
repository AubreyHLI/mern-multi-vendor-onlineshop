import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import CheckoutAddress from '../../components/Checkout/CheckoutAddress';
import CheckoutInfo from '../../components/Checkout/CheckoutInfo';

const CheckoutPage = () => {
    const { setActiveStep } = useOutletContext();    

    useEffect(() => {
        setActiveStep(0);
        window.scrollTo(0, 0);
    }, []);

    
    return (
        <div className='flex flex-col gap-4'>

            {/* shipping info */}
            <CheckoutAddress  />
            
            {/* cart and order info */}
            <CheckoutInfo />

        </div>
    )
}

export default CheckoutPage