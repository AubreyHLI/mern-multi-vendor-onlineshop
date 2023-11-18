import React, { useEffect, useState } from 'react'
import { useUpdateAddressMutation } from '../../redux/features/user/userApi';
import { toast } from 'react-toastify';
import AddressForm from './AddressForm';


const EditAddressForm = ({address, setOpenEdit}) => {
	const [formData, setFormData] = useState({
		recipient: address?.recipient,
		phone: address?.phone,
		province: address?.province,
		city: address?.city,
		district: address?.district,
		address1: address?.address1
	});
	const [updateAddress, {isLoading, isSuccess, isError, error}] = useUpdateAddressMutation();

	useEffect(() => {
		if(isSuccess) {
			toast.success("地址信息修改成功");
			setOpenEdit(false);
		}
		if(isError) {
			toast.error(error?.data?.message);
		}
	},[isSuccess, isError])

	const handleEditAddress = async (validAddress) => {
		await updateAddress({
			address: validAddress, 
			addressId: address?._id
		});
	}

    return (
		<AddressForm 
			heading='编辑收货地址'
			formData={formData}
            setFormData={setFormData}
			setOpenForm={setOpenEdit}
			submitHandler={handleEditAddress}
			buttonText={ isLoading ? '保存中...' : '保存修改' }
		/>
	)
}

export default EditAddressForm