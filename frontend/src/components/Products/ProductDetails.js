import React, { useState } from 'react'
import { Avatar } from '@mui/material';
import Ratings from './Ratings';
import { dotDateFormat } from '../../helpers/dayjsHelper';


const ProductDetails = ({data}) => {
    const [active, setActive] = useState(1);  

    return (
        <div className="bg-[#fff] px-3 800px:px-10 pt-2 pb-5 rounded mt-7 ">
            <div className="w-full flex justify-around border-b py-3">
                <h5 onClick={() => setActive(1)} className={`text-[#000] text-[18px] pt-1 pb-2 px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px] border-b border-b-[3px] ${active === 1 ? 'border-b-[crimson]' : 'border-b-transparent'}`}>
                    评价 <span className='text-[17px]'> ( {data?.reviews?.length} ) </span>
                </h5>
                <h5 onClick={() => setActive(2)} className={`text-[#000] text-[18px] pt-1 pb-2 px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px] border-b border-b-[3px] ${active === 2 ? 'border-b-[crimson]' : 'border-b-transparent'}`}>
                    商品详情
                </h5>
            </div>

            { active === 1 &&
            <div className="w-full flex flex-col items-center px-2 overflow-y-scroll">
                { data?.reviews?.map((item, index) => (
                    <div id={`review-${item?._id}`} className="w-full flex gap-3 border-b py-3" key={index}>
                        {item?.customer?.avatar?.url 
                        ? <Avatar src={item?.customer?.avatar?.url} alt='' />
                        : <Avatar>{item?.customer?.name.slice(0,1)}</Avatar>
                        }
                        <div className="flex flex-col flex-1 gap-1 -mt-1">
                            <div className="w-full flex items-center justify-between">
                                <h1 className="font-[500] ml-[2px] text-[14px]">{item?.customer?.name}</h1>
                                <div className='text-[13px] text-[#00000088]'>
                                    {dotDateFormat(item?.createdAt)}
                                </div>
                            </div>
                            <Ratings ratings={item?.rating} />
                            <p className='mt-[2px]'>{item?.comment === '' ? '此用户没有填写文本。': item?.comment}</p>
                        </div>
                    </div>
                ))}

                { data?.reviews?.length === 0 && 
                <h5 className='leading-8 py-5 whitespace-pre-line'>暂无评价</h5>}
            </div>
            }

            { active === 2 && 
            <p className="leading-8 py-5 whitespace-pre-line px-2">{data?.description}</p>
            }
        </div>
    );
}

export default ProductDetails