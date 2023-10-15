import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ShopHeader from './ShopHeader';
import ShopSidebar from './ShopSidebar';
import { useGetShopCouponsQuery, useGetShopProductsQuery } from '../../redux/features/shop/shopApi';
import { useDispatch, useSelector } from 'react-redux';
import { setShopCoupons, setShopProducts } from '../../redux/features/shop/shopSlice';

const ShopCommonLayout = () => {
	const [active, setActive] = useState(0);
	const { shop } = useSelector(state => state.shopAuth);
	const { data: productsData, isSuccess: productsSuccess } = useGetShopProductsQuery(shop?._id);
	const { data: couponsData, isSuccess: couponsSuccess } = useGetShopCouponsQuery(shop?._id, {skip: !shop?._id});
	const dispatch = useDispatch();

	useEffect(() => {
		if(productsSuccess) {
			dispatch(
				setShopProducts(productsData?.shopProducts)
			)
		}
	}, [productsSuccess, productsData?.shopProducts])

	useEffect(() => {
		if(couponsSuccess) {
			dispatch(
				setShopCoupons(couponsData?.shopCoupons)
			)
		}
	}, [couponsSuccess, couponsData?.shopCoupons])

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