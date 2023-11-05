import React, { useEffect, useState } from 'react'
import CheckoutInfo from '../../components/Checkout/CheckoutInfo';
import PaymentModal from '../../components/Checkout/PaymentModal';
import { useOutletContext } from 'react-router-dom';

const CheckoutPage = () => {
    const { setWithSidebar, setWithNav, setIsCart } = useOutletContext();
    const [openPaymentForm, setOpenPaymentForm] = useState(false);

    useEffect(() => {
        setIsCart(false);
        setWithNav(false);
        setWithSidebar(false);
        window.scrollTo(0, 0);
    }, []);

    return (
      	<div>
            <CheckoutInfo setOpenPaymentForm={setOpenPaymentForm} />

            {openPaymentForm && <PaymentModal setOpenPaymentForm={setOpenPaymentForm} />}
        </div>
    )
}

export default CheckoutPage