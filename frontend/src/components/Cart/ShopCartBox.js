import React from 'react'
import { PiStorefront } from 'react-icons/pi'
import CartItem from './CartItem'

const ShopCartBox = ({shopCart}) => {

    return (
        <div className='mx-2 my-2 px-2 pt-2 rounded-lg bg-white'>
            <div className='normalFlex gap-[6px] text-[14px] text-[#000000a4]'>
                <PiStorefront size={20}/>
                <h3>{shopCart?.shop?.name}</h3>
            </div>
            <div>
                { shopCart?.items?.map((item, index) => 
                <CartItem key={index} data={item} shopId={shopCart?.shop?._id} /> )}
            </div>
            
        </div>
    )
}

export default ShopCartBox