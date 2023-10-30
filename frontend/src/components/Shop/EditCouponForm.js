import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { dashDateFormat } from '../../helpers/dayjsHelper';
import { useUpdateCouponMutation } from '../../redux/features/shop/shopApi';
import ShopCouponForm from '../ShopLayout/ShopCouponForm';


const EditCouponForm = ({setOpenEdit, data}) => {
	const [formData, setFormData] = useState({
		name: data?.name,
        code: data?.code,
		type:  data?.type,
		discountPrice:  data?.discountPrice ? data?.discountPrice : '',
        discountPercentage:  data?.discountPercentage ? data?.discountPercentage : '',
        lowerLimit: data?.lowerLimit, 
        beginsDate: dashDateFormat(data?.beginsAt),
        expiresDate: dashDateFormat(data?.expiresAt)
	});

	const [updateCoupon, {isLoading, isSuccess, isError, error}] = useUpdateCouponMutation();

	useEffect(() => {
		if(isSuccess) {
			toast.success("优惠券信息更新成功");
			setOpenEdit(false);
		}
		if(isError) {
			toast.error(error?.data?.message);
		}
	},[isSuccess, isError, error]);


	const handleUpdateCoupon = async (couponObj) => {
		await updateCoupon({
			couponId: data?._id,
			coupon: couponObj
		})
	}

    return (
		<ShopCouponForm 
			isEdit={true}
            heading='更改优惠券信息'
            formData={formData}
            setFormData={setFormData}
            setOpenForm={setOpenEdit}
            submitHandler={handleUpdateCoupon}
			buttonText={isLoading ? '保存中...' : '保存'}
        />
    )
}

export default EditCouponForm