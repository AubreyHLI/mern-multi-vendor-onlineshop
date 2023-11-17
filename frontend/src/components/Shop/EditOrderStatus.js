import React, { useEffect, useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../redux/features/shop/shopApi';
import { toast } from 'react-toastify';

const EditOrderStatus = ({setOpenForm, status, orderId}) => {
    const [newStatus, setNewStatus] = useState(status);
    const [updateStatus, {data, isLoading, isSuccess, isError, error}] = useUpdateOrderStatusMutation();

    useEffect(() => {
        if(isSuccess) {
            setOpenForm(false);
            toast.success('订单状态更新成功');
        }
        if(isError) {
            toast.error(error?.data?.message);
        }
    }, [isSuccess, isError])

    const statusOptions = [
        { value: "Processing", text: "订单待发货" },
        { value: "Shipped", text: "卖家已发货" },
        { value: "Shipping", text: "运输中" },
        { value: "Dispatching", text: "快递员派送中" },
        { value: "Delivered", text: "买家已签收" },
        { value: "Archived", text: "交易成功" },
    ];

    const refundOptions = [
        { value: "Processing refund", text: "退款处理中" },
        { value: "Refunded", text: "退款成功" },
        { value: "Cancelled", text: "交易关闭" },
    ];

    const currentIndex = statusOptions.findIndex( item => item.value === status);

    const currentRefundIndex = refundOptions.findIndex( item => item.value === status);


    const handleOrderUpdate = async () => {
        await updateStatus({
            status: newStatus,
            id: orderId,
        })
    }

    const handleRefundOrderUpdate = async () => {

    }

    return (
        <div className='w-full normalFlex justify-center gap-2 pr-3 pl-1'>
            { status !== "Processing refund" && status !== "Refunded" && status !== "Cancelled" &&
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="flex-1 max-w-[200px] border h-[35px] rounded-[5px] px-1 text-[15px]">
                { status === 'Processing' && statusOptions.map((option, index) => 
                <option value={option.value} key={index} disabled={index !== currentIndex + 1} className='text-[15px]'> 
                    {option.text} 
                </option> )}
                { status !== 'Processing' && statusOptions.map((option, index) => 
                <option value={option.value} key={index} disabled={index <= currentIndex} className='text-[15px]'> 
                    {option.text} 
                </option> )}
            </select>
            }

            { (status === "Processing refund" || status === "Refunded") && 
            <select value={status} onChange={(e) => setNewStatus(e.target.value)} className="w-[150px] border h-[35px] rounded-[5px] px-1">
                { refundOptions.map((option, index) => 
                <option value={option.value} key={index} disabled={index <= currentRefundIndex }> {option.text} </option> )}
            </select>
            }

            <div>
                <button onClick={status !== "Processing refund" ? handleOrderUpdate : handleRefundOrderUpdate} className="text-[13px] 800px:text-[14px] px-3 py-1 800px:px-4 800px:py-[6px] rounded-lg text-white bg-orange-400 mr-2 hover:opacity-90" >
                    { isLoading ? '保存中...' : '保存'}
                </button>
                <button className="text-[13px] 800px:text-[14px] px-3 py-1 800px:px-4 800px:py-[6px] rounded-lg bg-slate-200 hover:opacity-90" onClick={()=>setOpenForm(false)}>
                    取消
                </button>
            </div>
        </div>
    )
}

export default EditOrderStatus