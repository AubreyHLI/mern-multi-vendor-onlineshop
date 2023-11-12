import React, { useEffect } from 'react'
import { RxCross1 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { navItems, accountNavItems } from '../../../static/data';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from '../../../redux/features/user/userSlice';
import { setLogout } from '../../../redux/features/auth/authSlice';
import { useLogoutUserMutation } from '../../../redux/features/auth/authApi';
import { toast } from 'react-toastify';


const Sidebar = ({ setOpenMenu, activeHeading }) => {
    const { token, user } = useSelector(state => state.auth);
    const [logoutUser, {isSuccess: logoutSuccess}] = useLogoutUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navItemsLength = navItems.length;

    useEffect(() => {
        if(logoutSuccess) {
            toast.success("退出登录成功");
        }
    }, [logoutSuccess])
    

    const handleClick = (url) => {
        navigate(url);
        setOpenMenu(false);
    }

    const handleLogout = async () => {
        const answer = window.confirm('确认退出登录？');
        if(!answer) {
            return
        } else {
			dispatch(clearUserData());
			dispatch(setLogout()); 
            await logoutUser();
        }
    }
    
    return (
        <div className='fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 600px:hidden'>
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
                <div className='flex flex-col items-start 800px:flex-row 800px:items-end 800px:h-full gap-1 font-[500] text-[#555555]'>
                    { navItems?.map((item,index) => 
                    <div onClick={() => handleClick(item.url)} key={index} className={`normalFlex pl-5 w-full py-3 cursor-pointer hover:bg-[#eeeeee] ${activeHeading === index + 1 && "text-lime-500" } `}>
                        {item.title}
                    </div>
                    )}

                    {token && user ?
                    <div className='w-full'>
                        <div className="normalFlex gap-2 w-full py-2 pl-5">
                            <CgProfile size={30}/>
                            <h2>我的账号</h2>
                        </div>
                        { accountNavItems?.map((item,index) => 
                        <div onClick={() => handleClick(item.url)} key={index} className={`normalFlex pl-8 w-full py-3 cursor-pointer hover:bg-[#eeeeee] ${activeHeading === navItemsLength + index + 1 && "text-lime-500"} `}>
                            {item.title}
                        </div>
                        )}
                        <div onClick={handleLogout} className='normalFlex pl-8 w-full py-3 cursor-pointer hover:bg-[#eeeeee]'>
                            退出登录
                        </div>
                    </div>
                    :
                    <div className="relative normalFlex gap-2 w-full mt-6 py-4 px-3 text-[#000000b7] ">
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

            </div>
        </div>
    )
}

export default Sidebar