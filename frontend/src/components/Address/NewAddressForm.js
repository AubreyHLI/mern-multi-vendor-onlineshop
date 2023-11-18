import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAddAddressMutation } from '../../redux/features/user/userApi';
import AddressForm from './AddressForm';

const NewAddressForm = ({setOpenAddForm}) => {
	const [formData, setFormData] = useState({
		recipient: "",
		phone: "",
		province: "",
		city: "",
		district: "",
		address1:""
	});
    const [isDefault, setIsDefault] = useState(false);
	const [addAddress, {isLoading, isSuccess, isError, error}] = useAddAddressMutation();

	useEffect(() => {
		if(isSuccess) {
			toast.success("收货地址添加成功");
			setOpenAddForm(false);
		}
		if(isError) {
			toast.error(error?.data?.message);
		}
	},[isSuccess, isError])

    const handleAddAddress = async (validAddress) => {
		await addAddress({
			...validAddress, 
			isDefault: isDefault
		});
    };

  	return (
		<AddressForm
			isAdd={true}
			heading='添加收货地址'
			formData={formData}
            setFormData={setFormData}
			setOpenForm={setOpenAddForm}
			submitHandler={handleAddAddress}
			buttonText={ isLoading ? '保存中...' : '保存' }
			isDefault={isDefault}
			setIsDefault={setIsDefault}
		/>
  )
}

export default NewAddressForm