import React, { useState } from 'react'
import AmountItemStyle from './AmountItemStyle';
import { PiStorefront } from "react-icons/pi";

const CartSummaryCard = ({shopCart, index, updateOrder}) => {
    const [couponCode, setCouponCode] = useState();

    const subTotalPrice = shopCart.reduce((total, item) => {
        const { product, qty } = item;
        const itemPrice = product?.discountPrice ? product?.discountPrice : product?.originalPrice;
        return itemPrice * qty + total;
    }, 0);
    // const discount = couponValid ? discountTotal : 0;
    const discount = 0;
    const totalPrice = subTotalPrice  - discount;


    const handleApplyCoupon = async (e) => {
        e.preventDefault();
    }


    const renderCartItem = (item) => {
        const {_id, qty, product} = item;
        const itemPrice = product?.discountPrice ? product?.discountPrice : product?.originalPrice;
        return (
            <div className="w-full flex items-center py-1 border-dotted border-b" key={_id}>
                <img src={product?.images[0]?.url} alt="" className="w-[40px] h-[40px] mr-2 rounded-[5px] object-cover"/>
                <div className="px-[5px] flex-1">
                    <div className='800px:hidden'>
                        <div className='flex justify-between w-full text-[14px]'>
                            <h1 className='line-clamp-1'>{product?.name}</h1>
                            <h4>¥{(itemPrice * qty).toFixed(2)}</h4>
                        </div>
                        <h4 className='pt-[4px] font-[400] text-[13px] text-[#00000082]'>
                            ¥{itemPrice} * {qty}
                        </h4>
                    </div>
                   <div className='hidden 800px:grid 800px:grid-cols-4'>
                        <h1 className='line-clamp-1 col-span-2'>{product?.name}</h1>
                        <h4 className='font-[400] text-[14px] text-[#00000082] text-center'>
                            ¥ {itemPrice} * {qty}
                        </h4>
                        <h4 className='text-end'>¥ {(itemPrice * qty).toFixed(2)}</h4>
                   </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-[#fff] rounded-md flex flex-col gap-3 px-5 py-4 mb-4">
            <div className='normalFlex gap-[6px] text-[14px] text-[#000000a4]'>
                <PiStorefront size={20}/>
                <h3>{shopCart[0]?.product?.shop?.name}</h3>
            </div>
            <div>
                { shopCart?.map(item => renderCartItem(item) )}
            </div>
            <div className='flex flex-col gap-3 700px:flex-row  700px:justify-between'>
                <div className='flex flex-col gap-2 700px:order-2 700px:w-[40%] 700px:max-w-[300px]'>
                    <AmountItemStyle title='店铺优惠' amount={discount?.toFixed(2)} withDiscount={true} />
                    <AmountItemStyle title='店铺合计' amount={totalPrice?.toFixed(2)} />
                </div> 
                <div className='normalFlex gap-2 700px:order-1'>
                    <input type="text" placeholder="店铺优惠券代码" value={couponCode} className='input'
                        onChange={(e) => setCouponCode(e.target.value)}/>
                    <button onClick={handleApplyCoupon} className='text-center text-[15px] border font-[600] w-[120px] h-[40px] py-[5px] border-[#53565a] text-[#53565a] hover:opacity-80 rounded-full'>
                        使用
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartSummaryCard