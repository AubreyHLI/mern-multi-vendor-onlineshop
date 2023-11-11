import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useGetAddressBookQuery } from '../../redux/features/user/userApi';
import { useDispatch } from 'react-redux';
import { setAddressBook } from '../../redux/features/user/userSlice';
import Header from './Header';
import Footer from './Footer';
import Loader from '../atoms/Loader';

const AccountInitLayout = () => {
    const [withNav, setWithNav] = useState(true);
    const { data: addressData, isLoading: addressLoading, isSuccess: addressSuccess } = useGetAddressBookQuery();
    const dispatch = useDispatch();


    useEffect(() => {
        if(addressSuccess) {
            dispatch(setAddressBook(addressData.addressBook));
        } 
    }, [addressSuccess, addressData])

    return (
        <div className='h-full min-h-[600px]'>
            <Header activeHeading={10} withNav={withNav}/>
            { addressLoading
            ? <Loader />
            : <Outlet context={{setWithNav}} />
            }
            <Footer />
        </div>
    )
}

export default AccountInitLayout