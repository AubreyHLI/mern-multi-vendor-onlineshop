import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { IoStorefrontOutline } from 'react-icons/io5';
import CustomInput from '../atoms/CustomInput';
import { slashDateFormat } from '../../helpers/dayjsHelper';

const ShopAccountDetail = () => {
    const { shop } = useSelector(state => state.shopAuth);
    const { shopProducts } = useSelector(state => state.shop);
    // const [updateUserInfo, {isLoading, isSuccess, isError, error}] = useUpdateUserInfoMutation();
    const [name, setName] = useState(shop?.name);
    const [description, setDescription] = useState(shop?.description);
    const [avatar, setAvatar] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [avgRatings, setAvgRatings] = useState(0);
    const avatarFilePickerRef = useRef();

    useEffect(() => {
        let totalReviewNum = 0;
        let totalRatings = 0;
        for(const product of shopProducts) {
            totalReviewNum += product?.reviews?.length;
            totalRatings += product?.reviews?.reduce((acc, item) => acc + item?.rating, 0);
        }
        const averageRating = totalReviewNum > 0 ? totalRatings / totalReviewNum : 0;
        setAvgRatings(averageRating.toFixed(2));
    }, [])

    // useEffect(() => {
    //     if(isSuccess) {
    //         setIsEdit(false);
	// 		toast.success("个人信息更新成功!", {autoClose: 1000});
	// 	} 
	// 	if(isError) {
	// 		toast.error(error?.data?.message, {autoClose: 2000});
	// 	}
    // }, [isSuccess, isError])

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
        newFormData.append('description', description);
        if(avatar) {
            newFormData.append('avatar', avatar);
        }
        // await updateUserInfo(newFormData);
	}

    return (
        <div className='bg-white flex flex-col items-center justify-center w-full py-5 px-4 rounded-lg shadow-lg  800px:max-w-[800px] 800px:mx-auto'>
            <div className='flex gap-6'>
                <div className='flex flex-col'>
                    { avatar || shop?.avatar?.url 
                    ? <Avatar src={avatar ? URL.createObjectURL(avatar) : (shop?.avatar?.url) } alt='' sx={{ width: 120, height: 120 }} className='border-2 border-[#e5e7eb]' />
                    : <Avatar sx={{ width: 120, height: 120, bgcolor: '#cccccc' }}  className='border-2 border-[#e5e7eb]'><IoStorefrontOutline color='#fff' size={80}/></Avatar> 
                    }
                    <input type='file' name='picture' ref={avatarFilePickerRef} onChange={addUserAvatar} className='hidden'/>
                    <button onClick={clickUploadAvatar} className={`mt-2 py-1 px-3 text-[12px] text-white bg-[#7ecffb] hover:opacity-80 rounded-md ${!isEdit && 'invisible'}`}>
                        上传头像
                    </button>
                </div>
                
                <div className="flex flex-col text-[13px] 800px:text-[14px] justify-around pb-[26px]">
                    <div className="flex flex-col 600px:flex-row 600px:gap-2">
                        <h5>店铺评分:</h5>
                        <h4>{avgRatings}</h4>
                    </div>
                    <div className="flex flex-col 600px:flex-row 600px:gap-2">
                        <h5>商品总数:</h5>
                        <h4>{shopProducts?.length}</h4>
                    </div>
                    <div className="flex flex-col 600px:flex-row 600px:gap-2">
                        <h5>创建日期:</h5>
                        <h4>{slashDateFormat(shop?.createdAt)}</h4>
                    </div>   
                </div>
            </div>
            
            <div className="w-full mt-4">
                <form onSubmit={handleSubmit}>			
                    <div className="w-full flex flex-col gap-4 mx-auto pr-3 text-[14px]">
                        <CustomInput 
                            label='店铺名称' type='text' id='name' value={name} setValue={setName} isDisabled={!isEdit}
                        />
                        <CustomInput 
                            label='电子邮箱' type='email' id='email' value={shop?.email} isDisabled={true}
                        />
                        <div className="flex flex-col gap-[6px] w-full">
                            <label htmlFor='description' className='w-max'>店铺介绍</label>
                            <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} disabled={!isEdit} className='w-full border px-2 py-[6px] rounded-[5px] border-[#cccccc] !h-[120px] resize-none'/>
                        </div>
                        <div className="w-full ">
                            <div className={!isEdit ? 'hidden' : 'w-full'}>
                                <button type="submit" className='button2 bg-[green] text-[white]'>
                                    {/* {isLoading ? '保存中...' : '更新'} */}保存更新
                                </button>
                                <button onClick={() => setIsEdit(false)}>
                                    取消
                                </button>
                            </div>
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

export default ShopAccountDetail