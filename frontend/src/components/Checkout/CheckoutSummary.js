import React from 'react'
import AmountItemStyle from './AmountItemStyle'

const CheckoutSummary = ({checkoutOrders}) => {
    
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

export default CheckoutSummary