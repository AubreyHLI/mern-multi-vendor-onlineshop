import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const PaymentSuccessPage = () => {
    const { setActiveStep } = useOutletContext();

    useEffect(() => {
        setActiveStep(3);
        window.scrollTo(0, 0);
    }, []);

    
    return (
        <div className='flex flex-col gap-4'>
            <h1>Thanks for your shopping! 🎉</h1>

        </div>
    )
}

export default PaymentSuccessPage