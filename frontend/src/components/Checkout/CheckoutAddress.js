import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import AddressSelector from '../Address/AddressSelector';
import { setShippingAddress } from '../../redux/features/checkout/checkoutSlice';

const CheckoutAddress = () => {
    const [openAddressSelector, setOpenAddressSelector] = useState(false);
    const { addressBook } = useSelector(state => state.user);
    const { shippingAddress } = useSelector(state => state.checkout);
    const dispatch = useDispatch();

    useEffect(() => {
        if(openAddressSelector) {
            document.body.style.overflow = 'hidden';  // lock the scroll of home page
        } else {
            document.body.style.overflow = 'unset';  // unlock the scroll of home page
        }
    }, [openAddressSelector]);

    useEffect(() => {
        if(!shippingAddress) {
            console.log('init')
            const defaultAddress = addressBook?.addresses?.find(a => a?._id == addressBook?.defaultAddressId);
            dispatch( setShippingAddress({
                recipient: defaultAddress?.recipient,
                phone: defaultAddress?.phone,
                province: defaultAddress?.province,
                city: defaultAddress?.city,
                district: defaultAddress?.district,
                address1: defaultAddress?.address1,
                _id: defaultAddress?._id,
            }) )
        }
    }, [])

    return (
        <>
            <div className='bg-[#fff] rounded-md p-5 shadow-sm'>
                <div className='mb-3 normalFlex gap-[6px]'>
                    <h3 className='font-[500] text-[18px]'>收货地址</h3>
                    <LiaShippingFastSolid size={22}  />
                </div>
                <div onClick={() => setOpenAddressSelector(true)} className='cursor-pointer normalFlex justify-between gap-4 w-full 800px:flex-1 ' >
                    <div className='flex flex-col gap-1 text-[16px] 800px:flex-row 800px:gap-3 800px:items-center 800px:text-[17px]'>
                        <div className='normalFlex gap-[5px] font-[600] 800px:font-[600]'>
                            <span className='hidden 800px:block'>(</span>
                            <span>{shippingAddress?.recipient}</span>
                            <span className='hidden 800px:block'>收 )</span>
                            <span className='ml-3 800px:text-[#00000082] 800px:ml-1'>{shippingAddress?.phone}</span>
                        </div>
                        <div className='text-[15px] 800px:order-first 800px:text-[16px]'>
                            {shippingAddress?.province}  {shippingAddress?.city}  {shippingAddress?.district}  {shippingAddress?.address1} 
                        </div>
                    </div>
                    <div className='text-[#00000082] normalFlex w-max min-w-fit'>
                        <span className='text-[13px] hidden 600px:block'>使用其它地址 </span>
                        <IoIosArrowForward size={18}/>
                    </div>
                </div>
            </div>

            { openAddressSelector && <AddressSelector setOpenAddressSelector={setOpenAddressSelector}/> }
        </>
    )
}

export default CheckoutAddress