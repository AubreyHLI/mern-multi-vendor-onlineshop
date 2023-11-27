import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { PiStorefront } from 'react-icons/pi'
import { IoIosArrowForward } from 'react-icons/io'
import { useSelector } from 'react-redux'
import ModalLayout from '../Layout/ModalLayout'
import ReviewForm from './ReviewForm'

const ReviewWaitList = ({setOpenList, heading, shop, orderId }) => {
    const [reviewItems, setReviewItems] = useState([]);
    const [openReviewForm, setOpenReviewForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const { orderHistory } = useSelector(state => state.user);
    
    useEffect(() => {
        const order = orderHistory?.find(order => order?._id === orderId);
        const reviewOrds = order?.orderDetails?.filter(item => item?.productStatus === 'Shipped');
        setReviewItems([...reviewOrds])
    }, [])

    const handleClick = (item, isedit) => {
        setSelectedItem({...item});
        setIsEdit(isedit);
        setOpenReviewForm(true);
    }

    return (
         <ModalLayout setOpenForm={setOpenList} optionStyle='600px:my-auto 600px:max-w-[600px]'>
            <div className='w-full flex items-center gap-4 my-3'>
                <div onClick={() => setOpenList(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
                    <RxCross1 size={20}/>
                </div>
                <h1 className='font-[500] text-[20px]'>{heading}</h1>
            </div>

            <div className='px-2 mb-2 600px:min-h-[300px]'>
                <Link to={`/shop/${shop?._id}`} className='normalFlex gap-[6px] font-[500] text-[14px] text-[#000000ab]'>
                    <PiStorefront size={20}/>
                    <h3>{shop?.name}</h3>
                    <IoIosArrowForward />
                </Link>
                <div className='w-full mt-2'>
                    { reviewItems?.map((item, index) => 
                    <div className='w-full border-dotted border-b pt-1 pb-[10px] flex items-center gap-2' key={index}>
                        <img src={item?.image} className="w-[80px] h-[80px] object-cover rounded-lg " alt=""/>
                        <div className="px-[5px] flex w-full h-[80px] gap-3">
                            <div className='flex-1'>
                                <h1 className='line-clamp-2 text-[14px]'>{item?.name}</h1>
                                <span className='text-[13px] text-[#00000082]'>¥{item?.price} x {item?.qty}</span>
                                <h4 className='min-w-fit text-[15px] 800px:text-[16px] font-[500]'>¥ {(item?.price * item?.qty).toFixed(2)}</h4>
                            </div>
                            <div className='normalFlex gap-2 justify-end text-[12px] 600px:text-[13px] text-[#000000ab] w-fit min-w-fit'>
                                { item?.isReviewed ? 
                                <button onClick={() => handleClick(item, true)} className='btnStyle'>
                                    已评价，修改评价
                                </button> 
                                :<button onClick={() => handleClick(item, false)} className='btnStyle'>
                                    写评价
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>

            {openReviewForm && 
            <ReviewForm 
                selectedItem={selectedItem}
                orderId={orderId}
                isEdit={isEdit}
                setOpenForm={setOpenReviewForm}
                setOpenList={setOpenList}
                hasList={true}
            />}

        </ModalLayout>
    )
}

export default ReviewWaitList