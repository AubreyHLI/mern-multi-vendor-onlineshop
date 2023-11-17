import React, { useEffect, useState } from 'react'
import { timeDateFormat } from '../../helpers/dayjsHelper'
import { PiStorefront } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import CustomPrice from '../atoms/CustomPrice';
import ShippingTracker from './ShippingTracker';
import OrderStatus from './OrderStatus';
import OrderAddressEdit from './OrderAddressEdit';
import { useCancelUserOrderMutation, useConfimReceiveOrderMutation } from '../../redux/features/user/userApi';
import { toast } from 'react-toastify';

const OrderCard = ({data}) => {
    const {shop, checkoutSummary, _id, orderDetails, status, createdAt, statusDetail} = data;
    const [openTracker, setOpenTracker] = useState(false);
    const [openAddressEdit, setOpenAddressEdit] = useState(false);
    const [itemCount, setItemCount] = useState(0);
    const [itemNames, setItemNames] = useState('');
    const [confimReceiveOrder, {isSuccess, isError, error}] = useConfimReceiveOrderMutation();
    const [cancelOrder, {isSuccess:cancelSuccess, isError:cancelError, error:cancelErr}] = useCancelUserOrderMutation();

    const navigate = useNavigate();

    useEffect(() => {
        const count = orderDetails?.reduce((acc, item) => acc + item?.qty, 0);
        setItemCount(count);
        const nameString = orderDetails?.reduce((acc, item) => {
            if(acc !== '') {
                acc += '、'
            }
            return acc + item?.name
        }, '');
        setItemNames(nameString);
    }, [orderDetails])

    useEffect(() => {
        if(openTracker || openAddressEdit) {
            document.body.style.overflow = 'hidden';  // lock the scroll of home page
        } else {
            document.body.style.overflow = 'unset';  // unlock the scroll of home page
        }
    }, [openTracker, openAddressEdit]);

    useEffect(() => {
        if(isError) {
            toast.error(error?.data?.message);
        }
        if(cancelError) {
            toast.error(cancelErr?.data?.message);
        }
    }, [isError, cancelError])


    const handleConfirmOrder = async () => {
        const answer = window.confirm('确认已收到商品，并无需要退换？');
        if(!answer) {
            return
        } else {
            await confimReceiveOrder(_id);
        }
    }

    const handleCancleOrder = async () => {
        const answer = window.confirm('确认取消该订单？');
        if(!answer) {
            return
        } else {
            await cancelOrder(_id);
        }
    }

    const btnStyle = 'px-2 py-[2px] border rounded-full 600px:px-3 border-[#00000054] hover:opacity-80';

    return (
        <div className='flex flex-col justify-between gap-2 shadow-sm bg-white text-[#000000ab] py-3 px-3 800px:px-5 '>
            <div className='flex flex-col gap-2'>
                <div className='w-full normalFlex justify-start gap-14 text-[13px] text-[#00000088]'>
                    <span>订单号：{_id}</span>
                    <span className='hidden 800px:block'>下单时间：{timeDateFormat(createdAt)}</span>
                </div>
                <div className='w-full normalFlex justify-between text-[13px] 800px:text-[14px]'>
                    <Link to={`/shop/${shop?._id}`} className='normalFlex gap-[6px] font-[500]'>
                        <PiStorefront size={20}/>
                        <h3>{shop?.name}</h3>
                        <IoIosArrowForward />
                    </Link>
                    <span className='col-span-2'>
                        <OrderStatus status={status} />
                    </span>
                </div>

                <div className='normalFlex justify-between gap-4'>
                    { orderDetails?.length === 1 && 
                    <div className='flex-1 normalFlex gap-2 justify-start 800px:gap-3'>
                        <div className="min-w-fit">
                            <img className="w-[60px] h-[60px] 600px:w-[80px] 600px:h-[80px] 1000px:w-[100px] 1000px:h-[100px] object-cover rounded-lg " alt="" src={orderDetails[0]?.image}/>
                        </div>
                        <p className='line-clamp-2 text-[13px] text-[#000000bd]'>
                            {orderDetails[0]?.name}
                        </p>
                    </div>
                    }
                    { orderDetails?.length > 1 && 
                    <div className='normalFlex gap-2 overflow-x-scroll no-scrollbar 800px:gap-3'>
                        {orderDetails?.map((item, index) => 
                        <div key={index} className="min-w-fit">
                            <img className="w-[60px] h-[60px] 600px:w-[80px] 600px:h-[80px] 1000px:w-[100px] 1000px:h-[100px] object-cover rounded-lg " alt="" src={item?.image}/>
                        </div>
                        )}                        
                    </div>
                    }
                    <div className='w-fit min-w-fit'>
                        <div className='flex flex-col items-end w-fit '>
                            <CustomPrice 
                                price={checkoutSummary?.totalPrice + checkoutSummary?.shipping} 
                                optionStyle='!text-[17px] 800px:!text-[18px] font-[500] text-black'
                            />
                            <span className='text-[12px] text-[#00000054] 800px:text-[13px]'>
                                共 {itemCount} 件
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='normalFlex gap-2 600px:gap-4 text-[12px] 600px:text-[13px] 1000px:text-[13.5px] py-2 justify-end'>
                <button className={btnStyle} onClick={() => navigate(`/account/order/${_id}`)}>订单详情</button>
                {status !== 'Cancelled' && <button className={btnStyle} onClick={() => setOpenTracker(true)}>物流查询</button>}
                {status === 'Processing' && <>
                <button className={btnStyle} onClick={() => setOpenAddressEdit(true)}>修改地址</button>
                <button className={btnStyle} onClick={handleCancleOrder}>取消订单</button>
                </>}
                {status === 'Archived' && <>
                <button className={`${btnStyle} !text-[#ff8800] !border-[#ffa36e]`}>评价</button>
                </>}
                {status === 'Cancelled' && <>
                <button className={btnStyle}>删除订单</button>
                <button className={`${btnStyle} !text-[#ff8800] !border-[#ffa36e]`}>加入购物车</button>
                </>}
                {status !== 'Processing' && status !== 'Cancelled' && status !== 'Archived' && 
                <button onClick={handleConfirmOrder} className={`${btnStyle} !text-[#ff8800] !border-[#ffa36e]`}>确认收货</button>}
            </div>

            {openTracker && 
            <ShippingTracker 
                detailId={statusDetail}
                orderData={{status, _id, itemCount, itemNames, image:orderDetails[0]?.image }} 
                setOpenForm={setOpenTracker} 
                heading="物流查询" 
            /> }

            {openAddressEdit && 
            <OrderAddressEdit 
                orderId={_id} 
                setOpenForm={setOpenAddressEdit} 
                heading="修改地址"
            /> }
        </div>
    )
}
    

export default OrderCard