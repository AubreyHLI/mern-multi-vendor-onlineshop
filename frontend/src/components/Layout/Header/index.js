import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BiMenuAltLeft } from "react-icons/bi";
import SearchBar from './SearchBar';
import AccountBox from './AccountBox';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Cart from '../../Cart';
import Wishlist from '../../Wishlist';

const Header = ({ activeHeading, withNav }) => {
    const [dropDown, setDropDown] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        if(openMenu || openWishlist ) {
            document.body.style.overflow = 'hidden';  // lock the scroll of home page
        } else {
            document.body.style.overflow = 'unset';  // unlock the scroll of home page
        }
    }, [openMenu, openWishlist]);
    

    return (
    <>
        <div className="shadow-md sticky top-0 left-0 z-10 bg-white">
            <div className='section'>
                <div className="h-[80px] py-[20px] flex items-center justify-between">
                    {/* menu */}
                    <div className="800px:hidden ">
                        <BiMenuAltLeft size={34} onClick={() => setOpenMenu(true)}/>
                    </div>
    
                    {/* logo */}
                    <Link to='/'>
                        <div className='logo'>
                            <img src='https://res.cloudinary.com/dewmfc2io/image/upload/v1695238416/mern-supermarket/logo/logo_lj7bii.png' alt='logo' className='h-full'/>
                        </div>
                    </Link>

                    { !withNav && <Link to='/' className='text-[#333333] font-[500] px-4 cursor-pointer hidden 600px:block'>首页</Link>}
    
                    {/* search bar */}
                    <SearchBar />
    
                    {/* user info */}
                    <AccountBox setOpenWishlist={setOpenWishlist} />
                </div>
            </div>
            
    
            {/* navigation */}
            { withNav && 
            <div className='transition hidden 800px:flex items-center justify-between w-full h-[50px]'>
                <Nav activeHeading={activeHeading} dropDown={dropDown} setDropDown={setDropDown} />
            </div>
            }
        </div>
    
        {/* wishlist details */}
        { openWishlist && <Wishlist setOpenWishlist={setOpenWishlist}/>}
    
        {/* mobile header menu sidebar */}
        {openMenu && <Sidebar activeHeading={activeHeading} setOpenMenu={setOpenMenu} />}
    </>
    )
}

export default Header