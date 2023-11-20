import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { timeDateFormat } from '../../helpers/dayjsHelper';
import OrderStatus from '../../components/Orders/OrderStatus';
import ShopRefundsTable from '../../components/Shop/ShopRefundsTable';

const ShopRefundPage = () => {
    const {setActive} = useOutletContext();
    const { shopRefunds } = useSelector(state => state.shop);

	useEffect(() => {
		setActive(3);
		window.scrollTo(0,0);
	}, [])

    return (
        <div className='w-full my-3'>   
            <h1 className="text-[20px] px-2 800px:text-[22px] 800px:px-0">售后申请管理</h1> 
            
            <div className='normalFlex justify-end gap-2 '>
                <h4 className='text-[15px]'>所有申请订单( {shopRefunds?.length} )</h4>
            </div>
            
            <div className='w-full mt-4 flex flex-col gap-3'>
                {shopRefunds?.map((item, index) => 
                <div className='w-full shadow-md bg-white text-[13px] p-2 700px:p-3' key={index}>
                    <div className='w-full flex flex-col 700px:flex-row text-[#00000095] '>
                        <div className='700px:flex-1 flex flex-col 700px:gap-[2px]'>
                            <div><span className='text-[#00000054]'>订单编号：</span>{item?.order?._id}</div>
                            <div className='flex'>
                                <span className='text-[#00000054]'>订单状态：</span>
                                <OrderStatus status={item?.order?.status} />
                            </div>
                            <div><span className='text-[#00000054]'>下单时间：</span>{timeDateFormat(item?.order?.createdAt)}</div>
                        </div>
                        <div className='700px:flex-1 flex flex-col 700px:gap-[2px]'>
                            <div><span className='text-[#00000054]'>支付方式：</span>{item?.order?.paymentInfo?.type === 'Bank Card' ? '在线支付（银行卡）' : '货到付款'}</div>
                            <div><span className='text-[#00000054]'>支付状态：</span> 
                                {item?.order?.paymentInfo?.status === 'succeeded' && '已完成'}
                                {item?.order?.paymentInfo?.status === 'incomplete' && '未完成'}
                                {item?.order?.paymentInfo?.status === 'refunded' && '已退还'}
                            </div>
                            <div><span className='text-[#00000054]'>买家昵称：</span>{item?.customer?.name}</div>
                        </div>
                    </div>
                    <ShopRefundsTable refundItems={item?.refundItems} orderId={item?.order?._id}/>
                </div>
                )}
            </div>

        </div>
    )
}

export default ShopRefundPage