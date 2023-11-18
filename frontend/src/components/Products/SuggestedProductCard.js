import React from 'react'
import { Link } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import AddToCartBtn from '../Cart/AddToCartBtn';

const SuggestedProductCard = ({data}) => {

    return (
        <div className="w-full bg-white rounded-lg shadow-sm px-3 py-2 600px:p-4 relative">
            <Link to={`/product/${data?._id}`} className='w-full flex flex-col gap-2'>
                <div className="w-[100px] 400px:w-[120px] 600px:w-[150px] mx-auto">
                    <img className="w-full h-[100px] 600px:h-[120px] 800px:h-[150px] object-cover  rounded-lg " alt="" src={data?.images && data?.images[0]?.url}/>
                </div>

                <div className="w-full flex-1 flex flex-col justify-between">
                    <p className="font-[500] line-clamp-2 text-[14px] 600px:text-[16px] my-1 ">
                        { data?.name }
                    </p>

                    <div className="flex justify-between">
                        <div className="normalFlex my-1">
                            <h5 className='productDiscountPrice !text-[20px]'>
                                ¥ { data?.discountPrice ? data?.discountPrice : data?.originalPrice}
                            </h5>
                            <h4 className='priceSm'>
                                { data?.discountPrice ? "¥ " + data?.originalPrice : null }
                            </h4>
                        </div>
                        {/* side options */}
                        <div className="normalFlex">
                            <AddToCartBtn
                                data={{shopId: data?.shop?._id, productId: data?._id, qty: 1}}
                                withAuth={true}
                                optionStyle='bg-[#f1f0f0] rounded-full !p-2'
                            >
                                <BsCartPlus className="!text-[16px] " title="加入购物车" />
                            </AddToCartBtn>
                        </div>

                    </div>
                </div>
            </Link>
        </div>
    );
}

export default SuggestedProductCard