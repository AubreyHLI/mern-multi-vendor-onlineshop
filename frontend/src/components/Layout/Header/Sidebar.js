import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { navItems } from '../../../static/data';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ setOpenMenu, activeHeading }) => {
    const { token, user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleClick = (url) => {
        navigate(url);
        setOpenMenu(false);
    }
    
    return (
        <div className='fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 800px:hidden'>
            <div className="fixed w-[65%] min-w-[270px] max-w-[340px] bg-[#fff] h-full top-0 left-0 z-10 overflow-y-scroll">
                <div className="normalFlex w-full h-[80px] justify-between pl-4 pr-3 pt-1 bg-white">
                    {/* logo */}
                    <div className='h-[34px] 500px:h-9'>
                        <img src='https://res.cloudinary.com/dewmfc2io/image/upload/v1695238416/mern-supermarket/logo/logo_lj7bii.png' alt='logo' className='h-full'/>
                    </div>
                    <div onClick={() => setOpenMenu(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
                        <RxCross1 size={20}/>
                    </div>                
                </div>

                {/* navbar */}
                <div className='flex flex-col items-start 800px:flex-row 800px:items-end 800px:h-full gap-1'>
                    { navItems && navItems.map((item,index) => 
                    <div onClick={() => handleClick(item.url)} key={index} className={`normalFlex 800px:h-[40px] font-[500] px-4 w-full py-4 cursor-pointer bg-white hover:bg-[#eeeeee] ${activeHeading === index + 1 ? "text-lime-500" : "text-[#333333]"} `}>
                        {item.title}
                    </div>
                    )}

                    {token && user ?
                    <div className={`relative cursor-pointer w-full mt-6 py-4 px-3 font-[500] bg-white hover:bg-[#eeeeee] ${activeHeading === 10 ? "text-lime-500" : " text-[#333333]"} `}>
                        <div onClick={() => handleClick('/account')} className="normalFlex gap-3 cursor-pointer ">
                            <CgProfile size={36}/>
                            <h2 className="text-[16px]">我的账号</h2>
                        </div>
                    </div> 
                    :
                    <div className="relative normalFlex gap-2 w-full mt-6 py-4 px-3 text-[#000000b7] font-[500] ">
                        <CgProfile size={36} />
                        <span onClick={() => handleClick('/login')} className="normalFlex cursor-pointer hover:underline">
                            登陆
                        </span>
                        <span> | </span>
                        <span onClick={() => handleClick('/signup')} className="normalFlex cursor-pointer hover:underline">
                            注册
                        </span>
                    </div>
                    }
                </div>


                <div className="normalFlex w-full ">
                   
                </div>
            </div>
        </div>
    )
}

export default Sidebar