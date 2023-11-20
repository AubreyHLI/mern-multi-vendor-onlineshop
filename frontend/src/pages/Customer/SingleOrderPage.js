import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom'
import OrderDetails from '../../components/Orders/OrderDetails';
import OrderStatus from '../../components/Orders/OrderStatus';
import OrderStatusStepper from '../../components/Orders/OrderStatusStepper';
import OrderInfo from '../../components/Orders/OrderInfo';

const SingleOrderPage = () => {
	const { id } = useParams();
	const { setActive, setWithNav, setActiveSidebar } = useOutletContext();
  	const { orderHistory } = useSelector(state => state.user);
	const [order, setOrder] = useState({});

	useEffect(() => {
		setWithNav(true);
		setActive(7);
		setActiveSidebar(1);
        window.scrollTo(0,0);
    }, [])

	useEffect(() => {
		const data = orderHistory?.find(ord => ord?._id == id);
		setOrder({...data})
	}, [id, orderHistory])

    return (
		<div className="w-full">
            <h1 className="text-[22px] 800px:text-[26px] mb-[16px]">订单详情</h1>
			
			{order?._id &&
			<div className="w-full rounded-md flex flex-col gap-3">
				<div className='bg-[#fff] w-full py-3 '>
					<div className='!text-[#111111] text-[18px] normalFlex gap-1 px-2 800px:px-4 800px:text-[19px]'>
						<h3>订单状态：</h3>
						<OrderStatus status={order?.status} optionStyle='!text-[#111111]'/>
					</div>
					<OrderStatusStepper status={order?.status} />
				</div>

				<div className='bg-[#fff] w-full px-2 py-3 800px:px-4'>
					<OrderInfo 
						_id={order?._id} 
						createdAt={order?.createdAt}
						paymentInfo={order?.paymentInfo} 
						shippingAddress={order?.shippingAddress} 
					/>
					<OrderDetails 
						orderId={order?._id} 
						shop={order?.shop} 
						checkoutSummary={order?.checkoutSummary}
						orderDetails={order?.orderDetails}
						status={order?.status}
					/>
				</div>
			</div>
			}

        </div>
    )
}

export default SingleOrderPage