import React from 'react'
import CustomPrice from '../atoms/CustomPrice';
import { timeDateFormat } from '../../helpers/dayjsHelper';
import { MdDeleteOutline } from 'react-icons/md';
import { PiListMagnifyingGlass } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import OrderStatus from '../Orders/OrderStatus';

const ShopOrderCard = ({data}) => {
    const {_customer, checkoutSummary, _id, orderDetails, status, createdAt, paymentInfo} = data;

    const handleCloseOrder = async () => {

    }

    const renderOrderSummary = () => {
        const count = orderDetails?.reduce((acc, item) => acc + item?.qty, 0);
        const sum = checkoutSummary?.totalPrice + checkoutSummary?.shipping;
        return (
            <div className='flex flex-col items-end w-fit '>
                <CustomPrice price={sum} optionStyle='!text-[17px] 800px:!text-[18px] font-[500] text-black'/>
                  <span className='text-[12px] text-[#00000088]'>(含运费：¥{checkoutSummary?.shipping.toFixed(2)})</span>
                <span className='text-[12px] text-[#00000054] 800px:text-[13px]'>
                    共 {count} 件
                </span>
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-between gap-2 shadow-md bg-white py-3 px-3'>
            <div className='flex flex-col gap-2 text-[#00000088] 600px:px-2'>
                <div className='normalFlex justify-between'>
                    <h5 className='text-[12px] 600px:text-[13px] 800px:text-[14px]'>
                        订单号：{_id}
                    </h5>
                    
                    <div className='normalFlex justify-between text-[14px] min-w-fit'>
                        <span className='text-[#00000054] hidden 800px:block'>订单状态：</span>
                        <OrderStatus status={status} optionStyle='800px:!text-[16px]'/>
                    </div>
                </div>
               

                <div className='normalFlex justify-between gap-4'>
                    {orderDetails?.length === 1 && 
                    <div className='flex-1 normalFlex gap-2 justify-start 800px:gap-3'>
                        <div className="min-w-fit">
                            <img className="w-[60px] h-[60px] 600px:w-[80px] 600px:h-[80px] object-cover rounded-lg " alt="" src={orderDetails[0]?.image}/>
                        </div>
                        <p className='line-clamp-2 text-[13px] text-[#000000bd]'>
                            {orderDetails[0]?.name}
                        </p>
                    </div>
                    }
                    {orderDetails?.length > 1 && 
                    <div className='normalFlex gap-3 overflow-x-scroll no-scrollbar'>
                        {orderDetails?.map((item, index) => 
                        <div key={index} className="min-w-fit text-center">
                            <img className="w-[60px] h-[60px] 600px:w-[80px] 600px:h-[80px] object-cover rounded-lg " alt="" src={item?.image}/>
                            <h5 className='line-clamp-1 text-[13px] text-[#000000bd] w-[60px] 600px:w-[80px]'>
                                {item?.name}
                            </h5>
                        </div>
                        )}                        
                    </div>
                    }
                    <div className='w-fit min-w-fit'>
                        {renderOrderSummary()}
                    </div>
                </div>

                <div className='w-full flex flex-col gap-1 text-[12px] border-t border-dashed pt-1 600px:text-[13px] 1000px:text-[14px]'>
                    <div className='normalFlex justify-between gap-3 600px:justify-start '>
                        <span className='text-[#00000054]'>下单时间：</span>
                        <span>{timeDateFormat(createdAt)}</span>
                    </div>
                    <div className='normalFlex justify-between gap-3 600px:justify-start '>
                        <span className='text-[#00000054]'>客户昵称：</span>
                        <span>{_customer?.name}</span>
                    </div>
                    <div className='normalFlex justify-between gap-3 600px:justify-start '>
                        <span className='text-[#00000054]'>支付方式：</span>
                        <span>{paymentInfo?.type === 'Bank Card' ? '在线支付（银行卡' : '货到付款'}</span>
                    </div>
                    <div className='normalFlex justify-between gap-3 600px:justify-start '>
                        <span className='text-[#00000054]'>支付状态：</span>
                        <span>{paymentInfo?.status === 'succeeded' ? '已完成' : '未完成'}</span>
                    </div>
                </div>
            </div>            

            <div className='w-full grid grid-cols-2 text-[12px] 600px:text-[14px] mt-2 border-t !text-[#606060] select-none'>
                <Link to={`/business/order/${data?._id}`} className='pt-2 normalFlex justify-center gap-1'>
                    <PiListMagnifyingGlass size={18}/>详情及管理
                </Link>
                <button onClick={handleCloseOrder} className='pt-2 normalFlex justify-center gap-1'>
                    <MdDeleteOutline size={16}/>关闭订单
                </button>
            </div>

        </div>
    )
}

export default ShopOrderCard