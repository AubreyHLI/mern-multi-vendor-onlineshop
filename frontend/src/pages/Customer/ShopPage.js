import React, { useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { useGetSingleShopInfoQuery } from '../../redux/features/products/productsApi';
import { toast } from 'react-toastify';
import Loader from '../../components/atoms/Loader';
import ShopInfoCard from '../../components/Shop/ShopInfoCard';
import ProductCard from '../../components/Products/ProductCard';
import CouponCard from '../../components/Coupons/CouponCard';

const ShopPage = () => {
	const { id } = useParams();
	const { setActive } = useOutletContext();
	const { data, isLoading, isSuccess, isError, error } = useGetSingleShopInfoQuery(id);

	useEffect(() => {
		if(isSuccess) {
			console.log(data);
		}
		if(isError) {
			toast.error(error?.data?.message);
		}
	}, [isSuccess,isError])

	useEffect(() => {
		window.scrollTo(0,0);
		setActive(0);
	}, [])

	if(isLoading) {
		return <Loader />
	}

    return (
		<div className="section py-5 flex flex-col gap-5">
			<div className="bg-[#fff] rounded-[4px]">
				<ShopInfoCard shopData={data?.shop} shopProductsCount={data?.shopProducts?.length}/>
			</div>
			<div className="grid grid-cols-auto-fill-245 gap-1 800px:grid-cols-auto-fill-280">
				{ data?.shopCoupons?.map((i, index) => 
					<CouponCard data={i} key={index} />
				)}	
			</div>
			<div className="grid grid-cols-1 gap-[20px] 600px:grid-cols-auto-fill-245">
				{ data?.shopProducts?.map((i, index) => 
					<ProductCard data={i} key={index} isShopPage={true} />
				)}
			</div>
		</div>
    )
}

export default ShopPage