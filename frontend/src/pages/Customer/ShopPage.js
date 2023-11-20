import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { useGetSingleShopInfoQuery } from '../../redux/features/products/productsApi';
import { toast } from 'react-toastify';
import Loader from '../../components/atoms/Loader';
import ShopInfoCard from '../../components/Shop/ShopInfoCard';
import ProductCard from '../../components/Products/ProductCard';
import CouponsListModal from '../../components/Coupons/CouponsListModal';
import CouponPrev from '../../components/Coupons/CouponPrev';

const ShopPage = () => {
	const { id } = useParams();
	const { setActive } = useOutletContext();
	const { data, isLoading, isSuccess, isError, error } = useGetSingleShopInfoQuery(id);
	const [openCouponsList, setOpenCouponsList] = useState(false);
	const [avgRatings, setAvgRatings] = useState(0);

	useEffect(() => {
		if(isError) {
			toast.error(error?.data?.message);
		}
		if(isSuccess) {
			const { shopProducts } = data;
			let totalReviewNum = 0;
			let totalRatings = 0;
			for(const product of shopProducts) {
				totalReviewNum += product?.reviews?.length;
				totalRatings += product?.reviews?.reduce((acc, item) => acc + item?.rating, 0);
			}
			const averageRating = totalReviewNum > 0 ? totalRatings / totalReviewNum : 0;
			setAvgRatings(averageRating.toFixed(2));
			
		}
	}, [isError, isSuccess])

	useEffect(() => {
		window.scrollTo(0,0);
		setActive(0);
	}, [])

	useEffect(() => {
        if(openCouponsList) {
            document.body.style.overflow = 'hidden';  // lock the scroll of home page
        } else {
            document.body.style.overflow = 'unset';  // unlock the scroll of home page
        }
    }, [openCouponsList]);

	if(isLoading) {
		return <Loader />
	}

    return (
		<div className="section py-5 flex flex-col gap-5">
			<div className="bg-[#fff] rounded-[4px]">
				<ShopInfoCard shopData={data?.shop} shopProductsCount={data?.shopProducts?.length} avgRatings={avgRatings}/>
			</div>

			<div>
				<div className="normalFlex gap-1 overflow-x-scroll">
					{ data?.shopCoupons?.map((i, index) => 
						<CouponPrev data={i} key={index} setOpenCouponsList={setOpenCouponsList} />
					)}	
				</div>
			</div>

			<div className="grid grid-cols-1 gap-[20px] 600px:grid-cols-auto-fill-245">
				{ data?.shopProducts?.map((i, index) => 
					<ProductCard data={i} key={index} isShopPage={true} />
				)}
			</div>

			{ openCouponsList && <CouponsListModal coupons={data?.shopCoupons} setOpenForm={setOpenCouponsList} heading='店铺优惠券' /> }
		</div>
    )
}

export default ShopPage