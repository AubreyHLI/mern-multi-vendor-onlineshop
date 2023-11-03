import React, { useEffect, useState } from 'react';
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { useRemoveFromCartMutation, useUpdateCartMutation } from '../../redux/features/user/userApi';


const CartItem = ({ data, shopId }) => {
    const [value, setValue] = useState(data?.qty);
    const [removeFromCart] = useRemoveFromCartMutation();
    const [updateCart] = useUpdateCartMutation();
    const productItem = data?.product;
    const productPrice = productItem?.discountPrice ? productItem?.discountPrice : productItem?.originalPrice;
    const totalPrice = (productPrice * value).toFixed(2);

    useEffect(() => {
        setValue(data?.qty);
    }, [productItem]);

    const increment = async () => {
        if (value < productItem?.stock) {
            setValue(value + 1);
            const updateCartData = { shopId: shopId, itemId: productItem?._id, qty: value + 1 };
            await updateCart(updateCartData);
        } else {
            toast.error("加购数量超过商品库存!");
        }
    };
  
    const decrement = async () => {
        if (value > 1) {
            setValue(value - 1);
            const updateCartData = { shopId: shopId, itemId: productItem?._id, qty: value - 1 };
            await updateCart(updateCartData);
        }         
    };

    const handleRemove = async () => {
        await removeFromCart({shopId: shopId, itemId: productItem?._id});
    }
  
    return (
        <div className="py-3">
            <div className="w-full flex items-center gap-2">
                <img src={productItem?.images[0]?.url} alt="" className="w-[50px] h-[50px] rounded-[5px] object-cover"/>
                <div className="pl-[5px] w-[calc(100%-50px)]">
                    <div className='flex justify-between w-full'>
                        <h1 className='text-[15px]'>{productItem?.name}</h1>
                        <span className='pl-3 pt-2'>
                            <RiDeleteBin5Line size={16} className="cursor-pointer" onClick={handleRemove} />
                        </span>
                    </div>
                    <div className='flex justify-between pt-[4px]'>
                        <h4 className="font-[400] text-[14px] text-[#00000082]">
                            ¥ {productPrice} * {value}
                        </h4>
                        <div className='normalFlex w-[70px] justify-between'>
                            <button  onClick={() => decrement()} className={`${value < 2 ? 'bg-[#a7abb14f] text-[#7d879c]': 'bg-[#34b351] text-[#fff]'} w-[20px] h-[20px] normalFlex justify-center cursor-pointer`}>
                                <HiOutlineMinus size={13} />
                            </button>
                            <span className="text-[15px]">{value}</span>
                            <button onClick={() => increment()} className={`${value < productItem?.stock ? 'bg-[#34b351] text-[#fff]' : 'bg-[#a7abb14f] text-[#7d879c]'} w-[20px] h-[20px] normalFlex justify-center cursor-pointer`}>
                                <HiPlus size={13} />
                            </button>
                        </div>
                    </div>
                    <h4 className="font-[600] text-[#d02222]">
                        ¥ {totalPrice}
                    </h4>
                </div>
                
            </div>
        </div>
    );
}

export default CartItem
