import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';
import ShopOrderDetail from '../../components/Shop/ShopOrderDetail';
import OrderStatus from '../../components/Orders/OrderStatus';
import OrderStatusStepper from '../../components/Orders/OrderStatusStepper';
import OrderInfo from '../../components/Orders/OrderInfo';
import EditOrderStatus from '../../components/Shop/EditOrderStatus';

const ShopSingleOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [openEditStatus, setOpenEditStatus] = useState(false);
    const {setActive} = useOutletContext();
    const { shopOrders } = useSelector(state => state.shop);
   
	useEffect(() => {
		setActive(2);
		window.scrollTo(0,0);
	}, [])

    useEffect(() => {
        const ord = shopOrders?.find(item => item?._id == id);
        setOrder({...ord})
    }, [id, shopOrders])

    return (
        <div className='w-full my-3'>   
            <h1 className="text-[20px] px-2 800px:text-[22px] 800px:px-0">订单详情</h1> 
            
            {order?._id &&
			<div className="w-full rounded-md flex flex-col gap-3">
				<div className='bg-[#fff] w-full py-3 '>
					<div className='!text-[#111111] text-[18px] normalFlex gap-1 px-2 800px:px-4 800px:text-[19px]'>
						<h3>订单状态：</h3>
						<OrderStatus status={order?.status} optionStyle='!text-[#111111]'/>
					</div>
					<OrderStatusStepper status={order?.status} />
                    {order?.status !== 'Archived' && order?.status !== 'Cancelled' && 
                    <div className='w-full text-center h-[35px]'>
                        { openEditStatus && <EditOrderStatus setOpenForm={setOpenEditStatus} status={order?.status} orderId={id}/>}
                        { !openEditStatus && 
                         <button onClick={()=> setOpenEditStatus(true)} className="text-[13px] 800px:text-[14px] px-3 py-1 800px:py-[6px] rounded-lg text-white bg-pink-400 hover:opacity-90" >
                            更新状态
                        </button>}
                    </div>}
				</div>

				<div className='bg-[#fff] w-full px-2 py-3 800px:px-4'>
					<OrderInfo 
						_id={order?._id} 
						createdAt={order?.createdAt}
						paymentInfo={order?.paymentInfo} 
						shippingAddress={order?.shippingAddress} 
					/>
					<ShopOrderDetail 
						checkoutSummary={order?.checkoutSummary}
						orderDetails={order?.orderDetails}
					/>
				</div>
			</div>
			}
            

        </div>
    )
}

export default ShopSingleOrder