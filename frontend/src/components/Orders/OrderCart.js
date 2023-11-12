import React from 'react'
import { dotDateFormat } from '../../helpers/dayjsHelper'
import { PiStorefront } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const OrderCart = ({data, children}) => {
    const {shop, paymentInfo, checkoutSummary, _id, _customer, orderDetails, shippingAddress, status, createdAt} = data;

    const renderOrderSummary = () => {
        const count = orderDetails?.reduce((acc, item) => acc + item?.qty, 0);
        const sum = checkoutSummary?.totalPrice + checkoutSummary?.shipping;
        return (
            <div className='flex flex-col items-end w-fit '>
                <span className='font-[500]'><span className='text-[13px]'>¥</span>{sum.toFixed(2)}</span>
                <span className='text-[12px] text-[#00000054]'>共 {count} 件</span>
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-between shadow-sm bg-white'>
            <div className='flex flex-col py-3 gap-2 px-3'>
                <div className='w-full normalFlex justify-between text-[13px]'>
                    <span>订单编号：{_id}</span>
                    {/* <span>{dotDateFormat(createdAt)}</span> */}
                </div>
                <div className='w-full normalFlex justify-between text-[13px]'>
                    <Link to={`/shop/${shop?._id}`} className='normalFlex gap-[6px] font-[500]'>
                        <PiStorefront size={20}/>
                        <h3>{shop?.name}</h3>
                        <IoIosArrowForward />
                    </Link>
                    <span className='col-span-2'>{status}</span>
                </div>

                <div className='normalFlex justify-between gap-3'>
                    {orderDetails?.length === 1 && 
                    <div className='flex-1 normalFlex gap-2 justify-start'>
                        <div className="w-[60px] 600px:w-[80px] min-w-fit">
                            <img className="w-full h-[60px] 600px:h-[80px] object-cover rounded-lg " alt="" src={orderDetails[0]?.image}/>
                        </div>
                        <p className='line-clamp-2 text-[13px] text-[#000000bd]'>
                            {orderDetails[0]?.name}{orderDetails[0]?.name}{orderDetails[0]?.name}
                        </p>
                    </div>
                    }
                    {orderDetails?.length > 1 && 
                    <div className='normalFlex gap-2 overflow-x-scroll'>
                        {orderDetails?.map((item, index) => 
                        <div key={index} className="w-[60px] 600px:w-[80px] min-w-fit">
                            <img className="w-full h-[60px] 600px:h-[80px] object-cover rounded-lg " alt="" src={item?.image}/>
                        </div>
                        )}
                    </div>
                    }
                    <div className='w-fit min-w-fit'>
                        {renderOrderSummary()}
                    </div>
                </div>

                
                {/* <div className='flex flex-col gap-2 800px:w-[55%]'>
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
                <div>
                    创建日： {createdAt}
                </div>
                <div>
                    金额：{checkoutSummary?.totalPrice}
                    运费：{checkoutSummary?.shipping}
                </div> */}
            </div>

            { children }
        </div>
    )
}
    

export default OrderCart