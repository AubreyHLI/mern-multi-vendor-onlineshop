import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { RxCross1 } from 'react-icons/rx'
import ModalLayout from '../Layout/ModalLayout'
import { useUpdateAddressMutation } from '../../redux/features/user/userApi';
import { toast } from 'react-toastify';

const submitSchema = yup.object().shape({
    recipient: yup.string().required("请输入收件人姓名"),
    phone: yup.string().required("请输入手机号码").matches(/^[0-9]+$/,"手机号码必须是纯数字"),
	province: yup.string().required("请填写省份"),
	city: yup.string().required("请填写城市"),
	district: yup.string().required("请填写区或县"),
	address1: yup.string().required("请填写详细地址"),
})

const EditAddressForm = ({address, setOpenEdit}) => {
	const [recipient, setRecipient] = useState(address?.recipient);
	const [phone, setPhone] = useState(address?.phone);
    const [province, setProvince] = useState(address?.province);
    const [city, setCity] = useState(address?.city);
	const [district, setDistrict] = useState(address?.district);
	const [address1, setAddress1] = useState(address?.address1);
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

	const handleEditAddress = async (e) => {
		e.preventDefault();
		try{
			const validAddress = await submitSchema.validate({recipient, phone, province, city, district, address1});
			await updateAddress({
				address: validAddress, 
				addressId: address?._id
			});
		} catch(error) {
			toast.error(error.message);
		} 
	}

    return (
	<ModalLayout optionStyle='600px:my-[60px] 600px:max-w-[700px]'>
		<div className='w-full flex items-center gap-4 mt-3 mb-1 600px:my-3'>
			<div onClick={() => setOpenEdit(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
				<RxCross1 size={20}/>
			</div>
			<h1 className='font-[500] text-[20px]'>编辑收货地址</h1>
		</div>

		{/* Add Address Form */}
		<form aria-required onSubmit={handleEditAddress} className="w-full">
			<div className="w-full px-2 py-2 flex flex-col gap-2 600px:gap-4">
				<div className='flex flex-col gap-[6px] 600px:flex-row '>
					<label className='w-[80px] pt-[8px]'>收件人</label>
					<div className='flex-1'>
						<input type='text' value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder='名字' className='input'/>
					</div>
				</div>

				<div className='flex flex-col gap-[6px] 600px:flex-row '>
					<label className='w-[80px] pt-[8px]'>手机号码</label>
					<div className='flex-1'>
						<input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='手机号' className='input'/>
					</div>
				</div>

				<div className='flex flex-col gap-[6px] 600px:flex-row '>
					<label className='w-[80px] pt-[8px]'>所在地区</label>
					<div className='flex-1 normalFlex gap-[6px]'>
						<input type='text' value={province} onChange={(e) => setProvince(e.target.value)} placeholder='省' className='input'/>
						<input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='市' className='input' />
						<input type='text' value={district} onChange={(e) => setDistrict(e.target.value)} placeholder='区/县' className='input' />
					</div>
				</div>

				<div className='flex flex-col gap-[6px] 600px:flex-row pt-[2px]'>
					<label className='w-[80px] pt-[6px]'>详细地址</label>
					<div className='flex-1'>
						<textarea type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder='街道、小区楼栋/乡村名称、门牌号' 
						className='w-full border px-2 py-[6px] rounded-[5px] border-[#cccccc] h-[100px] resize-none' />
					</div>
				</div>


				<button type="submit" className='w-[90%] h-11 my-3 mx-auto px-5 bg-[#78be20] text-white rounded-full font-[600] tracking-wider'>
					{ isLoading ? '保存中...' : '保存' }
				</button>
			</div>
		</form>

	</ModalLayout>
    )
}

export default EditAddressForm