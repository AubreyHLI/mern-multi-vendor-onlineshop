import { Avatar } from '@mui/material';
import React from 'react'
import { IoStorefrontOutline } from 'react-icons/io5';

const ShopInfoCard = ({shopData, shopProductsCount}) => {
    return (
        <div>
            <div className="w-full pt-5 pb-3">
                <div className="w-full flex item-center justify-center">
                    { shopData?.avatar?.url 
					? <Avatar src={shopData?.avatar?.url} sx={{ width: 50, height: 50}}/> 
					: <Avatar sx={{ width: 50, height: 50, color: '#53565a', bgcolor:'#ffffff', border:'1px solid #53565a' }} >
						<IoStorefrontOutline size={30}/>
					</Avatar>
					}
                </div>
                <h3 className="text-center py-2 text-[20px]">{shopData?.name}</h3>
                <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
                    {shopData?.description}
                </p>
            </div>
            <div className='flex flex-col 600px:flex-row 600px:justify-between 800px:flex-col 800px:justify-normal'>
                <div className="p-3 flex gap-3 800px:flex-col 800px:gap-0 text-[#000000a6] 800px:mt-10">
                    <h5 className="font-[600]">商品总数:</h5>
                    <h4>{shopProductsCount}</h4>
                </div>
                <div className="p-3 flex gap-3 800px:flex-col 800px:gap-0 text-[#000000a6]">
                    <h5 className="font-[600]">店铺评分:</h5>
                    <h4>0.0</h4>
                </div>
                <div className="p-3 flex gap-3 800px:flex-col 800px:gap-0 text-[#000000a6] mr-4">
                    <h5 className="font-[600]">创建日期:</h5>
                    <h4>{shopData?.createdAt?.slice(0,10)}</h4>
                </div>   
            </div>       
        </div>
    );
}

export default ShopInfoCard