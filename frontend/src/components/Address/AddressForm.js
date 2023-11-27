import React from 'react'
import * as yup from "yup";
import ModalLayout from '../Layout/ModalLayout';
import { RxCross1 } from 'react-icons/rx';
import { Checkbox } from '@mui/material';
import { toast } from 'react-toastify';

const AddressForm = ({isAdd=false, heading, submitHandler, formData, setFormData, buttonText, setOpenForm, isDefault, setIsDefault}) => {
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
		try{
            const addressInfo = {
                recipient: formData?.recipient.trim(), 
				phone: formData?.phone.trim(), 
				province: formData?.province.trim(), 
				city: formData?.city.trim(), 
				district: formData?.district.trim(), 
				address1: formData?.address1.trim()
            }
            const validAddress = await submitSchema.validate(addressInfo);
            await submitHandler(validAddress);

        } catch (error) {
			toast.error(error.message);
		}
	}

    return (
    <ModalLayout optionStyle='600px:my-[60px] 600px:max-w-[700px]' setOpenForm={setOpenForm}>
		<div className='w-full flex items-center gap-4 mt-3 mb-1 600px:my-3'>
			<div onClick={() => setOpenForm(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
				<RxCross1 size={20}/>
			</div>
			<h1 className='font-[500] text-[20px]'>{heading}</h1>
		</div>

		{/* Add Address Form */}
		<form onSubmit={handleSubmit} className="w-full">
			<div className="w-full px-2 py-2 flex flex-col gap-2 600px:gap-4">
				<div className='flex flex-col gap-1 600px:flex-row '>
					<label className='w-[80px] pt-[8px]'>收件人</label>
					<div className='flex-1'>
						<input type='text' name='recipient' value={formData?.recipient} onChange={handleInputChange} placeholder='名字' className='input'/>
					</div>
				</div>

				<div className='flex flex-col gap-1 600px:flex-row '>
					<label className='w-[80px] pt-[8px]'>手机号码</label>
					<div className='flex-1'>
						<input type='tel' name='phone' value={formData?.phone} onChange={handleInputChange} placeholder='手机号' className='input'/>
					</div>
				</div>

				<div className='flex flex-col gap-1 600px:flex-row '>
					<label className='w-[80px] pt-[8px]'>所在地区</label>
					<div className='flex-1 normalFlex gap-2'>
						<input type='text' name='province' value={formData?.province} onChange={handleInputChange} placeholder='省' className='input'/>
						<input type='text' name='city' value={formData?.city} onChange={handleInputChange} placeholder='市' className='input' />
						<input type='text' name='district' value={formData?.district} onChange={handleInputChange} placeholder='区/县' className='input' />
					</div>
				</div>

				<div className='flex flex-col gap-1 600px:flex-row pt-[2px]'>
					<label className='w-[80px] pt-[6px]'>详细地址</label>
					<div className='flex-1'>
						<textarea type="text" name='address1' value={formData?.address1} onChange={handleInputChange} placeholder='街道、小区楼栋/乡村名称、门牌号' 
						className='w-full border px-2 py-[6px] rounded-[5px] border-[#cccccc] h-[100px] resize-none' />
					</div>
				</div>

				{ isAdd && 
                <div className='normalFlex mt-2'>
					<Checkbox checked={isDefault} onChange={() => setIsDefault(!isDefault)} id='isDefault'/>
					<label htmlFor='isDefault'>设为默认收货地址</label>
				</div>}

				<button type="submit" className='w-[90%] h-11 my-3 mx-auto px-5 bg-[#78be20] text-white rounded-full font-[600] tracking-wider'>
					{ buttonText }
				</button>
			</div>
		</form>

	</ModalLayout>
    )
}


const submitSchema = yup.object().shape({
	address1: yup.string().required("请填写详细地址"),
	district: yup.string().required("请填写区或县"),
	city: yup.string().required("请填写城市"),
	province: yup.string().required("请填写省份"),
	phone: yup.string().required("请输入手机号码").matches(/^[0-9]+$/,"手机号码必须是纯数字"),
	recipient: yup.string().required("请输入收件人姓名"),
})

export default AddressForm