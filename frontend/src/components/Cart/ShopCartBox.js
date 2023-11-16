import React from 'react'
import { PiStorefront } from 'react-icons/pi'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'

const ShopCartBox = ({shopCart}) => {

    return (
        <div className='mt-3 mb-1 pl-2 pr-3 py-3 rounded-lg bg-white shadow-sm 600px:px-4'>
            <Link to={`/shop/${shopCart?.shop?._id}`} className='normalFlex gap-[6px] font-[500] pl-1 text-[14px] text-[#000000a4]'>
                <PiStorefront size={20}/>
                <h3>{shopCart?.shop?.name}</h3>
                <IoIosArrowForward />
            </Link>
            <div className='mt-1'>
                { shopCart?.items?.map((item, index) => 
                <CartItem key={index} data={item} shopId={shopCart?.shop?._id} /> )}
            </div>
            
        </div>
    )
}

export default ShopCartBox