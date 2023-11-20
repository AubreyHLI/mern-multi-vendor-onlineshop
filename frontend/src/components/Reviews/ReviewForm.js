import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import ModalLayout from '../Layout/ModalLayout'
import { RxCross1 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { useCreateProductReviewMutation } from '../../redux/features/products/productsApi';
import { toast } from 'react-toastify';

const ReviewForm = ({isEdit, selectedItem, setOpenForm, orderId, hasList=false, setOpenList}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const { products } = useSelector(state => state.products);
    const { user } = useSelector(state => state.auth);
    const [createReview, {isLoading, isSuccess, isError, error}] = useCreateProductReviewMutation();

    useEffect(() => {
        if(isEdit) {
            const product = products.find(p => p?._id == selectedItem?.productId);
            const review = product.reviews.find(r => r?.orderId == orderId && r?.customer == user?._id);
            setComment(review?.comment);
            setRating(review?.rating);
        }
    }, [isEdit])

    useEffect(() => {
        if(isSuccess) {
            toast.success('评论发布成功');
            setOpenForm(false);
            if(hasList) setOpenList(false);
        }
        if(isError) {
            toast.error(error?.data?.message);
        }
    }, [isSuccess, isError])


    const handleAddReview = async () => {
        const validComment = comment.trim();
        const review = {
            productId: selectedItem?.productId,
            orderId,
            rating, 
            comment: validComment,
        };
        await createReview(review);
    }
    

    return (
        <ModalLayout optionStyle='600px:my-auto 600px:max-w-[700px]'>
             <div className='w-full flex items-center gap-4 my-3 relative'>
                <div onClick={() => setOpenForm(false)} className='absolute w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
                    <RxCross1 size={20}/>
                </div>
                <h1 className='font-[500] text-[20px] text-center w-full'>{isEdit? '修改评论' : '创建评论'}</h1>
            </div>

            <div className="w-full px-2">
                <h5 className="text-[18px] font-[500]">
                    商品：
                </h5>
                <div className="w-full flex gap-3 mt-2">
                    <img src={selectedItem?.image} alt="" className="w-[80px] h-[80px] object-cover shadow-md rounded-lg" />
                    <div className='flex flex-col gap-1'>
                        <div>{selectedItem?.name}</div>
                        <h4 className="text-[#00000091] text-[14px]">¥{selectedItem?.price?.toFixed(2)} x {selectedItem?.qty}</h4>
                        <h4 className='min-w-fit 800px:text-[17px] font-[500]'>¥ {(selectedItem?.price * selectedItem?.qty).toFixed(2)}</h4>
                    </div>
                </div>

                <h5 className="text-[18px] font-[500] mt-8">
                    商品评分：<span className="text-red-500">*</span>
                </h5>
                <div className='normalFlex gap-3 w-full pt-2'>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i 
                        ? <AiFillStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)} />
                        : <AiOutlineStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)}/>
                        )}
                    </div>
                    <span className='text-[rgb(255,153,51)] text-[15px]'>
                        {rating === 1 && '非常差'}
                        {rating === 2 && '差'}
                        {rating === 3 && '一般'}
                        {rating === 4 && '好'}
                        {rating === 5 && '非常好'}
                    </span>
                </div>
                

                <label className="block text-[18px] font-[500] mt-8" htmlFor='commet'>
                    文字评论：
                </label>
                <textarea name="comment" id="comment" cols="20" rows="5" value={comment} placeholder="展开说说对商品的想法吧！"
                    onChange={(e) => setComment(e.target.value)} className="mt-2 w-full border rounded-lg p-2 outline-none resize-none placeholder:text-[#00000052]" >
                </textarea>

                <div className='flex justify-center mt-2'>
                    {isEdit ?
                    <button onClick={handleAddReview} className='w-[90%] h-11 my-3 mx-auto px-5 bg-[#78be20] text-white rounded-full font-[600] tracking-wider'>
                       { isLoading ? '保存中...': '保存修改' }
                    </button>
                    :
                    <button onClick={handleAddReview} className='w-[90%] h-11 my-3 mx-auto px-5 bg-[#78be20] text-white rounded-full font-[600] tracking-wider'>
                       { isLoading ? '发布中...': '发布评论' }
                    </button>
                    }
                </div>
            </div>
        </ModalLayout>
    )
}

export default ReviewForm