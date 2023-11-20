import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineLocalShipping, MdStorefront } from "react-icons/md";
import { AiOutlineHome, AiOutlineMoneyCollect } from "react-icons/ai";
import { CgShoppingBag } from 'react-icons/cg';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { RiCoupon3Line } from 'react-icons/ri';
import { TbTruckReturn } from "react-icons/tb";


const ShopSidebar = ({active}) => {
    return (
        <div className="w-[65px] 800px:w-[100px] h-full sticky left-0 pt-3 overflow-y-scroll bg-white shadow-md">
            {sidebarData?.map((item, index) => 
            <div className="w-full flex items-center p-4" key={index} >
                <Link to={item.linkUrl} className={`w-full flex flex-col items-center 800px:gap-1 ${active === index ? "text-[rgb(132,204,22)]" : "!text-[#606060]"}`}>
                    <span>{item.icon}</span>
                    <h5 className='text-[14px] font-[400] 800px:text-[17px]'>
                        {item.label}
                    </h5>
                </Link>
            </div>
            )}
        </div>
    )
}

const sidebarData = [
    {
        label: '首页',
        icon: <AiOutlineHome size={26} />,
        linkUrl: "/business"
    },
    {
        label: '商品',
        icon: <CgShoppingBag size={26} />,
        linkUrl: "/business/products",
    },
    {
        label: '订单',
        icon: <HiOutlineClipboardList size={30} className="ml-[-2px]"/>,
        linkUrl: "/business/orders",
    },
    {
        label: '退款',
        icon: <TbTruckReturn size={26} />,
        linkUrl: "/business/refundOrganize",
    },
    {
        label: '促销',
        icon: <RiCoupon3Line size={24} />,
        linkUrl: "/business/sales",
    },
    {
        label: '财务',
        icon: <AiOutlineMoneyCollect size={28} />,
        linkUrl: "/business/statis",
    },
    {
        label: '店铺',
        icon: <MdStorefront size={28} />,
        linkUrl: "/business/shop",
    },
]

export default ShopSidebar