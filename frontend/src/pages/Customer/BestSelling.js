import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../../components/Products/ProductCard";


const BestSelling = () => {
    const [data, setData] = useState([]);
    const { products } = useSelector(state => state.products);
    const { setActive } = useOutletContext();

    useEffect(() => {
        setActive(2);
        window.scrollTo(0,0);
        if(products?.length > 0) {
            const productData = [...products];
            const d = productData?.sort((a,b) => b.sold_out - a.sold_out);
            setData(d);
        }
    }, [products.length])



    return (
        <div className='section mt-6 min-h-[80vh]'>               
            { data?.length > 0 ?
            <div className="grid grid-cols-1 600px:grid-cols-auto-fill-260 gap-2 600px:gap-[20px] mb-12">
                {data?.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
            : <div className='h-[70vh] normalFlex justify-center'>
                <h4 className='text-[24px]'>暂无商品</h4>
            </div>}
        </div> 
    )
}

export default BestSelling