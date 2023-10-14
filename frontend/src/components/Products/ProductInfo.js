import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useAddToCartMutation, useAddToWishlistMutation } from '../../redux/features/user/userApi';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Counter from './Counter';


const ProductInfo = ({data}) => {
    const [click, setClick] = useState(false);
    const [count, setCount] = useState('1');
    const { token, user } = useSelector(state => state.auth);
    const { wishlist } = useSelector(state => state.user);
    const [ addToCart, {isSuccess: cartSuccess } ] = useAddToCartMutation();
    const [ addToWishlist ] = useAddToWishlistMutation();
    const navigate = useNavigate();
    const swiperRef = useRef();

    useEffect(() => {
        // initialize the state
        swiperRef.current.swiper.slideTo(0);
        setCount('1');
    }, [data?._id])
    
    useEffect(() => {
        if (wishlist && wishlist.find(item => item?._id === data?._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist, data?._id]);

    useEffect(() => {
        if(cartSuccess) {
            toast.success('成功加入购物车')
        }
    }, [cartSuccess])

    const addToWishlistHandler = async (data) => {
        if(token && user) {
            setClick(!click);
            await addToWishlist({productId: data?._id});
        } else {
            navigate('/login');
        }
     };

    const addToCartHandler = async () => {
        if(token && user) {
            if (data?.stock < 1) {
                toast.error("抱歉，商品已无库存:(");
            } else {
                await addToCart({productId: data?._id, qty: count})
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="w-full flex flex-col 800px:flex-row 800px:gap-10">
            {/* Images */}
            <div className="w-full h-[360px] 800px:w-[50%] 800px:max-w-[500px] mx-auto flex items-center gap-3">
                <Swiper 
                    pagination={{ clickable: true, }} 
                    lazy="true" 
                    modules={[Pagination]} 
                    className="w-full h-full"
                    ref={swiperRef}
                    >
                    { data?.images?.map((i, index) => 
                        <SwiperSlide key={index} className='h-full mb-auto'>
                            <div className='m-auto h-[325px] flex justify-center bg-white rounded-l shadow-sm'>
                                <img src={data?.images[index].url}  alt="" loading='lazy' className="h-full overflow-hidden object-cover 800px:object-contain" />
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            {/* Text */}
            <div className="w-full 800px:flex-1 -mt-2 800px:mt-0 flex flex-col gap-3">
                <div className="normalFlex justify-between 800px:max-w-[400px]">
                    <div>
                        <h4 className='productDiscountPrice'>
                            ¥{ data?.discountPrice ? data?.discountPrice : data?.originalPrice}
                        </h4>
                        <h3 className='price'>
                            { data?.discountPrice ? "¥ "+ data?.originalPrice : null }
                        </h3>
                    </div>
                    <div>
                        <span className="font-[400] text-[15px] text-[#a8a8a8]">
                            {data?.sold_out} 件已售
                        </span>
                    </div>
                </div>

                <h1 className='text-[22px] font-[500] text-[#333] 800px:text-[24px]'>
                    {data?.name}
                </h1>

                <div className='normalFlex w-full justify-between gap-[6%] 500px:gap-0 max-w-[560px] 800px:flex-col 800px:items-start 800px:gap-10'>
                    <Counter count={count} setCount={setCount} stock={data?.stock}/>
                    <div className='flex-1 normalFlex justify-between 500px:justify-evenly 800px:gap-10'>
                        <button onClick={() => addToCartHandler()} className='button2 text-[white] bg-[orange] normalFlex gap-x-2 justify-center !w-[130px] !text-[15px] 500px:!w-[180px] hover:opacity-[0.85] transition-opacity"'>
                            <BsCartPlus size={20} className="ml-1" />加入购物车 
                        </button>
                        <div>
                            {click 
                            ? <AiFillHeart size={26} className="cursor-pointer" onClick={() => addToWishlistHandler(data)} color="#78be20" title="取消收藏"/>
                            : <AiOutlineHeart size={26} className="cursor-pointer" onClick={() => addToWishlistHandler(data)} color="#333" title="加入收藏夹"/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo