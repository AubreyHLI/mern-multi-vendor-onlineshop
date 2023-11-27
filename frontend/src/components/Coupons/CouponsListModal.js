import React from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { RxCross1 } from 'react-icons/rx'
import CouponCard from './CouponCard'

const CouponsListModal = ({setOpenForm, heading, coupons}) => {
  return (
    <ModalLayout setOpenForm={setOpenForm} optionStyle='600px:mt-[80px] 600px:max-w-[700px]'>
        <div className='w-full flex items-center gap-4 mt-3 mb-1 600px:my-3'>
            <div onClick={() => setOpenForm(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
                <RxCross1 size={20}/>
            </div>
            <h1 className='font-[500] text-[20px]'>{heading}</h1>
        </div>

        <div className="grid grid-cols-auto-fill-245 800px:grid-cols-auto-fill-280 gap-x-3 gap-y-[20px] mb-6 mt-4">
            { coupons?.map((coupon, index) => <CouponCard data={coupon} key={index} />)}
        </div>
    </ModalLayout>
  )
}

export default CouponsListModal