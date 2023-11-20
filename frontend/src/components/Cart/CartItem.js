import React, { useEffect, useState } from 'react';
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import { useRemoveFromCartMutation, useUpdateCartMutation } from '../../redux/features/user/userApi';
import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';


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
        const answer = window.confirm('确认移除该商品？');
        if(!answer) {
            return
        } else {
            await removeFromCart({shopId: shopId, itemId: productItem?._id});
        }
    }
  
    return (
        <div className="py-2 border-b border-b-gray-100">
            <div className="w-full flex gap-4 items-start">
                <Link to={`/product/${productItem?._id}`} className='w-[70px] h-[70px] 600px:w-[85px] 600px:h-[85px]'>
                    <img src={productItem?.images[0]?.url} alt="" className="object-cover w-full h-full rounded-[5px]"/>
                </Link>
                <div className="w-[calc(100%-70px)] flex flex-col 500px:gap-2">
                    <div className='flex justify-between w-full'>
                        <Link to={`/product/${productItem?._id}`}>
                            <h1 className='text-[14px] 800px:text-[15px]'>{productItem?.name}</h1>
                        </Link>
                        <span className='pl-3'>
                            <RxCross1 size={14} className="cursor-pointer text-[#00000082]" onClick={handleRemove} />
                        </span>
                    </div>
                    <div className='grid grid-cols-2 pb-[4px] 500px:grid-cols-3 items-end 500px:items-center'>
                        <h4 className="font-[400] text-[13px] text-[#00000082] justify-self-start 600px:text-[14px]">
                            ¥ {productPrice} x {value}
                        </h4>
                        <div className='w-[70px] justify-between items-center hidden 500px:flex '>
                            <button  onClick={() => decrement()} className={`${value < 2 ? 'bg-[#a7abb14f] text-[#7d879c]': 'bg-[#34b351] text-[#fff]'} w-[20px] h-[20px] normalFlex justify-center cursor-pointer`}>
                                <HiOutlineMinus size={13} />
                            </button>
                            <span className="text-[15px]">{value}</span>
                            <button onClick={() => increment()} className={`${value < productItem?.stock ? 'bg-[#34b351] text-[#fff]' : 'bg-[#a7abb14f] text-[#7d879c]'} w-[20px] h-[20px] normalFlex justify-center cursor-pointer`}>
                                <HiPlus size={13} />
                            </button>
                        </div>
                        <h4 className="font-[600] text-[#ff5e00] text-[16px] 600px:text-[17px]">
                            ¥ {totalPrice}
                        </h4>
                    </div>
                    <div className='w-[70px] flex items-center justify-between 500px:hidden'>
                        <button  onClick={() => decrement()} className={`${value < 2 ? 'bg-[#a7abb14f] text-[#7d879c]': 'bg-[#34b351] text-[#fff]'} w-[20px] h-[20px] normalFlex justify-center cursor-pointer`}>
                            <HiOutlineMinus size={13} />
                        </button>
                        <span className="text-[15px]">{value}</span>
                        <button onClick={() => increment()} className={`${value < productItem?.stock ? 'bg-[#34b351] text-[#fff]' : 'bg-[#a7abb14f] text-[#7d879c]'} w-[20px] h-[20px] normalFlex justify-center cursor-pointer`}>
                            <HiPlus size={13} />
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default CartItem
