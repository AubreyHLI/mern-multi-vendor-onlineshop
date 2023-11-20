import React, { useEffect, useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { useRequestItemRefundMutation } from '../../redux/features/user/userApi'
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';

const OrderRefundModal = ({heading, setOpenForm, refundItem, orderId}) => {
    const [refundType, setRefundType] = useState("refund");
    const [requestItemRefund, {isLoading, isSuccess, isError, error}] = useRequestItemRefundMutation();

    useEffect(() => {
        if(isSuccess) {
            toast.success('售后申请已提交，请等待商家回复');
            setOpenForm(false);
        }
        if(isError) {
            toast.error(error?.data?.message);
        }
    },[isSuccess, isError])
   
    const handleSubmit = async() => {
        await requestItemRefund({
            orderId: orderId,
            productId: refundItem?.productId,
            refundType
        })
    }
    
    return (
        <ModalLayout optionStyle='600px:my-auto 600px:max-w-[700px] !bg-gray-50'>
            <div className='w-full flex items-center gap-4 my-3'>
                <div onClick={() => setOpenForm(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
                    <RxCross1 size={20}/>
                </div>
                <h1 className='font-[500] text-[20px]'>{heading}</h1>
            </div>
            
            <div className='w-full px-2 pb-5 '>
                <div className='normalFlex gap-2 600px:gap-3 px-1 mb-4'>
                    <img src={refundItem?.image} className="w-[70px] h-[70px] 600px:w-[80px] 600px:h-[80px] object-cover rounded-lg " alt=""/>
                    <div className='flex flex-col gap-1 w-full'>
                        <h1 className='line-clamp-1 text-[14px]'>{refundItem?.name}</h1>
                        <div className='font-[400] text-[13px] 600px:text-[14px] text-[#00000082] normalFlex gap-4'>
                            <span>数量 x {refundItem?.qty}</span>
                            <span>单价: ¥ {refundItem?.price.toFixed(2)}</span>
                        </div>
                        <h4 className='min-w-fit 600px:text-[17px] font-[500]'>¥ {(refundItem?.price * refundItem?.qty).toFixed(2)}</h4>
                    </div>
                </div>

                {refundItem?.productStatus === 'Processing refund' ? 
                <div className='w-full py-[50px] rounded-lg text-center text-[15px] 600px:text-[16px] text-[#333333] border border-dashed border-2 bg-[white]'>
                    已提交退款申请，请耐心等待商家回复
                </div> 
                :
                <div className='w-full py-4 px-2 rounded-lg bg-[white]'>
                    <div className='w-full flex flex-col gap-2 600px:flex-row 600px:items-center text-[15px] 600px:text-[16px]'>
                        <label className='font-[500]'>请选择售后类型：</label>
                        <select value={refundType} onChange={(e) => setRefundType(e.target.value)} className="w-[200px] border h-[30px] px-1">
                            <option value='refund' key={1}>仅退款</option>
                            <option value='refund and return' key={2}>退款退货</option>
                        </select>
                    </div>
                    <div className='mt-8 mb-2 w-full text-center'>
                        <button onClick={handleSubmit} className='button2  text-white bg-indigo-400 text-[15px]'>
                            {isLoading ? '正在提交...' : '提交申请' }
                        </button>
                    </div>
                </div> 
                }
            </div>
        </ModalLayout>
    )
}

export default OrderRefundModal