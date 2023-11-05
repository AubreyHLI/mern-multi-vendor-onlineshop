import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CheckoutAddress from './CheckoutAddress';
import ShopOrderCard from './ShopOrderCard';
import AmountItemStyle from './AmountItemStyle';

const CheckoutInfo = () => {
    const [checkoutOrders, setCheckoutOrders] = useState([ ]);
    const { cart } = useSelector(state => state.user);
    
    useEffect(() => {
        cart?.forEach((shopCart, i) => {
            let subTotal = shopCart?.items?.reduce((total, item) => {
                const { product, qty } = item;
                const itemPrice = product?.discountPrice ? product?.discountPrice : product?.originalPrice;
                return itemPrice * qty + total;
            }, 0);
            setCheckoutOrders(prevOrders => [ 
                ...prevOrders,
                { shop: shopCart?.shop, items: shopCart?.items, subTotal: subTotal, discount:0, total: subTotal }
            ]);
        })
    }, [])


    const updateCheckoutOrders = (index, discount, total) => {
        setCheckoutOrders(prevOrders => {
            const updatedOrders = [...prevOrders];
            updatedOrders[index].discount = discount;
            updatedOrders[index].total = total;
            return updatedOrders;
        })
    }

    const renderCheckoutSummary = () => {
        const subTotalPrice = checkoutOrders?.reduce((sum, order) => sum + order?.subTotal, 0);
        const shipping = subTotalPrice > 99 ? 0 : 10;
        const discount = checkoutOrders?.reduce((sum, order) => sum + order?.discount, 0 );
        const totalPrice = subTotalPrice + shipping - discount;
    
        return (
            <div className='w-full 700px:w-[50%] 700px:max-w-[400px] ml-auto mr-0'>
                <AmountItemStyle title='总商品金额' amount={subTotalPrice?.toFixed(2)} largeSize={true} />
                <AmountItemStyle title='运费' amount={shipping?.toFixed(2)} largeSize={true} />
                <AmountItemStyle title='总优惠' amount={discount?.toFixed(2)} withDiscount={true} largeSize={true} />
                <div>
                    <AmountItemStyle title='应付总款' amount={totalPrice?.toFixed(2)} largeSize={true} />
                </div>
            </div>
        )
    }

    
    return (
        <div className='flex flex-col gap-4'>
            <h1 className="text-[22px] 800px:text-[24px] font-[500]">确认订单</h1>

            {/* shipping info */}
            <div className="w-full">
                <CheckoutAddress  />
            </div>
            
            {/* cart info */}
            <div className="w-full">
                {/* { (checkoutOrders?.length === cart?.length) && */}
                {checkoutOrders?.map((order, i) => 
                <ShopOrderCard order={order} key={i} index={i} updateCheckoutOrders={updateCheckoutOrders} />)
                }
            </div>

            {/* order summary */}
            <div className='w-full bg-[#e8e8e8] px-5 py-4'>
                { renderCheckoutSummary() }
            </div>

        </div>
    )
}

export default CheckoutInfo