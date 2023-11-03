import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CheckoutAddress from './CheckoutAddress';
import ShopCartCard from './ShopCartCard';
import CheckoutSummary from './CheckoutSummary';

const CheckoutInfo = () => {
    const [checkoutOrders, setCheckoutOrders] = useState([]);
    const { cart } = useSelector(state => state.user);

    useEffect(() => {
        if(cart?.length > 0) {
            const shopOrders = [];
            for(let shopCart of cart) {
                let order = {
                    shopId: shopCart?.shop?._id,
                    shopName: shopCart?.shop?.name,
                    cartItems: [],
                    discount: 0,
                    total: 0,
                };
                shopCart?.items?.forEach(item => {
                    const {product, qty} = item;
                    order.cartItems.push({
                        productId: product?._id,
                        name: product?.name,
                        image: product?.images[0],
                        price: product?.discountPrice ? product?.discountPrice : product?.originalPrice,
                        qty: qty,
                    })
                })
                shopOrders.push(order);
            }
            setCheckoutOrders([...shopOrders]);
        }
    }, [cart])


    const applyCoupon = (index, newDiscount, newTotal) => {
        const updatedOrders = [...checkoutOrders];
        updatedOrders[index].discount = newDiscount;
        updatedOrders[index].total = newTotal;
        setCheckoutOrders(updatedOrders);
    }

    
    return (
        <div className='flex flex-col gap-4'>
            <h1 className="text-[22px] 800px:text-[24px] font-[500]">确认订单</h1>

            {/* shipping info */}
            <div className="w-full">
                <CheckoutAddress />
            </div>
            
            {/* cart info */}
            <div className="w-full">
                {cart?.map((item, i) => 
                <ShopCartCard shopCart={item} key={i} index={i} applyCoupon={applyCoupon} />)}
            </div>

            {/* order summary */}
            <div className='w-full bg-[#e8e8e8] px-5 py-4'>
                <CheckoutSummary />
            </div>

        </div>
    )
}

export default CheckoutInfo