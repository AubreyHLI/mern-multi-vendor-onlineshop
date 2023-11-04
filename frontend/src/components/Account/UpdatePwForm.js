import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import PwInput from '../atoms/PwInput';
import { useUpdateUserPwMutation } from '../../redux/features/auth/authApi';
import { toast } from 'react-toastify';

const submitSchema = yup.object().shape({
    confirmPassword: yup.string().required("确认密码: 不能为空").oneOf([yup.ref('newPassword'), null], '确认密码: 与新密码不一致'),
    newPassword: yup.string().required("新密码: 不能为空").min(6, "新密码: 不能少于6个字符").matches(/^[A-Za-z0-9]+$/, '新密码: 只能由数字和字母组成'),
    oldPassword: yup.string().required("原密码: 不能为空"),
})

const UpdatePwForm = () => {
    const [oldPassword, setOldPassword] = useState("");
	const [visible1, setVisible1] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [visible2, setVisible2] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [visible3, setVisible3] = useState(false);
    const [updateUserPw, {isLoading, isSuccess, isError, error}] = useUpdateUserPwMutation();

    useEffect(() => {
        if(isSuccess) {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
			toast.success("密码修改成功");
		}
		if(isError) {
			toast.error(error?.data?.message);
		}
    },[isSuccess, isError])

    const passwordChangeHandler = async (e) => {
        e.preventDefault();
        try{
			const validPw = await submitSchema.validate({oldPassword, newPassword, confirmPassword});
            await updateUserPw(validPw);
		} catch(error) {
			toast.error(error.message);
		} 
    }

    return (
        <form onSubmit={passwordChangeHandler} className="flex flex-col items-center gap-6 w-full max-w-[600px] mx-auto mt-[30px]" >
            <PwInput label='原密码' id='oldPw'
                password={oldPassword} setPassword={setOldPassword}
                visible={visible1} setVisible={setVisible1}
            />
            <PwInput label='新密码' id='newPw'
                password={newPassword} setPassword={setNewPassword}
                visible={visible2} setVisible={setVisible2}
            />

            <PwInput label='确认新密码' id='confirmPw'
                password={confirmPassword} setPassword={setConfirmPassword}
                visible={visible3} setVisible={setVisible3}
            />
            
            <button type="submit" className='button2 bg-[green] text-[white] mt-8'>
                { isLoading ? '保存中...' : '保存' }
            </button>
        </form>
    )
}

export default UpdatePwForm