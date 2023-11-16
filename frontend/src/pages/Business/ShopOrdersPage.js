import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import ShopOrderCard from '../../components/Shop/ShopOrderCard';


const ShopOrdersPage = () => {
    const {setActive} = useOutletContext();
    const { shopOrders } = useSelector(state => state.shop);

	useEffect(() => {
		setActive(2);
		window.scrollTo(0,0);
	}, [])


    return (
        <div className='w-full my-3'>   
            <h1 className="text-[20px] px-2 800px:text-[22px] 800px:px-0">店铺订单</h1> 
            
            <div className='normalFlex justify-end gap-2 '>
                <h4 className='text-[15px]'>全部订单( {shopOrders?.length} )</h4>
            </div>
            
            <div className="grid grid-cols-1 mt-2 mb-6 600px:mt-4 gap-x-3 gap-y-[20px]">
                { shopOrders?.map(item => 
                <ShopOrderCard data={item} key={item?._id} />)}
            </div>

        </div>
    )
}

export default ShopOrdersPage