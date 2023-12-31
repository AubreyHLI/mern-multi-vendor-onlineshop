import React, { useEffect } from 'react'
import { AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { RxPerson } from 'react-icons/rx';
import { TbAddressBook } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { toast } from 'react-toastify';
import { setLogout } from '../../redux/features/auth/authSlice';
import { clearUserData } from '../../redux/features/user/userSlice';
import { BiReceipt } from 'react-icons/bi';

const AccountSidebar = ({ active }) => {
    const [logoutUser, {isSuccess: logoutSuccess}] = useLogoutUserMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if(logoutSuccess) {
            toast.success("退出登录成功");
        }
    }, [logoutSuccess])
    
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
	<div className="w-full h-full py-2 text-[#555555]">
		{sidebarData?.map((item, index) => 
			<div className="w-full flex items-center py-4 px-3 1000px:p-4" key={index}>
				<Link to={item.linkUrl} className={`w-full flex flex-col items-center gap-2 ${active === index && "text-[#78be20] "}`}>
					{item.icon}
					<h5 className='text-[14px] 800px:text-[15px] 1000px:text-[16px] font-[400]'>
						{item.label}
					</h5>
				</Link>
			</div>
		)}
		<div className="single_item w-full flex items-center py-4 px-3 1000px:p-4" onClick={handleLogout} key={7}>
			<div className={`w-full flex flex-col gap-2 items-center cursor-pointer ${active === 7 && "text-[#78be20]"}`}>
				<AiOutlineLogin size={25} color={active === 7 ? "[#78be20]" : ""} />
				<h5 className='text-[14px] 800px:text-[15px] 1000px:text-[16px] font-[400]'>
					退出登录
				</h5>
			</div>
		</div>
	</div>
	);
};

const sidebarData = [
	{
		label: '基本信息',
		icon: <RxPerson size={25} />,
		linkUrl: "/account",
	},
	{
		label: '我的订单',
		icon: <BiReceipt size={24} />,
		linkUrl: "/account/orders",
	},
	{
		label: '消息',
		icon: <AiOutlineMessage size={25} />,
		linkUrl: '/account/inbox',
	},
	{
		label: '收货地址',
		icon: <TbAddressBook size={25} />,
		linkUrl: "/account/addresses",
	},  
    {
		label: '修改密码',
		icon: <RiLockPasswordLine size={25} />,
		linkUrl: "/account/changePW",
	},
]


export default AccountSidebar