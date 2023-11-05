import React from 'react'
import { IoBagHandleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import ShopCartBox from './ShopCartBox';

const Cart = () => {
    const { cart } = useSelector(state => state.user);
    const cartLength = cart?.reduce((totalLength, shopCart) => totalLength + shopCart?.items?.length, 0);
    const subTotalPrice = cart?.reduce((subTotal, shopCart) => {
        let shopSubtotal = shopCart?.items?.reduce((sum, item) => {
            const itemPrice = item.product?.discountPrice ? item.product?.discountPrice : item.product?.originalPrice;
            return sum + item.qty * itemPrice;
        }, 0);
        return subTotal + shopSubtotal;
    }, 0);

    return (
        <>
        {/* <div className="w-full pt-4 flex-1 h-[calc(100%-80px)] 800px:gap-5 800px:h-[calc(100%-70px-60px)] overflow-y-scrool"> */}
            <div className='section h-full pt-4 mb-[10px]'>
                <div className='normalFlex'>
                    <IoBagHandleOutline size={24} />
                    <h5 className="px-2 text-[20px] font-[500]">购物车<span className='text-[18px]'>({cartLength})</span></h5>
                </div>

                { cartLength === 0 ?
                <div className='w-full flex items-center justify-center'>
                    <h5>购物车为空</h5>
                </div>
                :
                <div className='w-full'>
                    {/* cart Items */}
                    { cart?.map((shopCart, index) => <ShopCartBox shopCart={shopCart} key={index} />)}
                </div>
                }
            </div>

            {/* checkout buttons */}
            <div className="sticky bottom-0 w-full h-[70px] min-h-[70px] pb-1 bg-[#f3f3f3] border-t border-t-2">
                <div className='section h-full normalFlex justify-end gap-6'>
                    <div className='font-[500] normalFlex gap-2'>
                        <span className='text-[14px] 600px:text-[15px]'>合计 (不含运费): </span>
                        <span className='text-[#d02222] text-[20px] min-w-fit 800px:text-[22px]'> ¥ {subTotalPrice.toFixed(2)}</span>
                   </div>
                    <Link to={'/account/checkout'} className={`button2 normalFlex justify-center !w-[100px] bg-[orange] text-[#fff] 600px:!w-[150px] 1000px:!w-[200px]`}>
                        结算
                    </Link>
                </div>
            </div>
        </>       
    )
}

export default Cart