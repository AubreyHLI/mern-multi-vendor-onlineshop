import React from 'react'
import { timeDateFormat } from '../../helpers/dayjsHelper'

const OrderInfo = ({_id, createdAt, paymentInfo, shippingAddress}) => {
    return (
        <>
            <h3 className='!text-[#111111] text-[18px] 800px:text-[19px]'>订单信息</h3>
            <div className='mt-2 flex flex-col gap-[6px] 800px:flex-row text-[13px] 800px:text-[14px]'>
                <div className='800px:flex-1 flex flex-col gap-[6px]'>
                    <div><span className='text-[#848689]'>订单编号：</span>{_id}</div>
                    <div><span className='text-[#848689]'>下单时间：</span>{timeDateFormat(createdAt)}</div>
                    <div><span className='text-[#848689]'>支付方式：</span>{paymentInfo?.type === 'Bank Card' ? '在线支付（银行卡）' : '货到付款'}</div>
                    <div><span className='text-[#848689]'>支付状态：</span>{paymentInfo?.status === 'succeeded' ? '已完成' : '未完成'}</div>
                </div>
                <div className='800px:flex-1 flex flex-col gap-[6px]'>
                    <div className='flex gap-3 800px:flex-col 800px:gap-1'>
                        <h3 className='text-[#848689]'>收件人：</h3>
                        <h3>{shippingAddress?.recipient}<span className='ml-3'>{shippingAddress?.phone}</span></h3>
                    </div>
                    <div className='flex 800px:flex-col gap-[6px] 800px:gap-1'>
                        <h3 className='text-[#848689] min-w-fit'>收货地址: </h3>     
                        <h3>{shippingAddress?.province}省  {shippingAddress?.city}市  {shippingAddress?.district}区  {shippingAddress?.address1} </h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderInfo