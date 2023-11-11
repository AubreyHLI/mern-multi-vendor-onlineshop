import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../redux/features/auth/authApi';
import { toast } from 'react-toastify';
import { setLogin } from '../../redux/features/auth/authSlice';
import CustomInput from '../../components/atoms/CustomInput';
import PwInput from '../../components/atoms/PwInput';

const submitSchema = yup.object().shape({
    password: yup.string().required("密码不能为空").min(6, "密码不能少于6个字符").matches(/^[A-Za-z0-9]+$/, '密码只能由数字和字母组成'),
	email: yup.string().email("邮箱格式填写错误").required("请填写电子邮箱"),
})


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [loginUser, {data: responseData, isLoading, isSuccess, isError, error}] = useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    useEffect(() => {
        if(isSuccess) {
            dispatch(setLogin({
                token: responseData.token,
                user: responseData.user,
            }));
            toast.success('登录成功');
            navigate('/');
        } else if(isError) {
            toast.error(error?.data?.message);
        }
    }, [isSuccess, isError, error])

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
			const validUser = await submitSchema.validate({email, password});
			await loginUser(validUser);
		} catch(error) {
			toast.error(error.message);
		}
    }

    return (
    <div className='w-full h-screen'>
        <div className="min-h-[300px] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Link to='/'>Home</Link>
            <Link to='/business/login'>商家版入口</Link>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    密码登录 Mern 账号
                </h2>
            </div>
            <div className="mt-8 px-4 mx-auto w-full max-w-md">
                <form className="space-y-6 bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10" onSubmit={handleSubmit}>
                    <CustomInput 
                        label='电子邮箱' type='email' id='email' value={email} setValue={setEmail}
                    />
                    <PwInput 
                        label='密码' id='password' password={password} setPassword={setPassword} visible={visible} setVisible={setVisible} 
                    />
                    <button type="submit" className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-[16px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"> 
                        {isLoading ? '登陆中...': '登陆'}
                    </button>
                    <div className="normalFlex w-full text-[15px] justify-between">
                        <a href=".forgot-password" className="text-blue-600 hover:underline hover:underline-offset-2">找回密码</a>
                        <div className='normalFlex'>
                            <h4>新用户?</h4>
                            <Link to="/signup" className="text-blue-600 pl-2 hover:underline hover:underline-offset-2">立即注册</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default LoginPage