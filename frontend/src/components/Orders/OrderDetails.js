import React from 'react'
import { Link } from 'react-router-dom';
import { PiStorefront } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';

const OrderDetails = ({shop, checkoutSummary, orderDetails}) => {

    return (        
        <div className='mt-5 mx-2'>
            <Link to={`/shop/${shop?._id}`} className='normalFlex gap-[6px] font-[500] text-[14px] text-[#000000ab]'>
                <PiStorefront size={20}/>
                <h3>{shop?.name}</h3>
                <IoIosArrowForward />
            </Link>
            <div className='w-full mt-2'>
                { orderDetails?.map((item, index) => 
                <Link to={`/product/${item?.productId}`} className="w-full flex items-center py-1 border-dotted border-b hover:opacity-80" key={index}>
                    <img src={item?.image} className="w-[60px] h-[60px] 600px:w-[80px] 600px:h-[80px] object-cover rounded-lg " alt=""/>
                    <div className="px-[5px] flex-1 flex justify-between w-full">
                        <div className='flex flex-col gap-1 w-full 800px:flex-1'>
                            <h1 className='line-clamp-1 text-[14px]'>{item?.name}</h1>
                            <div className='font-[400] text-[13px] text-[#00000082]'>
                                <span className='800px:hidden'>
                                    ¥{item?.price} * {item?.qty}
                                </span>
                                <span className='hidden 800px:block'>
                                    数量 x {item?.qty}
                                </span>
                            </div>
                        </div>
                        <div className='min-w-fit 800px:flex-1 flex justify-between'>
                            <span className='hidden 800px:block text-[#00000082] text-[14px]'>
                                单价: ¥ {item?.price.toFixed(2)}
                            </span>
                            <h4 className='min-w-fit text-[15px]'>
                                ¥ {(item?.price * item?.qty).toFixed(2)}
                            </h4>
                        </div>
                    </div>
                </Link>
                )}
            </div>
            <div className='w-full max-w-[250px] ml-auto mr-0 my-2'>
                <div className='flex justify-between'>
                    <h3 className='text-[#848689] text-[14px] 800px:text-[15px]'>优惠：</h3>
                    <h3>¥ {checkoutSummary?.discount?.toFixed(2)}</h3>
                </div>
                <div className='flex justify-between'>
                    <h3 className='text-[#848689] text-[14px] 800px:text-[15px]'>运费：</h3>
                    <h3>¥ {checkoutSummary?.shipping?.toFixed(2)}</h3>
                </div>
                <div className='flex items-end justify-between'>
                    <h3 className='text-[#848689] text-[14px] 800px:text-[15px]'>实付款：</h3>
                    <h3 className='text-[20px] 800px:text-[24px] text-[#ff5e00] font-[600]'>
                        ¥ {(checkoutSummary?.totalPrice + checkoutSummary?.shipping).toFixed(2)}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails