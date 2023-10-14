import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserInfoMutation } from '../../redux/features/auth/authApi';
import { FaUserCircle } from 'react-icons/fa';
import { Avatar } from '@mui/material'
import CustomInput from '../atoms/CustomInput';

const AccountDetails = () => {
    const { user } = useSelector(state => state.auth);
    const [updateUserInfo, {isLoading, isSuccess, isError, error}] = useUpdateUserInfoMutation();
    const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [avatar, setAvatar] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const avatarFilePickerRef = useRef();

    useEffect(() => {
        if(isSuccess) {
            setIsEdit(false);
			toast.success("个人信息更新成功!", {autoClose: 1000});
		} 
		if(isError) {
			toast.error(error?.data?.message, {autoClose: 2000});
		}
    }, [isSuccess, isError])

    const addUserAvatar = async (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    }

    const clickUploadAvatar = e => {
        e.preventDefault();
        avatarFilePickerRef.current.click();
    }

    const handleSubmit = async (e) => {
		e.preventDefault();
        e.stopPropagation();

        const newFormData = new FormData();
        newFormData.append('name', name);
        newFormData.append('email', email);
        newFormData.append('phoneNumber', phoneNumber);
        if(avatar) {
            newFormData.append('avatar', avatar);
        }
        await updateUserInfo(newFormData);
	}

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <div className="pb-5 flex flex-col">
                { avatar || user?.avatar?.url 
                ? <Avatar src={avatar ? URL.createObjectURL(avatar) : (user?.avatar?.url) } alt='' sx={{ width: 100, height: 100 }} className='border-2 border-[#e5e7eb]' />
                : <FaUserCircle size={100} color='#b1b1b1'/> }
                <input type='file' name='picture' ref={avatarFilePickerRef} onChange={addUserAvatar} className='hidden'/>
                <button onClick={clickUploadAvatar} className={`mt-2 py-1 text-[14px] text-white bg-[#78be20] hover:opacity-80 rounded-md ${!isEdit && 'invisible'}`}>
                    更换头像
                </button>
            </div>
            
            <div className="w-full">
                <form onSubmit={handleSubmit}>			
                    <div className="w-full max-w-[700px] flex flex-col gap-6 mx-auto pr-3">
                        <CustomInput 
                            label='昵称' type='text' id='name' value={name} setValue={setName} isDisabled={!isEdit}
                        />
                        <CustomInput 
                            label='电子邮箱' type='email' id='email' value={email} setValue={setEmail} isDisabled={!isEdit}
                        />
                        <CustomInput 
                            label='联系电话' type='tel' id='phone' value={phoneNumber} setValue={setPhoneNumber} isDisabled={!isEdit}
                        /> 
                        <div className="w-full mt-8">
                            <button type="submit" className={`button2 bg-[green] text-[white] ${!isEdit && 'hidden'}`}>
                                {isLoading ? '保存中...' : '更新'}
                            </button>
                            <button type='button' onClick={() => setIsEdit(true)} className={`button2 bg-[orange] text-[white] ${isEdit && 'hidden'}`}>
                                编辑
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        );
}

export default AccountDetails