import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoStorefrontOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'

const ProductShopInfo = ({shop}) => {
	const [shopProducts, setShopProducts] = useState(null);    
    const { products } = useSelector(state => state.products);

    useEffect(() => {
        const d = products?.filter(i => i?.shop?._id === shop?._id);
        setShopProducts(d);
    }, [shop?._id]);

    return (
		<div className="w-full mt-9 flex flex-col justify-between px-3 py-4 rounded-[10px] bg-white 600px:flex-row 600px:p-5 800px:mt-2 800px:px-10 1200px:flex-col 1200px:px-4 1200px:w-[260px] 1200px:mt-0 1200px:mb-[30px]">
            <div className="w-full">
				<div className="normalFlex gap-3">
					{ shop?.avatar?.url 
					? <Avatar src={shop?.avatar?.url} sx={{ width: 50, height: 50}}/> 
					: <Avatar sx={{ width: 50, height: 50, color: '#53565a', bgcolor:'#ffffff', border:'1px solid #53565a' }} >
						<IoStorefrontOutline size={30}/>
					</Avatar>
					}
					<div className='flex flex-col justify-between gap-1'>
						<h3 className='text-[14px] font-[500]'>
							{shop?.name}
						</h3>
						<div className='flex gap-4 text-[13px]'>
							<div className='flex 1100px:flex-col'>
								<span className='text-[#a8a8a8]'>商品数：</span>
								{shopProducts?.length}
							</div>
							<div className='flex 1100px:flex-col'>
								<span className='text-[#a8a8a8]'>店铺评价：</span>
							</div>
						</div>
					</div>
				</div>

				<div className='text-[14px] mt-2 text-[#a8a8a8]'>
					<p>{shop?.description}</p>
				</div>
            </div>
            <div className="w-full flex mt-5 justify-around 600px:flex-col 600px:mt-0 600px:w-[200px] 600px:gap-1">  
				<Link to={`/shop/${shop?._id}`}  className='text-center text-[13px] border font-[500]  px-[30px] py-[5px] border-[#53565a] text-[#53565a]'>
					<h4 className="">进入店铺</h4>
				</Link>
				<Link  className='text-center text-[13px] border font-[500]  px-[30px] py-[5px] border-[#53565a] text-[#53565a]'>
					<h4 className="">联系客服</h4>
				</Link>
            </div>
        </div>
    )
}

export default ProductShopInfo