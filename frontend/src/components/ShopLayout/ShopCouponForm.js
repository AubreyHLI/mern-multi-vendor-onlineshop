import React, { useEffect, useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import * as yup from "yup";
import { RxCross1 } from 'react-icons/rx'
import { toast } from 'react-toastify';
import { dashDateFormat } from '../../helpers/dayjsHelper';
 
const ShopCouponForm = ({isEdit=false, heading, buttonText, submitHandler, formData, setFormData, setOpenForm}) => {
    const [today, setToday] = useState(null);
    const [minExpDate, setMinExpDate] = useState(null);

    useEffect(() => {
        if(!isEdit) {
            const now = new Date();
            setToday(dashDateFormat(now));
            setMinExpDate(dashDateFormat(now.setDate(now.getDate() + 3)));
        } else {
            setToday(formData?.beginsDate);
            let beginObj = new Date(formData?.beginsDate);
            setMinExpDate(dashDateFormat(beginObj.setDate(beginObj.getDate() + 3)));
        }        
    }, [])

    const handleBeginsDateChange = (e) => {
        let dateObj = new Date(e.target.value);
        dateObj.setDate(dateObj.getDate() + 3);
        setMinExpDate(dashDateFormat(dateObj));
        setFormData({
            ...formData,
            beginsDate: e.target.value,
        });
    }

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
            const couponInfo = {
                name: formData.name.trim(),
                code: formData.code.trim(),
                type: formData.type,
                lowerLimit: formData.lowerLimit,
                beginsDate: formData.beginsDate,
                expiresDate: formData.expiresDate,
            };
            switch (formData.type) {
                case 'fixedAmount':
                    couponInfo.discountPrice = formData.discountPrice;
                    break;
                case 'percentage':
                    couponInfo.discountPercentage = formData.discountPercentage;
                    break;
                default: break;
            }
            const validCoupon = await submitSchema.validate(couponInfo);
            await submitHandler(validCoupon);

        } catch (error) {
			toast.error(error.message);
		}
    }


    return (
        <ModalLayout setOpenForm={setOpenForm} optionStyle='600px:my-auto 600px:max-w-[700px] '>
            <div className='w-full flex items-center gap-4 mt-3 mb-1 600px:my-3'>
                <div onClick={() => setOpenForm(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
                    <RxCross1 size={20}/>
                </div>
                <h1 className='font-[500] text-[20px]'>{heading}</h1>
            </div>

            {/* Add Product Form */}
            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full px-2 py-2 flex flex-col gap-4 600px:gap-5">
                    <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row 600px:items-center '>
                        <label className='w-[98px]'>券名称</label>
                        <input type='text' name='name' value={formData.name} onChange={handleInputChange} maxLength={10} placeholder='请输入' className='input 600px:flex-1'/>
                    </div>

                    <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row 600px:items-center '>
                        <label className='w-[98px]'>优惠券代码</label>
                        <input type='text' name='code' value={formData.code} onChange={handleInputChange} className='input 600px:flex-1' maxLength={10} placeholder='由5到10位数字、英文组成'/>
                    </div>

                    <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row 600px:items-center'>
                        <label className='w-[98px]'>优惠类型</label>
                        <select className="input !px-1 600px:flex-1" name='type' value={formData.type} onChange={handleInputChange} >
                            <option value="Choose a brand">请选择优惠券类型</option>
                            <option value='fixedAmount' key={1}>满减券</option>
                            <option value='percentage' key={2}>折扣券</option>
                            {/* { categoriesData?.map(i => 
                            <option value={i.category} key={i.category}> {i.title} </option>
                            ) } */}
                        </select>
                    </div>

                    <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row 600px:items-center '>
                        <label className='w-[98px]'>面额门槛</label>
                        <div className='normalFlex gap-[6px] flex-1'>
                            <span>满 ¥</span>
                            <input type='number' name='lowerLimit' value={formData.lowerLimit} onChange={handleInputChange} className='input flex-1 mb-[6px] 600px:mr-[6px]'/>
                        </div>
                        { formData.type === 'fixedAmount' &&
                        <div className='normalFlex gap-[6px] flex-1'>
                            <span>减 ¥</span>
                            <input type='number' name='discountPrice' value={formData.discountPrice} onChange={handleInputChange} max={formData.lowerLimit} className='input flex-1'/>
                        </div>
                        }
                        { formData.type === 'percentage' &&
                        <div className='normalFlex gap-[6px] flex-1'>
                            <span>折扣: 减</span>
                            <input type='number' name='discountPercentage' value={formData.discountPercentage} onChange={handleInputChange} min={0} max={100} className='input flex-1'/>%
                        </div>
                        }
                    </div>

                    <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row 600px:items-center '>
                        <label className='w-[98px]'>使用时间</label>
                        <div className='normalFlex gap-[6px] flex-1'>
                            <input type='date' value={formData.beginsDate} name='beginsDate' onChange={handleBeginsDateChange} placeholder='' min={today} className='input flex-1'/>
                            <span>--</span>
                            <input type='date' value={formData.expiresDate} name='expiresDate' onChange={handleInputChange} placeholder='' min={minExpDate} className='input flex-1'/>
                        </div>
                    </div>


                    <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row 600px:items-center '>
                        <label className='w-[98px]'>发行量 (张)</label>
                        <input type='number' value={formData.stock} name='stock' onChange={handleInputChange} placeholder='需大于等于1000，不超过10万' className='input 600px:flex-1'/>
                    </div>

                    <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row pt-[2px]'>
                        <label className='w-[98px] 600px:pt-2'>每人限领 (张)</label>
                        <select className="input !px-1 600px:flex-1" name='type' value={formData.type} onChange={handleInputChange} >
                            <option value={1} key={1}>1</option>
                            <option value={2} key={2}>2</option>
                            <option value={3} key={3}>3</option>
                            <option value={4} key={4}>4</option>
                            <option value={5} key={5}>5</option>
                            <option value={0} key={0}>不限</option>
                        </select>
                    </div>

                    <button type="submit" className='w-[90%] h-11 my-3 mx-auto px-5 bg-[#78be20] text-white rounded-full font-[600] tracking-wider'>
                        { buttonText }
                    </button>

                </div>
            </form>
        </ModalLayout> 
    )
}

const submitSchema = yup.object().shape({
    expiresDate: yup.date().typeError('请填写失效日期').min(yup.ref('beginsDate'), '失效日期不能早于开始日期'),
    beginsDate: yup.date().typeError('请填写开始日期'),
    lowerLimit: yup.number().typeError('请填写最低消费金额'),
	discountPrice: yup.number().typeError('请填写折扣金额').lessThan(yup.ref('lowerLimit'),"折扣金额必须小于最低消费金额"),
    discountPercentage: yup.number().typeError('请填写折扣百分比').lessThan(100, "折扣百分比必须小于100%").moreThan(0, '折扣百分比必须大于0%'),
	type: yup.string().required("请选择优惠券类型"),
    code: yup.string().required("优惠券代码不能为空").matches(/^([0-9]|[A-Z])*$/, "优惠券代码只能由数字、大写字母组成").min(5, '优惠券代码不能少于5个字符').max(10, '优惠券代码不能少于10个字符'),
	name: yup.string().required("名称不能为空").max(30, '名称不能多于15个汉字 (30个字符)'),
});

export default ShopCouponForm