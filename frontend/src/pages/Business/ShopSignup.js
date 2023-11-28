import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import CustomInput from '../../components/atoms/CustomInput'
import PwInput from '../../components/atoms/PwInput'
import { Link, useNavigate } from 'react-router-dom'
import { useSignupShopMutation } from '../../redux/features/shopAuth/shopAuthApi'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { setShop } from '../../redux/features/shopAuth/shopAuthSlice';
import ShopAuthFormLayout from '../../components/ShopLayout/ShopAuthFormLayout';

const submitSchema = yup.object().shape({
    description: yup.string().required("店铺介绍不能为空").max(200, "店铺介绍不能多于200字"),
    password: yup.string().required("密码不能为空").min(6, "密码不能少于6个字符").matches(/^[A-Za-z0-9]+$/, '密码只能由数字和字母组成'),
	email: yup.string().email("邮箱格式填写错误").required("请填写电子邮箱"),
	name: yup.string().required("请填写店铺名称"),
})


const ShopSignup = () => {
    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
	const [description, setDescription] = useState("");
    const [signupShop, {data, isLoading, isSuccess, isError, error}] = useSignupShopMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    useEffect(() => {
		if(isSuccess) {
			dispatch(setShop(data?.shop));
			navigate('/business/verify-email');
		}
       	if(isError) {
            toast.error(error?.data?.message);
        }
    }, [isSuccess, isError, error])

    const handleSubmit = async (e) => {
        e.preventDefault();
		try{
			const validShop = await submitSchema.validate({name, email, password, description});
			await signupShop(validShop);
		} catch(error) {
			toast.error(error.message);
		}
    };

    return (
		<ShopAuthFormLayout heading='欢迎注册 Mern 店铺账号' isSignup={true}>
			<div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<CustomInput 
						label='店铺名称' type='text' id='name' value={name} setValue={setName}
					/>
					<CustomInput 
						label='电子邮箱' type='email' id='email' value={email} setValue={setEmail}
					/>
					<PwInput 
						label='密码' id='password' password={password} setPassword={setPassword} visible={visible} setVisible={setVisible} 
					/>						
					<div className="flex flex-col gap-[6px] w-full">
						<label htmlFor='description' className='w-max'>店铺介绍</label>
						<textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} className='w-full border px-2 py-[6px] rounded-[5px] border-[#cccccc] !h-[100px] resize-none'/>
					</div>
					<div>
						<button type="submit" className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-[16px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
							{isLoading ? '注册中...': '注册'}
						</button>
					</div>
					<div className="normalFlex w-full text-[15px] justify-end">
						<h4>已有店铺账号?</h4>
						<Link to="/business/login" className="text-blue-600 pl-2 hover:underline hover:underline-offset-2">
							登陆现有账号
						</Link>
					</div>
				</form>
			</div>
		</ShopAuthFormLayout>
					
    )
}

export default ShopSignup