import React, { useEffect } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { BiPurchaseTag } from 'react-icons/bi';
import { useDeleteAddressMutation, useUpdateDefaultAddressMutation } from '../../redux/features/user/userApi';
import { toast } from 'react-toastify';

const AddressCard = ({data, isDefault, setOpenEdit, setEditData}) => {
	const [updateDefaultAddress, {isSuccess, isError}] = useUpdateDefaultAddressMutation(); 
	const [deleteAddress, {isSuccess: deleteSuccess, isError: deleteError }] = useDeleteAddressMutation();

	useEffect(() => {
		if(isSuccess) {
			toast.success('已更改默认地址')
		}
		if(isError) {
			toast.error('抱歉，默认地址更改失败')
		}
		
	}, [isSuccess, isError])

	useEffect(() => {
		if(deleteSuccess) {
			toast.success('该地址删除成功')
		}
		if(deleteError) {
			toast.error('抱歉，地址删除失败')
		}
	}, [deleteSuccess, deleteError])

	const handleChangeDefault = async () => {
		await updateDefaultAddress({newDefaultId: data?._id })
	}

	const handleEdit = () => {
		setEditData(data);
		setOpenEdit(true);
	}

	const handleDelete = async () => {
		const answer = window.confirm('确认删除该地址？');
        if(!answer) {
            return
        } else {
            await deleteAddress(data?._id);
        }
	}
	
	return (
		<div className='w-full 800px:w-[280px] h-[160px] 800px:h-[240px] border-2 rounded-lg flex flex-col shadow shadow-sm px-3 py-2 relative'>
			{ isDefault && 
			<div className='absolute right-2 text-[12px] bg-[#78be20] w-[50px] text-white text-center'>
				默认
			</div>}
			<div className='w-full flex flex-col gap-2 mt-0 mb-auto'>
				<h5 className='text-[17px] font-[600]'>{data?.recipient}</h5>
				<h6 className="text-[14px] 800px:text-[15px]">
					{data?.province} {data?.city} {data?.district} {data?.address1}
				</h6>
				<h6 className="text-[14px] 800px:text-[15px]">
					联系电话：{data?.phone}
				</h6>
			</div>
			<div className='text-[14px] 800px:text-[15px] flex gap-4 text-[#007185]'>
				<span onClick={handleDelete} className='normalFlex gap-1 cursor-pointer  hover:text-red-500'>
					<AiOutlineDelete />删除
				</span>
				<span onClick={handleEdit} className='normalFlex gap-1 cursor-pointer hover:text-[#78be20]'>
					<CiEdit size={17} />编辑
				</span>
				{ !isDefault &&
				<span onClick={handleChangeDefault} className='normalFlex  gap-[2px] ml-1 cursor-pointer hover:text-[#78be20]'>
					<BiPurchaseTag size={15}/>设为默认地址
				</span>}
			</div>		
		</div>
  	)
}

export default AddressCard