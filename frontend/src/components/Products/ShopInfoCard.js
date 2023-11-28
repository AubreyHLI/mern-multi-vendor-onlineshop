import React from 'react'
import { Avatar } from '@mui/material';
import { IoStorefrontOutline } from 'react-icons/io5';
import { slashDateFormat } from '../../helpers/dayjsHelper';

const ShopInfoCard = ({shopData, shopProductsCount, avgRatings}) => {

    return (
        <div className='bg-[#fff] border border-4 border-dotted px-4 py-5 flex flex-col gap-5 600px:flex-row 600px:justify-between 600px:gap-y-[10px] 600px:gap-x-0 800px:px-8'>
            <div className='w-full flex flex-col gap-4 600px:w-[65%] 1000px:w-[55%]'>
                <div className='w-full text-center'>
                    <div className="w-full flex justify-center mb-1">
                        { shopData?.avatar?.url 
                        ? <Avatar src={shopData?.avatar?.url} sx={{ width: 50, height: 50}}/> 
                        : <Avatar sx={{ width: 50, height: 50, color: '#53565a', bgcolor:'#ffffff', border:'1px solid #53565a' }} >
                            <IoStorefrontOutline size={30}/>
                        </Avatar>
                        }
                    </div>
                    <h3 className="text-center 1000px:text-[18px]">
                        {shopData?.name}
                    </h3>
                </div>
                
                <div className="flex gap-2 text-[14px] text-[#000000a6] 1000px:text-[15px]">
                    <h5 className="font-[600] min-w-fit">店铺简介:</h5>
                    <h4>{shopData?.description}</h4>
                </div>
            </div>

            <div className='flex justify-between text-[13px] 600px:w-[30%] 600px:flex-col 600px:justify-around 1000px:text-[14px] text-[#000000a6]'>
                <div className="flex flex-col 600px:flex-row 600px:gap-2">
                    <h5 className="font-[600]">店铺评分:</h5>
                    <h4>{avgRatings}</h4>
                </div>
                <div className="flex flex-col 600px:flex-row 600px:gap-2">
                    <h5 className="font-[600]">商品总数:</h5>
                    <h4>{shopProductsCount}</h4>
                </div>
                <div className="flex flex-col 600px:flex-row 600px:gap-2">
                    <h5 className="font-[600]">创建日期:</h5>
                    <h4>{slashDateFormat(shopData?.createdAt)}</h4>
                </div>   
            </div> 
       </div>
    );
}

export default ShopInfoCard