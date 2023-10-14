import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useResendEmailMutation, useVerifyEmailMutation } from '../../redux/features/shopAuth/shopAuthApi';
import { IoWarningOutline } from 'react-icons/io5'
import CustomInput from '../../components/atoms/CustomInput';
import { toast } from 'react-toastify';
import { setShopLogin } from '../../redux/features/shopAuth/shopAuthSlice';
import { useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
    const { shop } = useSelector(state => state.shopAuth);
    const [otpCode, setOtpCode] = useState("");
    const [showErr, setShowErr] = useState(false);
    const [verifyEmail, {data, isLoading, isSuccess: isVerifySuccess, isError: isVerifyError, error: verificationError}] = useVerifyEmailMutation();
    const [resendEmail, {isSuccess: isResendSuccess, isError: isResendError, error: resendError}] = useResendEmailMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isResendSuccess) {
            toast.success('验证码发送成功，请查收');
        }
        if(isResendError) {
            toast.error(resendError?.data?.message);
        }
    }, [isResendSuccess, isResendError])

    useEffect(() => {
        if(isVerifySuccess) {
            dispatch(setShopLogin({
                shopToken: data.shopToken,
                shop: data.shop,
            }));
            toast.success("店铺邮箱验证成功，已成功登陆");
            navigate('/business');
        }
        if(isVerifyError) {
            setShowErr(true)
        }
    }, [isVerifySuccess, isVerifyError])
    
    useEffect(() => {
        if(showErr) {
            setShowErr(false);
        }
    }, [otpCode])

    const handleVerifyEmail = async () => {
        await verifyEmail({
            shopId: shop?._id, 
            otpCode
        })
    }

    const handleResendEmai = async () => {
        await resendEmail({
            shopId: shop?._id
        })
    }
    

    return (
        <div className='w-full h-screen'>
            <div className="min-h-[300px] flex flex-col justify-center py-10 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						邮箱验证
					</h2>
				</div>
                <div className="mt-8 px-4 mx-auto w-full max-w-[600px]">
                    <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
                        <p>为保证您的账户安全和正常使用，请尽快完成邮箱验证。验证码已发送至您的邮箱：{shop?.email}，请查收。</p>
                        
                        <div className='w-full my-8'>
                            <div className='w-[200px]'>
                                <CustomInput 
                                    label='请输入验证码' type='tel' id='otp' value={otpCode} setValue={setOtpCode}
                                />
                            </div>
                            {isVerifyError && showErr &&
                            <div className="error-msg normalFlex gap-2 mt-4 !text-[15px]">
                                <IoWarningOutline size={22} />抱歉，{verificationError?.data?.message}
                            </div> 
                            }
                        </div>

                        <button onClick={handleVerifyEmail} disabled={isLoading} className='w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-[16px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>
                            {isLoading ? '验证中...' :'提交' }
                        </button>
    
                        <div className="text-[15px] mt-8">
                            未收到验证码？
                            <button onClick={handleResendEmai} className='text-blue-600 hover:underline hover:underline-offset-2'>
                                重新发送
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailPage