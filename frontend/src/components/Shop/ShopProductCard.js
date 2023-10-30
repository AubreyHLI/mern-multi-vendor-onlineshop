import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { PiListMagnifyingGlass } from "react-icons/pi";
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { useDeleteProductMutation } from '../../redux/features/shop/shopApi';
import Ratings from '../Products/Ratings'
import EditProductForm from './EditProductForm';

const ShopProductCard = ({data}) => {
    const [deleteProduct, {isLoading, isSuccess, isError, error}] = useDeleteProductMutation();
    const [openEdit, setOpenEdit] = useState(false);
    
    useEffect(() => {
		if(isSuccess) {
			toast.success('该商品删除成功')
		}
		if(isError) {
			toast.error(`抱歉，${error?.data?.message}`)
		}
	}, [isSuccess, isError])

    const handleDeleteProduct = async () => {
        const answer = window.confirm('确认删除该商品？');
        if(!answer) {
            return
        } else {
            await deleteProduct(data?._id);
        }
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-sm px-3 pt-2 pb-1 600px:px-4 600px:pt-4 flex flex-col justify-between relative">
            <div className="w-full normalFlex gap-4 600px:flex-col 600px:gap-2 600px:items-start">
                <div className="w-[30%] max-w-[120px] 600px:w-full 600px:max-w-none 600px:mx-auto">
                    <img className="w-full h-[120px] 600px:h-[170px] object-contain rounded-lg " alt="" src={data?.images && data?.images[0]?.url}/>
                </div>

                <div className="flex-1 600px:w-full">
                    <p className="font-[500] line-clamp-2 text-[14px] 600px:text-[16px] my-1 ">
                        { data?.name }
                    </p>

                    <div className="normalFlex text-[13px]">
                        <Ratings ratings={data?.ratings} />
                        <span className="pl-2">{`( ${data?.reviews?.length} )`}</span>
                    </div>

                    <div className="normalFlex  my-1">
                        <h5 className='productDiscountPrice !text-[20px]'>
                            ¥ { data?.discountPrice ? data?.discountPrice : data?.originalPrice}
                        </h5>
                        <h4 className='priceSm'>
                            { data?.discountPrice ? "¥ " + data?.originalPrice : null }
                        </h4>
                    </div>

                    <div className="flex items-center justify-between font-[400] text-[13px]">
                        <span>
                            库存剩余：{data?.stock} 件
                        </span>
                        <span className="text-[#68d284]">
                            {data?.sold_out} 件已售
                        </span>
                    </div>
                </div>
            </div>
            <div className='w-full grid grid-cols-3 text-[13px] 600px:text-[14px] my-2 border-t !text-[#606060] select-none'>
                <Link to={`/product/${data?._id}`} className='pt-2 normalFlex justify-center gap-1'>
                    <PiListMagnifyingGlass size={18}/>详情
                </Link>
                <button onClick={() => setOpenEdit(true)} className='pt-2 normalFlex justify-center gap-1'>
                    <AiOutlineEdit size={16}/>编辑
                </button>
                <button onClick={handleDeleteProduct} className='pt-2 normalFlex justify-center gap-1'>
                    <MdDeleteOutline size={16}/>删除
                </button>
            </div>

            {openEdit && <EditProductForm setOpenEdit={setOpenEdit} data={data}/>}
        </div>
    )
}

export default ShopProductCard