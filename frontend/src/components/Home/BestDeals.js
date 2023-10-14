import React, { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { useSelector } from "react-redux";

const BestDeals = () => {
	const [data, setData] = useState([]);
	const { products } = useSelector(state => state.products);

	useEffect(() => {
		const productData = [...products];
        const d = productData?.sort((a,b) => b.sold_out - a.sold_out);
		const firstFive = d.slice(0, 5);
		setData(firstFive);
	}, [products.length]);
	

	return (
		<div className='section'>
			<h2 className='text-[24px] font-[500] border-b mb-5'>
				热销商品
			</h2>
			{ data?.length !== 0 && 
			<div className="grid grid-cols-1 gap-[20px] 600px:grid-cols-2 600px:gap-[25px] 800px:grid-cols-3 1000px:grid-cols-4 1200px:grid-cols-5 mb-12 border-0">
				{ data?.map((i, index) => <ProductCard data={i} key={index} />)}
			</div>}
		</div>
	);
};

export default BestDeals;