import React, { useEffect } from 'react'
import { AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { RxPerson } from 'react-icons/rx';
import { TbAddressBook } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { toast } from 'react-toastify';
import { setLogout } from '../../redux/features/auth/authSlice';

const AccountSidebar = ({ active }) => {
    const [logoutUser, {isSuccess: logoutSuccess}] = useLogoutUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(logoutSuccess) {
            dispatch(setLogout());
            toast.success("退出登录成功");
        }
    }, [logoutSuccess])
    
    const handleLogout = async () => {
        const answer = window.confirm('确认退出登录？');
        if(!answer) {
            return
        } else {
            await logoutUser();
        }
    }

	return (
	<div className="w-full h-full sticky left-0 py-2 overflow-y-scroll border rounded-[10px] shadow-md">
		{sidebarData?.map((item, index) => {
			return (
				<div className="w-full flex items-center py-4 px-3 lg:p-4" key={index}>
					<Link to={item.linkUrl} className={`w-full flex flex-col items-center gap-2 ${active === index ? "text-[#78be20] " : " "}`}>
						{item.icon}
						<h5 className='text-[12px] 600px:text-[16px] font-[400]'>
							{item.label}
						</h5>
					</Link>
				</div>
			)
		})}
		<div className="single_item w-full flex items-center py-4 px-3 lg:p-4" onClick={handleLogout} key={7}>
			<div className={`w-full flex flex-col gap-2 items-center cursor-pointer ${active === 7 ? "text-[#78be20] " : " "}`}>
				<AiOutlineLogin size={25} color={active === 7 ? "[#78be20]" : ""} />
				<h5 className='text-[12px] 600px:text-[16px] font-[400]'>
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
		icon: <HiOutlineShoppingBag size={25} />,
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