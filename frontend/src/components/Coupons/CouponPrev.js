import React from 'react'

const CouponPrev = ({data, setOpenCouponsList}) => {
    return (
        <div className='bg-[rgb(251,242,233)] text-[rgb(255,153,51)] normalFlex gap-[6px] w-max min-w-fit py-2 px-3'>
             <div className='normalFlex gap-[2px] text-[13px] 800px:text-[14px] 800px:font-[500]'>
                { data?.type === 'fixedAmount' &&
                <>
                    <span>满</span>
                    <span>{ data?.lowerLimit }</span>
                    <span>减</span>
                    <span>{ data?.discountPrice }</span>
                </>}

                { data?.type === 'percentage' &&
                <>
                    <span>满</span>
                    <span>{ data?.lowerLimit }</span>
                    <span>打</span>
                    <span>{10 - data?.discountPercentage * 0.1}折</span>
                </>
                }

            </div>

            <button onClick={() => setOpenCouponsList(true)} className='text-[11px] rounded-full px-[8px] py-[2px] bg-[rgb(255,153,51)] text-white 800px:text-[12px]'>
                领取
            </button>

        </div>
    )
}

export default CouponPrev