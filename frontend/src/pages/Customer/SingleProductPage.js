import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';
import ProductDetails from '../../components/Products/ProductDetails';
import SuggestedProducts from '../../components/Products/SuggestedProducts';
import ProductInfo from '../../components/Products/ProductInfo';
import ProductShopInfo from '../../components/Products/ProductShopInfo';


const SingleProductPage = () => {
    const { id } = useParams();
    const { setActive } = useOutletContext();
    const { products } = useSelector(state => state.products);
    const [product, setProduct] = useState(null); 

    useEffect(() => {
        const p = products?.find(item => item._id === id);
        setProduct(p);
        setActive(0);
        window.scrollTo(0,0);
    },[id, products.length])

    return (
        <div className='section py-3 800px:py-6 min-h-[100vh] flex flex-col gap-4' >
            <div className='flex flex-col gap-4 1200px:flex-row'>
                { product && <ProductInfo data={product}/> }

                { product?.shop && <ProductShopInfo shop={product?.shop} /> }
            </div>

            { product && <ProductDetails data={product} /> }

            { product && <SuggestedProducts data={product}/>}
        </div>
    )
}

export default SingleProductPage