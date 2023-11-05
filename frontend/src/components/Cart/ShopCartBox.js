import React from 'react'
import { PiStorefront } from 'react-icons/pi'
import CartItem from './CartItem'

const ShopCartBox = ({shopCart}) => {

    return (
        <div className='mt-3 mb-1 pl-2 pr-3 py-3 rounded-lg bg-white shadow-sm 600px:px-4'>
            <div className='normalFlex gap-[6px] text-[14px] text-[#000000a4] pl-1'>
                <PiStorefront size={20}/>
                <h3>{shopCart?.shop?.name}</h3>
            </div>
            <div className='mt-1'>
                { shopCart?.items?.map((item, index) => 
                <CartItem key={index} data={item} shopId={shopCart?.shop?._id} /> )}
            </div>
            
        </div>
    )
}

export default ShopCartBox