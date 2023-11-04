import React from 'react'

const AmountItemStyle = ({title, amount, withDiscount = false, largeSize=false, couponMsg}) => {
    return (
        <div className="flex justify-between">
            <div className='normalFlex gap-2'>
                <h3 className={`font-[400] text-[#000000a4] ${largeSize ? 'text-[16px]' : 'text-[15px]'}`}>
                    {title}
                </h3>
                { couponMsg && 
                <span className='text-[11px] text-[rgb(255,153,51)] border border-[rgb(255,153,51)]  px-1'>
                    {couponMsg}
                </span>}
            </div>
            <h5 className={`font-[600] ${largeSize ? 'text-[18px]' : 'text-[16px]'}`}>
                { withDiscount && '- '}
                ¥ {amount}
            </h5>
        </div>
    )
}

export default AmountItemStyle