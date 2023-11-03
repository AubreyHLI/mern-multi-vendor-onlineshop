import React from 'react'
import AmountItemStyle from './AmountItemStyle'
import { useSelector } from 'react-redux';

const CheckoutSummary = () => {
    const { cart } = useSelector(state => state.user);
    
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
        <div className='w-full 700px:w-[50%] 700px:max-w-[400px] ml-auto mr-0'>
            <AmountItemStyle title='总商品金额' amount={subTotalPrice?.toFixed(2)} largeSize={true} />
            <AmountItemStyle title='运费' amount={subTotalPrice?.toFixed(2)} largeSize={true} />
            <AmountItemStyle title='总优惠' amount={discount?.toFixed(2)} withDiscount={true} largeSize={true} />
            <div>
                <AmountItemStyle title='应付总款' amount={totalPrice?.toFixed(2)} largeSize={true} />
            </div>
        </div>
    )
}

export default CheckoutSummary