import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { RxCross1 } from 'react-icons/rx'
import { toast } from 'react-toastify';
import { useAddAddressMutation } from '../../redux/features/user/userApi';
import { Checkbox } from '@mui/material';
import ModalLayout from '../Layout/ModalLayout';

const submitSchema = yup.object().shape({
	address1: yup.string().required("请填写详细地址"),
	district: yup.string().required("请填写区或县"),
	city: yup.string().required("请填写城市"),
	province: yup.string().required("请填写省份"),
	phone: yup.string().required("请输入手机号码").matches(/^[0-9]+$/,"手机号码必须是纯数字"),
	recipient: yup.string().required("请输入收件人姓名"),
})


const NewAddressForm = ({setOpenAddForm}) => {
	const [recipient, setRecipient] = useState("");
	const [phone, setPhone] = useState();
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
	const [district, setDistrict] = useState("");
	const [address1, setAddress1] = useState("");
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

    const handleAddAddress = async (e) => {
        e.preventDefault();
		try{
			const validAddress = await submitSchema.validate({
				recipient:recipient.trim(), 
				phone: phone.trim(), 
				province: province.trim(), 
				city: city.trim(), 
				district: district.trim(), 
				address1: address1.trim()
			});
			await addAddress({...validAddress, isDefault: isDefault});
		} catch(error) {
			toast.error(error.message);
		} 
    };

  return (
	<ModalLayout optionStyle='500px:my-[50px] 500px:max-w-[700px]'>
		<div className='w-full flex items-center gap-4 mt-3 mb-1 500px:my-3'>
			<div onClick={() => setOpenAddForm(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
				<RxCross1 size={20}/>
			</div>
			<h1 className='font-[500] text-[20px]'>添加收货地址</h1>
		</div>

		{/* Add Address Form */}
		<form onSubmit={handleAddAddress} className="w-full">
			<div className="w-full px-2 py-2 flex flex-col gap-2 500px:gap-4">
				<div className='flex flex-col gap-1 500px:flex-row '>
					<label className='w-[80px] pt-[8px]'>收件人</label>
					<div className='flex-1'>
						<input type='text' value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder='名字' className='input'/>
					</div>
				</div>

				<div className='flex flex-col gap-1 500px:flex-row '>
					<label className='w-[80px] pt-[8px]'>手机号码</label>
					<div className='flex-1'>
						<input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='手机号' className='input'/>
					</div>
				</div>

				<div className='flex flex-col gap-1 500px:flex-row '>
					<label className='w-[80px] pt-[8px]'>所在地区</label>
					<div className='flex-1 normalFlex gap-2'>
						<input type='text' value={province} onChange={(e) => setProvince(e.target.value)} placeholder='省' className='input'/>
						<input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='市' className='input' />
						<input type='text' value={district} onChange={(e) => setDistrict(e.target.value)} placeholder='区/县' className='input' />
					</div>
				</div>

				<div className='flex flex-col gap-1 500px:flex-row pt-[2px]'>
					<label className='w-[80px] pt-[6px]'>详细地址</label>
					<div className='flex-1'>
						<textarea type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder='街道、小区楼栋/乡村名称、门牌号' 
						className='w-full border px-2 py-[6px] rounded-[5px] border-[#cccccc] h-[100px] resize-none' />
					</div>
				</div>

				<div className='normalFlex mt-2'>
					<Checkbox checked={isDefault} onChange={() => setIsDefault(!isDefault)} id='isDefault'/>
					<label htmlFor='isDefault'>设为默认收货地址</label>
				</div>

				<button type="submit" className='w-[90%] h-11 my-3 mx-auto px-5 bg-[#78be20] text-white rounded-full font-[600] tracking-wider'>
					{ isLoading ? '保存中...' : '保存' }
				</button>
			</div>
		</form>

	</ModalLayout>
  )
}

export default NewAddressForm