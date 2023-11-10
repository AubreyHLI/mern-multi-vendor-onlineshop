import React from 'react'
import { useSelector } from 'react-redux';
import AmountItemStyle from './AmountItemStyle';

const PaymentInfo = () => {
    const { shippingAddress, totalPrice } = useSelector(state => state.checkout);

    return (
        <div className="w-full mx-auto bg-[#fff] rounded-md px-5 pb-4 pt-4 text-[14px] flex flex-col gap-2 800px:flex-row text-[#444]">
            <div className='normalFlex gap-2 w-full justify-center 800px:w-[45%]'>
                <h3 className='font-[500]'>实付款：</h3>
                <h3 className='text-[30px] text-[#ff5e00] font-[600]'>¥ {totalPrice?.toFixed(2)}</h3>
            </div>
            <div className='flex flex-col gap-2 800px:w-[55%]'>
                <div className='flex gap-1 items-start'>
                    <span className='font-[500] min-w-fit'>寄送至：</span>
                    <span className=''>
                        {shippingAddress?.province}省  {shippingAddress?.city}市  {shippingAddress?.district}区  {shippingAddress?.address1} 
                    </span>
                </div>
                
                <div className='flex gap-1'>
                    <span className='font-[500] min-w-fit'>收货人：</span>
                    <div className='normalFlex gap-3'>
                        <span>{shippingAddress?.recipient}</span>
                        <span>{shippingAddress?.phone}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentInfo