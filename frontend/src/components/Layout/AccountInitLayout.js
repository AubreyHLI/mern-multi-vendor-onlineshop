import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useGetAddressBookQuery, useGetCartItemsQuery, useGetWishlistQuery } from '../../redux/features/user/userApi';
import { useDispatch } from 'react-redux';
import { setAddressBook, setCart, setWishlist } from '../../redux/features/user/userSlice';
import Header from './Header';
import Footer from './Footer';
import Loader from '../atoms/Loader';

const AccountInitLayout = () => {
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
            : <Outlet context={{setWithNav}} />
            }
            <Footer />
        </div>
    )
}

export default AccountInitLayout