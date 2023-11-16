import React, { useEffect, useState } from 'react'
import ModalLayout from '../Layout/ModalLayout';
import { RxCross1, RxDotFilled } from 'react-icons/rx';
import { useGetOrderStatusHistoryQuery } from '../../redux/features/products/productsApi';
import { toast } from 'react-toastify';
import { calendarFormat } from '../../helpers/dayjsHelper';
import OrderStatus from './OrderStatus';

const ShippingTracker = ({detailId, orderData, setOpenForm, heading}) => {
    const { data, isLoading, isSuccess, isError, error} = useGetOrderStatusHistoryQuery(detailId);
    const [ statusHistory, setStatusHistory ] = useState([]);

    useEffect(() => {
        if(isError) {
            toast.error(error?.data?.message);
        }
        if(isSuccess) {
            setStatusHistory(data?.statusDetail?.statusHistory);
        }
    }, [isSuccess, isError])

    const renderStatusHistory = () => {
        
    }
    

    return (
        <ModalLayout optionStyle='600px:my-auto 600px:max-w-[700px] '>
            <div className='w-full flex items-center gap-4 mt-3 mb-1 600px:my-3'>
                <div onClick={() => setOpenForm(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
                    <RxCross1 size={20}/>
                </div>
                <h1 className='font-[500] text-[20px]'>{heading}</h1>
            </div>

            <div className='p-3'>
                {/* order info */}
                <div className='w-full normalFlex gap-3'>
                    <div className="min-w-fit relative">
                        <img className="w-[70px] h-[70px] 600px:w-[80px] 600px:h-[80px] object-cover rounded-lg " alt="" src={orderData?.image}/>
                        <span className='bg-[#00000043] w-full text-[12px] absolute bottom-0 text-center text-white rounded-b-lg'>
                            共 {orderData?.itemCount} 件
                        </span>
                    </div>
                    <div className='flex flex-col justify-between h-[70px] 600px:h-[80px]'>
                        <div className='text-[17px] 600px:text-[18px]'>
                            <OrderStatus status={orderData?.status} optionStyle=''/>
                        </div>
                        <div className='text-[13px] text-[#0000007b] 600px:text-[14px]'>
                            <h3>订单号：{orderData?._id}</h3>
                            <p className='line-clamp-1 '>{orderData?.itemNames}</p>
                        </div>
                    </div> 
                </div>

                {/* status history */}
                { isLoading ? 
                <div className='w-full my-[30px] text-center'>
                    <span>加载中...</span>
                </div>
                :<div className='flex flex-col mt-[30px]'>
                    {statusHistory?.map((item,index) =>
                        <div className='inline-flex pb-[20px]'>
                            <span>
                                <RxDotFilled size={20}/>
                            </span>
                            <div>
                                <div className='normalFlex gap-2'>
                                    <h3>{item?.status}</h3>
                                    <span>{calendarFormat(item?.updatedAt)}</span>
                                </div>
                                <p className='text-[12px] 600px:text-[13px] mt-1'>
                                    {item?.description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                }

           </div>
        </ModalLayout>
    )
}

export default ShippingTracker