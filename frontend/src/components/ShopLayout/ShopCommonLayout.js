import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ShopHeader from './ShopHeader';
import ShopSidebar from './ShopSidebar';
import { useGetShopProductsQuery } from '../../redux/features/shop/shopApi';
import { useDispatch, useSelector } from 'react-redux';
import { setShopProducts } from '../../redux/features/shop/shopSlice';

const ShopCommonLayout = () => {
	const [active, setActive] = useState(0);
	const { shop } = useSelector(state => state.shopAuth);
	const { data, isSuccess } = useGetShopProductsQuery(shop?._id);
	const dispatch = useDispatch();

	useEffect(() => {
		if(isSuccess) {
			dispatch(setShopProducts(data?.shopProducts))
		}
	}, [isSuccess, data?.shopProducts])

	return (
		<div className='flex flex-col w-full h-screen'>
			<ShopHeader active={active}/>
			<div className="flex items-start justify-between w-full h-[calc(100%-80px)]">
				<ShopSidebar active={active}/>
				<div className='flex-1 px-2 800px:px-8 h-full overflow-y-scroll'>
					<Outlet context={{setActive}} />
				</div>
			</div>
		</div>
	)
}

export default ShopCommonLayout