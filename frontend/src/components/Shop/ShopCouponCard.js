import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import EditCouponForm from './EditCouponForm';

const ShopCouponCard = ({data}) => {
	const [openEdit, setOpenEdit] = useState(false);

	const handleDeleteProduct  = async () => {
		const answer = window.confirm('确认删除该商品？');
        if(!answer) {
            return
        } else {
            // await deleteProduct(data?._id);
        }
	}

    return (
		<div className="w-full bg-white rounded-lg border shadow-sm px-3 pt-2 pb-1 flex flex-col justify-between relative">
            <div className="w-full flex flex-col gap-2">
                

                <div className="flex-1 600px:w-full">
                    <p className="font-[500] line-clamp-2 text-[14px] 600px:text-[16px] my-1 ">
                        { data?.name }
                    </p>


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
                <button onClick={() => setOpenEdit(true)} className='pt-2 normalFlex justify-center gap-1'>
                    <AiOutlineEdit size={16}/>更改
                </button>
                <button onClick={handleDeleteProduct} className='pt-2 normalFlex justify-center gap-1'>
                    <MdDeleteOutline size={16}/>删除
                </button>
            </div>

            {openEdit && <EditCouponForm setOpenEdit={setOpenEdit} data={data}/>}
        </div>
    )
}

export default ShopCouponCard