import React from 'react';
import { BsCartPlus } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRemoveFromWishlistMutation } from '../../redux/features/user/userApi';
import AddToCartBtn from '../Cart/AddToCartBtn';


const WishlistItem = ({ data}) => {
    const [ removeFromWishlist ] = useRemoveFromWishlistMutation();
    const productPrice = data?.discountPrice ? data?.discountPrice : data?.originalPrice;

    const handleRemoveWishlist = async () => {
        await removeFromWishlist({
            productId: data?._id
        })
    }

    return (
        <div className="border-b py-4 pl-2 pr-5">
            <div className="w-full flex items-center">
                <img src={data?.images[0]?.url} alt="" className="w-[50px] h-[50px] mx-2 rounded-[5px] object-cover"/>
                <div className="pl-[5px] w-full">
                    <div className='flex justify-between w-full'>
                        <h1 className='text-[15px] leading-'>{data?.name}</h1>
                        <span className='pl-3 pt-2'>
                            <RiDeleteBin5Line size={16} className="cursor-pointer" onClick={handleRemoveWishlist} />
                        </span>
                    </div>
                    <div className='normalFlex pt-[8px] justify-between'>
                        <h4 className="font-[600] text-[#ff5e00]">
                            ¥ {productPrice}
                        </h4>
                        <AddToCartBtn
                            data={{shopId: data?.shop, productId: data?._id, qty: 1}}
                            optionStyle='normalFlex gap-x-2 py-1 px-3 rounded-[10px] bg-lime-400 text-sm'
                            withAuth={false}
                        >
                            <BsCartPlus size={18} className="cursor-pointer"/>加入购物车
                        </AddToCartBtn>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default WishlistItem