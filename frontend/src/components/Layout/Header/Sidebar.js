import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { navItems } from '../../../static/data';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';


const Sidebar = ({ setOpenMenu, activeHeading }) => {
    const { token, user } = useSelector(state => state.auth);
    
    return (
        <div className='fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 800px:hidden'>
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                <div className="w-full justify-end flex pr-3">
                    <RxCross1 size={28} className="mt-5" onClick={() => setOpenMenu(false)}/>
                </div>

                {/* searchbar */}
                <SearchBar isSidebar={true} />

                {/* navbar */}
                <div className='flex flex-col items-start 800px:flex-row 800px:items-end 800px:h-full gap-[30px] 800px:gap-3'>
                    { navItems && navItems.map((item,index) => (
                        <div key={index} className={`${activeHeading === index + 1 ? "bg-lime-500 text-white" : "bg-white text-[#333333]"} normalFlex 800px:h-[40px] font-[500] px-4 cursor-pointer}`}>
                            <Link to={item.url} >
                                {item.title}
                            </Link>
                        </div>
                        ))
                    }
                </div>


                <div className="normalFlex w-full m-6">
                    {token && user ?
                    <div className="relative cursor-pointer mr-[15px] text-[#000000b7]">
                        <Link to="/account">
                            <div className="normalFlex gap-3">
                                <CgProfile size={40}/>
                                <h2 className="text-[18px]">Hello {user?.name}</h2>
                            </div>
                        </Link>
                    </div> 
                    :
                    <div className="relative normalFlex space-x-2 mr-[15px] ">
                        <CgProfile size={40} color='#000000b7'/>
                        <Link to="/login" className="flex items-center cursor-pointer hover:underline">
                            <span>登陆</span>
                        </Link>
                        <span> | </span>
                        <Link to="/signup" className="flex items-center cursor-pointer hover:underline">
                            <span>注册</span>
                        </Link>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar