import React from 'react'
import { Link } from 'react-router-dom'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'

const ShopHeader = ({active}) => {

    return (
        <div className="w-full h-[80px] bg-[rgb(27,31,38)] shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
            <Link to="/business">
                <div className='logo h-full'>
                    <img src='https://res.cloudinary.com/dewmfc2io/image/upload/v1695238455/mern-supermarket/logo/logo-white_pboa5r.png' alt='logo' className='h-full'/>
                </div>
            </Link>
            
            
            <div className="flex items-center">
                <div className="hidden 500px:flex items-center mr-4 gap-5 800px:gap-8 800px:mr-8">
                    <Link to="/business/inbox" className={`w-full flex items-center ${active === 10 ? "text-[rgb(132,204,22)]": "text-[#606060]"}`}>
                        <BiMessageSquareDetail size={30} className="cursor-pointer" />
                    </Link>
                    <div className={`w-full flex items-center ${active === 11 ? "text-[rgb(132,204,22)]" : "text-[#606060]"}`}>
                        <FiSettings size={26} className="cursor-pointer" />
                    </div>
                </div>
                <span className='normalFlex rounded-full px-4 h-[30px] text-[15px] bg-lime-200'>
                    {/* <RiAdminLine /> */}
                    商家版
                </span>
                
            </div>
        </div>
        )
}

export default ShopHeader