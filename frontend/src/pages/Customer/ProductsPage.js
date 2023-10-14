import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/Products/ProductCard';

const ProductsPage = () => {
    const [data, setData] = useState(null);
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    const { products } = useSelector(state => state.products);
    const { setActive } = useOutletContext();

    
    useEffect(() => {
        setActive(3);
        window.scrollTo(0,0);
        if(!categoryData) {
            setData([...products]);
        } else {
            const productData = [...products];
            const d = productData?.filter(item => item.category === categoryData);
            setData(d);
        }
    }, [products.length, searchParams])


    return (
        <div className='section mt-6 min-h-[80vh]'>
            { data?.length > 0 ?
            <div className="grid grid-cols-1 600px:grid-cols-auto-fill-260 gap-2 600px:gap-[20px] mb-12">
                {data?.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
            : <div className='h-[70vh] normalFlex justify-center'>
                <h4 className='text-[24px]'>暂无商品</h4>
            </div>
            }
        </div>
    )
}

export default ProductsPage