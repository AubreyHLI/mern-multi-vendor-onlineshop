import React, { useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useDeleteCouponMutation } from '../../redux/features/shop/shopApi';
import EditCouponForm from './EditCouponForm';
import CouponCard from '../Coupons/CouponCard';


const ShopCouponCard = ({data}) => {
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
        <CouponCard data={data}>
            <div className='w-full grid grid-cols-2 text-[13px] bg-white !text-[#606060] select-none 800px:text-[14px] -ml-3 -mr-3 w-full' >
                <button onClick={() => setOpenEdit(true)} className='py-2 normalFlex justify-center gap-1'>
                    <AiOutlineEdit size={16}/>编辑
                </button>
                <button onClick={handleDeleteCoupon} className='py-2 normalFlex justify-center gap-1'>
                    <MdDeleteOutline size={16}/>删除
                </button>
            </div>

            {openEdit && <EditCouponForm setOpenEdit={setOpenEdit} data={data}/>}
        </CouponCard>
    )
}

export default ShopCouponCard