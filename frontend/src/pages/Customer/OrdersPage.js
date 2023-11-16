import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import OrderCard from '../../components/Orders/OrderCard';

const OrdersPage = () => {
	const { setActive, setWithNav, setActiveSidebar } = useOutletContext();
	const { orderHistory } = useSelector(state => state.user);

    useEffect(() => {
		setWithNav(true);
		setActive(7);
		setActiveSidebar(1);
        window.scrollTo(0,0);
    }, [])

	return (
		<div className="w-full">
            <h1 className="text-[22px] 800px:text-[26px] mb-[16px]">我的订单</h1>

			<div className='w-full grid grid-cols-1 gap-4'>

				{orderHistory?.map((item, index) => 
					<OrderCard key={index} data={item} />
				)}
			</div>

        </div>
	)
}

export default OrdersPage