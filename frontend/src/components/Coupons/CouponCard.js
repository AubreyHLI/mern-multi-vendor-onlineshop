import React from 'react'
import { dotDateFormat } from '../../helpers/dayjsHelper'

const CouponCard = ({data, children}) => {

    return (
        <div className='flex flex-col justify-between bg-white border px-3 '>
            <div className='normalFlex py-3 gap-3'>
                <div className='w-[80px] normalFlex flex-col gap-1 text-[#dc462f] 800px:w-[90px]'>
                    {data?.type === 'fixedAmount' &&
                    <div className='font-[600] flex items-end gap-[2px] '>
                        <span className='leading-none text-[17px] 800px:text-[18px]'>¥</span>
                        <h2 className='text-[20px] leading-none 800px:text-[22px]'>{data?.discountPrice }</h2>
                    </div>}

                    {data?.type === 'percentage' &&
                    <div className='font-[600] normalFlex gap-[3px] '>
                        <h2 className='text-[20px] leading-[20px] 800px:text-[22px] 800px:leading-[22px]'>{10 - data?.discountPercentage * 0.1}</h2>
                        <span className='leading-none text-[14px] 800px:text-[15px] mt-[6px]'>折</span>
                    </div>}

                    <div className='text-[11px] 800px:text-[12px] 800px:font-[500]'>
                        满{data?.lowerLimit }元可用
                    </div>

                </div>

                <div className='flex flex-col gap-1 text-[#606060]'>
                    <div className='normalFlex gap-1 font-[500] text-[13px] 800px:text-[14px]'>
                        <span>[兑换码]</span>
                        <h2 className='text-[14px] 800px:text-[16px]'>{data?.code}</h2>
                    </div>
                    <div className='text-[12px] 800px:text-[13px]'>
                        {data?.name}
                    </div>
                    <div className='text-[11px] normalFlex flex-wrap gap-[2px] text-[#ababab] 800px:text-[12px] '>
                        <h2>{dotDateFormat(data?.beginsAt)}</h2>
                        <span>-</span>
                        <h2>{dotDateFormat(data?.expiresAt)}</h2>
                    </div>
                </div>
            
            </div>

            { children }
        </div>
    )
}

export default CouponCard