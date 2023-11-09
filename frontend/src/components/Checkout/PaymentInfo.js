import React from 'react'
import { useSelector } from 'react-redux';

const PaymentInfo = () => {
    const { shippingAddress, subTotalPrice, allDiscount, shipping, totalPrice } = useSelector(state => state.checkout);

    return (
        <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md px-5 pb-4 pt-4">
             <h3 className='font-[500] text-[18px]'>支付详情</h3>
            <div></div>
        </div>
    )
}

export default PaymentInfo