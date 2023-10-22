import React, { useEffect, useState } from 'react'
import {timeFormat} from '../../helpers/dayjsHelper'
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { useDeleteCouponMutation } from '../../redux/features/shop/shopApi';
import { toast } from 'react-toastify';
import EditCouponForm from '../Shop/EditCouponForm';


const CouponCard = ({data, isSeller=false}) => {
    const [deleteCoupon, {isLoading, isSuccess, isError, error}] = useDeleteCouponMutation();
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
		if(isSuccess) {
			toast.success('优惠券删除成功')
		}
		if(isError) {
			toast.error(`抱歉，${error?.data?.message}`)
		}
	}, [isSuccess, isError])
    
    const handleDeleteCoupon = async () => {
        const answer = window.confirm('确认删除该优惠券？');
        if(!answer) {
            return
        } else {
            await deleteCoupon(data?._id);
        }
    }

    return (
        <div className='border flex flex-col justify-between'>
            <div className='normalFlex pt-4 pb-1 px-3 gap-4 600px:flex-col 600px:gap-1'>
                <div className='w-[55px] flex justify-center'>
                    {data?.type === 'fixedAmount' &&
                    <div className='font-[600] flex items-end gap-[2px] '>
                        <span className='leading-none text-[18px]'>¥</span>
                        <h2 className='text-[24px] leading-none'>{data?.discountPrice}</h2>
                    </div>}

                    {data?.type === 'percentage' &&
                    <div className='font-[600] flex items-end gap-[3px] '>
                        <h2 className='text-[24px] leading-[22px]'>{10 - data?.discountPercentage * 0.1}</h2>
                        <span className='leading-none text-[15px]'>折</span>
                    </div>}

                </div>

                <div className='flex flex-col gap-1'>
                    <div className='text-[15px] 600px:text-center 600px:mb-1 600px:text-[14px]'>
                        满{data?.lowerLimit}元可用
                    </div>
                    <div className='normalFlex gap-1 font-[600]'>
                        <span className='text-[15px]'>[兑换码]</span>
                        <h2>{data?.code}</h2>
                    </div>
                    <div className='text-[14px]'>
                        {data?.name}
                    </div>
                    <div className='text-[10px] 600px:text-[12px] normalFlex flex-wrap gap-1'>
                        <span>有效期:</span>
                        <div className='normalFlex gap-[2px]'>
                            <h2>{timeFormat(data?.beginsAt)}</h2>
                            <span>-</span>
                            <h2>{timeFormat(data?.expiresAt)}</h2>
                        </div>
                    </div>
                </div>
            
            </div>

            {isSeller &&
            <>
                <div className='w-full grid grid-cols-2 text-[13px] 600px:text-[14px] mt-2 border-t !text-[#606060] select-none'>
                    <button onClick={() => setOpenEdit(true)} className='py-2 normalFlex justify-center gap-1'>
                        <AiOutlineEdit size={16}/>编辑
                    </button>
                    <button onClick={handleDeleteCoupon} className='py-2 normalFlex justify-center gap-1'>
                        <MdDeleteOutline size={16}/>删除
                    </button>
                </div>

                {openEdit && <EditCouponForm setOpenEdit={setOpenEdit} data={data}/>}
            </>
            }
        </div>
    )
}

export default CouponCard