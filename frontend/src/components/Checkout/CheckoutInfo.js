import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AmountItemStyle from './AmountItemStyle';
import CartSummaryCard from './CartSummaryCard';

const CheckoutInfo = () => {
    const [checkoutOrders, setCheckoutOrders] = useState([])
    const [address, setAddress] = useState({
        recipient: '', phone: '', province: '',
        city: '', district: '', address1: '',
    });
    const { addressBook, cart } = useSelector(state => state.user);


    useEffect(() => {
        const shopItemsMap = new Map();
        for (const item of cart) {
            const shopId = item?.product?.shop?._id;
            if (!shopItemsMap.has(shopId)) {
                shopItemsMap.set(shopId, []);
            }
            shopItemsMap.get(shopId).push(item);
        }
        const shopOrders = [];
        for(const [shopId, items] of shopItemsMap) {
            const checkoutOrder = {
                shopCart: items,
                discount: 0,
                total: 0,
            };
            shopOrders.push(checkoutOrder);
        }
        console.log(shopOrders);
        setCheckoutOrders([...shopOrders]);
    }, [cart])


    const updateOrder = (index, newDiscount, newTotal) => {
        const updatedOrders = [...checkoutOrders];
        updatedOrders[index].discount = newDiscount;
        updatedOrders[index].total = newTotal;
        setCheckoutOrders(updatedOrders);
    }

   
    const subTotalPrice = cart.reduce((total, item) => {
        const { product, qty } = item;
        const itemPrice = product?.discountPrice ? product?.discountPrice : product?.originalPrice;
        return itemPrice * qty + total;
    }, 0);
    const shipping = subTotalPrice > 99 ? 0 : 10;
    // const discount = couponValid ? discountTotal : 0;
    const discount = 0;
    const totalPrice = subTotalPrice + shipping - discount;

    
    return (
        <div className='flex flex-col gap-4'>
            <h1 className="text-[22px] 800px:text-[26px]">确认订单</h1>

            {/* shipping info */}
            <div className='w-full 800px:flex-1 bg-[#fff] rounded-md p-5 pb-8'>
                <h5 className="text-[20px] font-[600]">收货地址</h5>
            </div>
            
            {/* cart info */}
            <div className="w-full">
                {checkoutOrders?.map((item, i) => 
                <CartSummaryCard shopCart={item?.shopCart} key={i} index={i} updateOrder={updateOrder} />)}
            </div>

            {/* order summary */}
            <div className='w-full bg-[#e8e8e8] px-5 py-4'>
                <div className='w-full 700px:w-[50%] 700px:max-w-[400px] ml-auto mr-0'>
                    <div></div>
                    <AmountItemStyle title='总商品金额' amount={subTotalPrice?.toFixed(2)} largeSize={true} />
                    <AmountItemStyle title='运费' amount={subTotalPrice?.toFixed(2)} largeSize={true} />
                    <AmountItemStyle title='总优惠' amount={discount?.toFixed(2)} withDiscount={true} largeSize={true} />
                    <div>
                        <AmountItemStyle title='应付总款' amount={totalPrice?.toFixed(2)} largeSize={true} />
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default CheckoutInfo