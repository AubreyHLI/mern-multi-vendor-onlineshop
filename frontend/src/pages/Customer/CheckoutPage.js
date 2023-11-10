import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import CheckoutAddress from '../../components/Checkout/CheckoutAddress';
import CheckoutInfo from '../../components/Checkout/CheckoutInfo';

const CheckoutPage = () => {
    const { setWithNav } = useOutletContext();    

    useEffect(() => {
        setWithNav(false);
        window.scrollTo(0, 0);
    }, []);

    
    return (
        <div className='flex flex-col gap-4'>
            <h1 className="text-[22px] 800px:text-[24px] font-[500]">Step 1：确认订单</h1>

            {/* shipping info */}
            <CheckoutAddress  />
            
            {/* cart and order info */}
            <CheckoutInfo />

        </div>
    )
}

export default CheckoutPage