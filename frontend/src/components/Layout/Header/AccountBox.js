import React from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AccountBox = ({setOpenWishlist}) => {
    const { token, user } = useSelector(state => state.auth);
    const { cart, wishlist } = useSelector(state => state.user);
    const cartLength = cart?.reduce((totalLength, shopCart) => totalLength + shopCart?.items?.length, 0)

    if(!token || !user) {
        return (
            <div className="text-[#333333] hidden 600px:flex 600px:item-center">
                <div className="relative flex normalFlex gap-2 text-[#000000b7] font-[500]">
                    <CgProfile size={30} color="#333333" />
                    <Link to="/login" className="flex items-center text-[14px] cursor-pointer hover:underline">
                        <span>登陆</span>
                    </Link>
                    <span>|</span>
                    <Link to="/signup" className="flex items-center text-[14px] cursor-pointer hover:underline">
                        <span> 注册</span>
                    </Link>
                </div>
            </div>
        )
    }

    return (
       <div className="flex gap-[15px]">
            {/* favorite */}
            <div className='normalFlex'>
                <div className="relative cursor-pointer" onClick={() => setOpenWishlist(true)}>
                    <AiOutlineHeart size={30} color="#333333" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#78be20] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                        {wishlist?.length}
                    </span>
                </div>
            </div>
            {/* shopping cart */}
            <div className='normalFlex'>
                <Link to={'/cart'} className="relative cursor-pointer">
                    <AiOutlineShoppingCart size={30} color="#333333"/>
                    <span className="absolute right-0 top-0 rounded-full bg-[#78be20] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                        {cartLength}
                    </span>
                </Link>
            </div>
            {/* account */}
            <div className='hidden 600px:flex 600px:item-center'>
                <div className="relative flex cursor-pointer">
                    <Link to="/account">
                        <CgProfile size={30} color="#333333" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AccountBox