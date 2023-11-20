import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useUpdateOrderAddressMutation } from '../../redux/features/user/userApi'
import { toast } from 'react-toastify'
import AddressForm from '../Address/AddressForm'

const EditOrderAddress = ({setOpenAddressEdit, orderId}) => {
    const [formData, setFormData] = useState({
		recipient: "",
		phone: "",
		province: "",
		city: "",
		district: "",
		address1:""
	});
    const { orderHistory } = useSelector(state => state.user);
    const [updateOrderAddress, {isLoading, isSuccess, isError, error}] = useUpdateOrderAddressMutation();

    useEffect(() => {
        const order = orderHistory.find(item => item._id == orderId);
        setFormData(order?.shippingAddress);
    }, [orderId])

    useEffect(() => {
        if(isSuccess) {
            setOpenAddressEdit(false);
            toast.success('收货地址修改成功')
        }
        if(isError) {
            toast.error(error?.data?.message)
        }
    }, [isSuccess, isError])

    const handleSaveEdit = async (validAddress) => {
        await updateOrderAddress({
            id: orderId,
            address: validAddress
        })
	}

    return (
        <AddressForm 
			heading='修改收件人信息'
			formData={formData}
            setFormData={setFormData}
			setOpenForm={setOpenAddressEdit}
			submitHandler={handleSaveEdit}
			buttonText={ isLoading ? '修改中...' : '确认修改' }
		/>
    )
}

export default EditOrderAddress