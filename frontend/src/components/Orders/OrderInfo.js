import React from 'react'
import { timeDateFormat } from '../../helpers/dayjsHelper'

const OrderInfo = ({_id, createdAt, paymentInfo, shippingAddress, isSeller=false, _customer}) => {
    
    return (
        <>
            <h3 className='!text-[#111111] text-[18px] 800px:text-[19px]'>订单信息</h3>
            <div className='mt-2 flex flex-col gap-[6px] 800px:flex-row text-[13px] 800px:text-[14px]'>
                <div className='800px:flex-1 flex flex-col gap-[6px]'>
                    <div className='flex gap-2'>
                        <span className='text-[#848689] min-w-fit'>订单编号：</span>
                        <span>{_id}</span>
                    </div>
                    <div className='flex gap-2'>
                        <span className='text-[#848689] min-w-fit'>下单时间：</span>
                        <span>{timeDateFormat(createdAt)}</span>
                    </div>
                    <div className='flex gap-2'>
                        <span className='text-[#848689] min-w-fit'>支付方式：</span>
                        <span>{paymentInfo?.type === 'Bank Card' ? '在线支付（银行卡）' : '货到付款'}</span>
                    </div>
                    <div className='flex gap-2'>
                        <span className='text-[#848689] min-w-fit'>支付状态：</span>
                        <span>
                            {paymentInfo?.status === 'succeeded' && '已完成'}
                            {paymentInfo?.status === 'incomplete' && '未完成'}
                            {paymentInfo?.status === 'refunded' && '已退还'}
                        </span>
                    </div>
                </div>
                {isSeller ?
                <div className='800px:flex-1 flex flex-col gap-[6px]'>
                    <div className='flex gap-2'>
                        <h3 className='text-[#848689] min-w-fit'>买家昵称：</h3>
                        <h3>{_customer?.name}</h3>
                    </div>
                    <div className='flex gap-5'>
                        <h3 className='text-[#848689] min-w-fit'>收件人：</h3>
                        <h3>{shippingAddress?.recipient}<span className='ml-3'>{shippingAddress?.phone}</span></h3>
                    </div>
                    <div className='flex gap-4'>
                        <h3 className='text-[#848689] min-w-fit'>收货地址: </h3>     
                        <h3>{shippingAddress?.province}  {shippingAddress?.city}  {shippingAddress?.district}  {shippingAddress?.address1} </h3>
                    </div>
                </div> 
                :
                <div className='800px:flex-1 flex flex-col gap-[6px]'>
                    <div className='flex gap-5 800px:flex-col 800px:gap-1'>
                        <h3 className='text-[#848689] min-w-fit'>收件人：</h3>
                        <h3>{shippingAddress?.recipient}<span className='ml-3'>{shippingAddress?.phone}</span></h3>
                    </div>
                    <div className='flex 800px:flex-col gap-4 800px:gap-1'>
                        <h3 className='text-[#848689] min-w-fit'>收货地址: </h3>     
                        <h3>{shippingAddress?.province}  {shippingAddress?.city}  {shippingAddress?.district}  {shippingAddress?.address1} </h3>
                    </div>
                </div>
                }
            </div>
        </>
    )
}

export default OrderInfo