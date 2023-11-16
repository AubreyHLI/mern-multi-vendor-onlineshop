import React, { useState } from 'react'
import { Avatar } from '@mui/material';
import Ratings from './Ratings';


const ProductDetails = ({data}) => {
    const [active, setActive] = useState(1);  

    return (
        <div className="bg-[#fff] px-3 800px:px-10 py-2 rounded mt-7">
            <div className="w-full flex justify-around border-b pb-4 pt-5">
                <div className="relative">
                    <h5 onClick={() => setActive(1)} className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px] pb-1"}>
                        商品详情
                    </h5>
                    { active === 1 ? <div className='active_indicator' /> : null }
                </div>
                <div className="relative">
                    <h5 onClick={() => setActive(2)} className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}>
                        评论 <span> ( {data?.reviews?.length} ) </span>
                    </h5>
                    { active === 2 ? <div className='active_indicator' /> : null }
                </div>
            </div>

            { active === 1 && 
            <p className="text-[18px] leading-8 py-3 whitespace-pre-line">
                { data?.description }
            </p>
            }

            { active === 2 &&
            <div className="w-full flex flex-col leading-8 items-center py-3 overflow-y-scroll">
                { data?.reviews?.map((item, index) => (
                    <div className="w-full normalFlex my-2" key={index}>
                        <Avatar size={50}>{item.user.name.slice(0,1)}</Avatar>
                        <div className="pl-2 ">
                            <div className="w-full flex items-center">
                                <h1 className="font-[500] mr-3">{item.user.name}</h1>
                                <Ratings ratings={data?.ratings} />
                            </div>
                            <p>{item.comment}</p>
                        </div>
                    </div>
                ))}

                <div className="w-full flex justify-center">
                    { data?.reviews?.length === 0 && (
                        <h5>暂无评论</h5>
                    )}
                </div>
            </div>
            }
        </div>
    );
}

export default ProductDetails