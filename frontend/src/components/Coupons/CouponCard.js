import React from 'react'

const CouponCard = ({data}) => {

    return (
        <div className='border'>
            <div>{data?.name}</div>

            <div>
                {data?.type === 'fixedAmount' &&
                <div className='font-[600] flex items-end gap-[2px] '>
                    <span className='leading-none text-[18px]'>¥</span>
                    <h2 className='text-[24px] leading-none'>{data?.discountPrice}</h2>
                </div>}

                {data?.type === 'percentage' &&
                <div className='font-[600] flex items-end gap-[3px] '>
                    <h2 className='text-[24px] leading-[22px]'>{10 - data?.discountPercentage * 0.1}</h2>
                    <span className='leading-none text-[15px]'>折</span>
                </div>}

                <span className='text-[15px]'>
                    满{data?.lowerLimit}元可用
                </span>
            </div>

            <div>
                <div className='normalFlex'>
                    <span>优惠券码:</span>
                    <h2>{data?.code}</h2>
                </div>
                <div className='normalFlex'>
                    <span>使用期限:</span>
                    <h2>{data?.beginsAt}</h2>
                    <h2>{data?.expiresAt}</h2>
                </div>
            </div>
            

        </div>
    )
}

export default CouponCard