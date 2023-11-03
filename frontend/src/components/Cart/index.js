import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ShopCartBox from './ShopCartBox';

const Cart = ({setOpenCart}) => {
    const { cart } = useSelector(state => state.user);
    const navigate = useNavigate();
    const cartLength = cart?.reduce((totalLength, shopCart) => totalLength + shopCart?.items?.length, 0);
    const subTotalPrice = cart?.reduce((subTotal, shopCart) => {
        let shopSubtotal = shopCart?.items?.reduce((sum, item) => {
            const itemPrice = item.product?.discountPrice ? item.product?.discountPrice : item.product?.originalPrice;
            return sum + item.qty * itemPrice;
        }, 0);
        return subTotal + shopSubtotal;
    }, 0);

    const handleSubmit = (e) => {
        setOpenCart(false);
        navigate('/account/checkout');
    }

    return (
        <div className="fixed top-0 left-0 w-full min-w-[360px] bg-[#0000004b] h-screen z-10">
            <div className="fixed top-0 right-0 h-full w-[90%] min-w-[300px] 500px:w-[350px] bg-[#f3f4f6] flex flex-col overflow-y-scroll justify-between shadow-sm">
                <div className="w-full h-full">
                    <div className="normalFlex w-full h-[65px] justify-between px-5 sticky top-0 ">
                        {/* Item length */}
                        <div className='normalFlex '>
                            <IoBagHandleOutline size={24} />
                            <h5 className="pl-2 text-[18px] font-[500]">购物车<span className='text-[16px]'>({cartLength})</span></h5>
                        </div>
                        <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpenCart(false)} />
                    </div>
                    { cartLength === 0 
                    ? <div className='w-full h-[calc(100%-65px)] flex items-center justify-center'>
                        <h5>购物车为空</h5>
                    </div>
                    : <>
                        <div className='w-full h-[calc(100%-65px-65px)] overflow-y-scroll'>
                            {/* cart Items */}
                            { cart?.map((shopCart, index) => <ShopCartBox shopCart={shopCart} key={index} />)}
                        </div>
                        {/* checkout buttons */}
                        <div className="px-5 h-[65px] bg-white normalFlex justify-between ">
                            <span className='text-[18px] font-[500]'>{`合计: ¥ ${subTotalPrice.toFixed(2)}`}</span>
                            <button onClick={handleSubmit} className={`h-[45px] normalFlex px-[20px] bg-[#e44343] rounded-[5px] text-[#fff] text-[18px] font-[600] cursor-pointer`}>
                                结算
                            </button>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart