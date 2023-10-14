import React, { useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { useGetSingleShopInfoQuery } from '../../redux/features/products/productsApi';
import { toast } from 'react-toastify';
import Loader from '../../components/atoms/Loader';
import ShopInfoCard from '../../components/Shop/ShopInfoCard';
import ProductCard from '../../components/Products/ProductCard';

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
		<div className="w-full h-full 800px:flex gap-5 justify-between">
			<div className="800px:w-[25%] 800px:max-w-[320px] bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0">
				<ShopInfoCard shopData={data?.shop} shopProductsCount={data?.shopProducts?.length}/>
			</div>
			<div className="800px:flex-1 py-5 800px:pr-5">
				{/* <BrandProducts brandProducts={brandProducts} /> */}
				<div className="grid grid-cols-1 gap-[20px] 600px:grid-cols-auto-fill-245">
                	{ data?.shopProducts?.map((i, index) => 
                    	<ProductCard data={i} key={index} isShopPage={true} />
					)}
				</div>
			</div>
		</div>
    )
}

export default ShopPage