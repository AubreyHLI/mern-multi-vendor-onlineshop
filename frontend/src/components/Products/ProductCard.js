import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddToWishlistMutation } from "../../redux/features/user/userApi";
import { BsCartPlus } from "react-icons/bs";
import { PiStorefront } from "react-icons/pi";
import Ratings from "./Ratings";
import AddToCartBtn from "../Cart/AddToCartBtn";


const ProductCard = ({ data, isShopPage=false }) => {
    const [click, setClick] = useState(false);
    const { wishlist } = useSelector(state => state.user);
    const { token, user } = useSelector(state => state.auth);
    const [ addToWishlist ] = useAddToWishlistMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (wishlist && wishlist.find(item => item?._id === data?._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist.length]);


    const addToWishlistHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(token && user) {
            setClick(!click);
            await addToWishlist({productId: data?._id});
        } else {
            navigate('/login');
        }
     };

    const handleClickShop = e => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/shop/${data?.shop?._id}`)
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-sm px-3 py-2 600px:p-4 relative">
            <Link to={`/product/${data?._id}`} className="w-full h-full normalFlex gap-4 600px:flex-col 600px:gap-2 600px:items-start">
                <div className="w-[100px] 400px:w-[120px] 600px:w-full 600px:mx-auto">
                    <img className="w-full h-[100px] 400px:h-[120px] 600px:h-[170px] object-cover 600px:object-contain rounded-lg " alt="" src={data?.images && data?.images[0]?.url}/>
                </div>

                <div className="flex-1 600px:w-full 600px:flex 600px:flex-col">
                    <p className="font-[500] line-clamp-2 text-[14px] 600px:text-[16px] my-1 ">
                        { data?.name }
                    </p>

                    <div className="flex justify-between 600px:mt-auto">
                        <div>
                            <div className="normalFlex text-[13px]">
                                <Ratings ratings={data?.ratings} />
                                <span className="pl-2">{`( ${data?.reviews?.length} )`}</span>
                            </div>

                            <div className="normalFlex  my-1">
                                <h5 className='productDiscountPrice !text-[20px]'>
                                    ¥ { data?.discountPrice ? data?.discountPrice : data?.originalPrice}
                                </h5>
                                <h4 className='priceSm'>
                                    { data?.discountPrice ? "¥ " + data?.originalPrice : null }
                                </h4>
                            </div>
                        </div>
                        {/* side options */}
                        <div className="normalFlex 600px:hidden">
                            <AddToCartBtn 
                                data={{shopId: data?.shop?._id, productId: data?._id, qty: 1}} 
                                withAuth={true} 
                                optionStyle='bg-[#f1f0f0] rounded-full !p-2'
                                >
                                <BsCartPlus className="!text-[16px] " title="加入购物车" />
                            </AddToCartBtn>
                        </div>

                    </div>

                    <div className="flex items-center justify-between font-[400] text-[12px] 600px:text-[13px] text-[#a8a8a8]">
                        { !isShopPage &&
                        <h5 onClick={handleClickShop} className='cursor-pointer normalFlex gap-1 hover:text-[#68d284] hover:underline hover:underline-offset-4'>
                            <PiStorefront size={18}/>{data?.shop?.name}
                        </h5>
                        }
                        <span className="">
                            {data?.sold_out} 件已售
                        </span>
                    </div>
                </div>

                <div className="absolute hidden 600px:flex 600px:flex-col gap-5 right-4">
                    <div onClick={e => addToWishlistHandler(e)}>
                        { click 
                        ? <AiFillHeart className="!text-[20px]" title="取消收藏" color="#f93880" />
                        : <AiOutlineHeart className="!text-[20px]" title="加入收藏夹" color="#333" />
                        }
                    </div>
                    <AddToCartBtn data={{shopId: data?.shop?._id, productId: data?._id, qty: 1}} withAuth={true}>
                        <BsCartPlus className="!text-[20px] " title="加入购物车" />
                    </AddToCartBtn>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;