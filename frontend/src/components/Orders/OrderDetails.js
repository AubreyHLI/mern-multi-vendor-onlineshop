import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { PiStorefront } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import AddToCartBtn from '../Cart/AddToCartBtn';
import OrderRefundModal from './OrderRefundModal';

const OrderDetails = ({shop, checkoutSummary, orderDetails, status, orderId}) => {
    const [openRefundModal, setOpenRefundModal] = useState(false);
    const [refundItem, setRefundItem] = useState({
        productId: '',
        name: '',
        image: '',
        price: '',
        qty: '',
        productStatus: ''
    })

    useEffect(() => {
        if(openRefundModal) {
            document.body.style.overflow = 'hidden';  // lock the scroll of home page
        } else {
            document.body.style.overflow = 'unset';  // unlock the scroll of home page
        }
    }, [openRefundModal]);
    
    const handleClickRefund = (item) => {
        setRefundItem({...item});
        setOpenRefundModal(true);
    }
    
    const handleClickComment = () => {}

    return (        
        <div className='mt-5 mx-2'>
            <Link to={`/shop/${shop?._id}`} className='normalFlex gap-[6px] font-[500] text-[14px] text-[#000000ab]'>
                <PiStorefront size={20}/>
                <h3>{shop?.name}</h3>
                <IoIosArrowForward />
            </Link>
            <div className='w-full mt-2'>
                { orderDetails?.map((item, index) => 
                <div className='w-full border-dotted border-b pt-1 pb-[10px]' key={index}>
                    <Link to={`/product/${item?.productId}`} className="flex items-center hover:opacity-80" >
                        <img src={item?.image} className="w-[60px] h-[60px] 600px:w-[80px] 600px:h-[80px] object-cover rounded-lg " alt=""/>
                        <div className="px-[5px] flex-1 flex justify-between w-full">
                            <div className='flex flex-col gap-1 w-full 800px:flex-1'>
                                <h1 className='line-clamp-1 text-[14px]'>{item?.name}</h1>
                                <div className='font-[400] text-[13px] text-[#00000082]'>
                                    <span className='800px:hidden'>¥{item?.price} * {item?.qty}</span>
                                    <span className='hidden 800px:block'>数量 x {item?.qty}</span>
                                </div>
                            </div>
                            <div className='min-w-fit 800px:flex-1'>
                                <div className='w-full flex justify-between'>
                                    <span className='hidden 800px:block text-[#00000082] text-[14px]'>单价: ¥ {item?.price.toFixed(2)}</span>
                                    <h4 className='min-w-fit text-[15px] 800px:text-[16px] font-[500]'>¥ {(item?.price * item?.qty).toFixed(2)}</h4>
                                </div>
                                {item?.productStatus === 'Refunded' &&
                                <div className='w-full text-right mt-1 text-[14px] text-[rgb(255,175,101)]'>
                                    <h4>退款成功</h4>
                                </div>}
                            </div>
                            
                        </div>
                    </Link>
                    <div className='normalFlex gap-2 -mt-2 justify-end text-[12px] 600px:text-[13px] text-[#000000ab]'>
                        <AddToCartBtn 
                            optionStyle='btnStyle' 
                            data={{ shopId: shop?._id, productId: item?.productId}}
                            >
                            加入购物车
                        </AddToCartBtn>
                        {(status === 'Shipped' || status === 'Shipping' || status === 'Dispatching' || status === 'Delivered') && 
                        <button onClick={() => handleClickRefund(item)} className='btnStyle'>
                            { item?.productStatus === 'Processing refund' ? '退款中' : '退款/售后' }
                        </button>}
                        {status === 'Archived' && <button className='btnStyle'>评价</button>}
                    </div>
                </div>
                )}
            </div>
            <div className='w-full max-w-[250px] ml-auto mr-0 my-3'>
                <div className='flex justify-between'>
                    <h3 className='text-[#848689] text-[14px] 800px:text-[15px]'>优惠：</h3>
                    <h3>-¥ {checkoutSummary?.discount?.toFixed(2)}</h3>
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

            { openRefundModal && 
            <OrderRefundModal 
                setOpenForm={setOpenRefundModal}
                heading='退换/售后'
                refundItem={refundItem}
                orderId={orderId}
            />}
        </div>
    )
}

export default OrderDetails