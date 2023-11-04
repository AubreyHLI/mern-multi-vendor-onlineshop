import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useGetAddressBookQuery, useGetCartItemsQuery, useGetWishlistQuery } from '../../redux/features/user/userApi';
import { useDispatch } from 'react-redux';
import { setAddressBook, setCart, setWishlist } from '../../redux/features/user/userSlice';
import AccountSidebar from '../Account/AccountSidebar';
import Header from './Header';
import Footer from './Footer';
import Loader from '../atoms/Loader';


const AccountCommonLayout = () => {
    const [active, setActive] = useState(0);
    const [withSidebar, setWithSidebar] = useState(true);
    const [withNav, setWithNav] = useState(true);
    const { data: cartData, isLoading: cartLoading, isSuccess: cartSuccess } = useGetCartItemsQuery();
    const { data: wishlistData, isSuccess: wishlistSuccess } = useGetWishlistQuery();
    const { data: addressData, isLoading: addressLoading, isSuccess: addressSuccess } = useGetAddressBookQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if(cartSuccess) {
            dispatch(setCart(cartData.cart));
        } 
    }, [cartSuccess, cartData])

    useEffect(() => {
        if(wishlistSuccess) {
            dispatch(setWishlist(wishlistData.wishlist));
        } 
    }, [wishlistSuccess, wishlistData])

    useEffect(() => {
        if(addressSuccess) {
            dispatch(setAddressBook(addressData.addressBook));
        } 
    }, [addressSuccess, addressData])

    return (
        <div className='h-full min-h-[600px]'>
            <Header activeHeading={0} withNav={withNav}/>
            { (cartLoading || addressLoading) 
            ? <Loader />
            : <div className="section flex items-start justify-between w-full py-8 gap-2 800px:gap-5">
                
                <div className='flex-1 h-full overflow-y-scroll'>
                    <Outlet context={{setActive, setWithSidebar, setWithNav}} />
                </div>
                { withSidebar &&
                <div className="w-[50px] mr-[-10px] 600px:w-[100px] 800px:mr-0 800px:w-[120px] 900px:w-[180px] first-letter:sticky pb-2">
                    <AccountSidebar active={active} />
                </div>}
            </div> }
            <Footer />
        </div>
    )
}

export default AccountCommonLayout