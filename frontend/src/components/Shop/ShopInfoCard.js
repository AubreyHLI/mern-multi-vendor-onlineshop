import React from 'react'
import { Avatar } from '@mui/material';
import { IoStorefrontOutline } from 'react-icons/io5';
import { slashDateFormat } from '../../helpers/dayjsHelper';

const ShopInfoCard = ({shopData, shopProductsCount, avgRatings}) => {

    return (
       <div className='p-4 grid grid-cols-4 grid-rows-4 gap-1 grid-flow-col 600px:gap-y-[10px] 600px:gap-x-0'>
            <div className='col-span-4 row-span-2 600px:col-span-[2.5] 600px:row-span-3 1000px:col-span-2 1000px:row-span-4'>
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
            
            <div className="normalFlex gap-2 text-[14px] text-[#000000a6] 
                col-span-4 row-span-1 600px:col-span-[2.5] 600px:row-span-1 1000px:col-span-2 1000px:row-span-2 1000px:order-last">
                <h5 className="font-[600]">店铺简介:</h5>
                <h4>{shopData?.description}</h4>
            </div>

            <div className='flex justify-between text-[13px] 600px:flex-col 600px:justify-around 1000px:flex-row 1000px:text-[14px] 1000px:justify-between 1000px:items-center text-[#000000a6]
                col-span-4 row-span-1 600px:col-span-[1.5] 600px:row-span-4 1000px:col-span-2 1000px:row-span-2'>
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