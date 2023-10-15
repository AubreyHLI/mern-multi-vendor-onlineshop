import React, { useEffect, useState } from 'react'
import ShopCouponForm from '../ShopLayout/ShopCouponForm';
import { useAddCouponMutation } from '../../redux/features/shop/shopApi';
import { toast } from 'react-toastify';

const AddCouponForm = ({setOpenAddForm}) => {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month < 10 ? '0'+ month : month;
    let day = today.getDate();
    day = day < 10 ? '0'+ day : day;
    
    const [formData, setFormData] = useState({
		name: `店铺优惠券${month}${day}`,
        code: '',
		type: '',
		discountPrice: '',
        discountPercentage: '',
        lowerLimit: '', 
        upperLimit: '',
        beginsDate: '',
        expiresDate: ''
	});
    const [addCoupon, {isLoading, isSuccess, isError, error}] = useAddCouponMutation();

    useEffect(() => {
		if(isSuccess) {
			toast.success("新优惠券已生成！");
			setOpenAddForm(false);
		}
		if(isError) {
			toast.error(error?.data?.message);
		}
	},[isSuccess, isError]);

    return (
        <ShopCouponForm 
            heading='创建新优惠券'
            today={`${year}-${month}-${day}`}
            formData={formData}
            setFormData={setFormData}
            setOpenForm={setOpenAddForm}
            submitHandler={addCoupon}
			buttonText={isLoading ? '创建中...' : '发布'}
        />
    )
}

export default AddCouponForm