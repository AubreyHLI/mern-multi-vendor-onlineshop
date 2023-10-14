import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import CustomInput from '../../components/atoms/CustomInput'
import PwInput from '../../components/atoms/PwInput'
import { useSignupUserMutation } from '../../redux/features/auth/authApi';

const submitSchema = yup.object().shape({
    password: yup.string().required("密码不能为空").min(6, "密码不能少于6个字符").matches(/^[A-Za-z0-9]+$/, '密码只能由数字和字母组成'),
	email: yup.string().email("邮箱格式填写错误").required("请填写电子邮箱"),
	name: yup.string().required("请填写昵称"),
})

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [signupUser, {isLoading, isSuccess, isError, error}] = useSignupUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    useEffect(() => {
        if(isSuccess) {
            toast.success(`新账号注册成功，请登录`);
            navigate('/login');
        } else if(isError) {
            toast.error(error?.data?.message);
        }
    }, [isSuccess, isError, error])

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
			const validUser = await submitSchema.validate({name, email, password});
			await signupUser(validUser);
		} catch(error) {
			toast.error(error.message);
		}
    };

    return (
    <div className='w-full h-screen'>
        <div className="min-h-[300px] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    欢迎注册 Mern 账号
                </h2>
            </div>
            <div className="mt-8 px-4 mx-auto w-full max-w-md">
                <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <CustomInput 
                        label='昵称' type='text' id='name' value={name} setValue={setName}
                    />
                    <CustomInput 
                        label='电子邮箱' type='email' id='email' value={email} setValue={setEmail}
                    />
                    <PwInput 
                        label='密码' id='password' password={password} setPassword={setPassword} visible={visible} setVisible={setVisible} 
                    />
                    <div>
                        <button type="submit" className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-[16px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            {isLoading ? '注册中...': '注册'}
                        </button>
                    </div>
                    <div className="normalFlex w-full text-[15px] justify-end">
                        <h4>已有账号?</h4>
                        <Link to="/login" className="text-blue-600 pl-2 hover:underline hover:underline-offset-2">
                            登陆现有账号
                        </Link>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SignupPage