import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = ({setOpenCart}) => {
    const { cart } = useSelector(state => state.user);
    const navigate = useNavigate();

    const subTotalPrice = cart.reduce((total, item) => {
            const itemPrice = item.product?.discountPrice ? item.product?.discountPrice : item.product?.originalPrice;
            return total + item?.qty * itemPrice;
        }, 0
    );

    const handleSubmit = (e) => {
        setOpenCart(false);
        navigate('/account/checkout');
    }

    return (
        <div className="fixed top-0 left-0 w-full min-w-[360px] bg-[#0000004b] h-screen z-10">
            <div className="fixed top-0 right-0 h-full w-[90%] min-w-[300px] 500px:w-[350px] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
                <div className="w-full h-full">
                    <div className="normalFlex w-full h-[80px] justify-between px-5 sticky top-0 bg-white">
                        {/* Item length */}
                        <div className='normalFlex'>
                            <IoBagHandleOutline size={24} />
                            <h5 className="pl-2 text-[18px] font-[500]">购物车<span className='text-[16px]'>({cart?.length})</span></h5>
                        </div>
                        <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpenCart(false)} />
                    </div>
                    { cart?.length === 0 
                    ? <div className='cart_content flex items-center justify-center'>
                        <h5>购物车为空</h5>
                    </div>
                    : <>
                        <div className='cart_content'>
                            {/* cart Items */}
                            <div className="w-full border-t">
                                { cart?.map((item, index) => <CartItem key={index} data={item} /> )}
                            </div>
                        </div>
                        {/* checkout buttons */}
                        <div className="px-5 mb-3 h-[80px] sticky bottom-0 bg-white normalFlex justify-between ">
                            <span className='text-[18px] font-[500]'>{`合计: ¥${subTotalPrice.toFixed(2)}`}</span>
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