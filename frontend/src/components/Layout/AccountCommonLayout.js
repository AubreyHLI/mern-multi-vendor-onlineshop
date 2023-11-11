import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AccountSidebar from '../Account/AccountSidebar'
import { useDispatch } from 'react-redux';
import { useGetAddressBookQuery } from '../../redux/features/user/userApi';
import { setAddressBook } from '../../redux/features/user/userSlice';
import Loader from '../atoms/Loader';
import Header from './Header';
import Footer from './Footer';


const AccountCommonLayout = () => {
    const [active, setActive] = useState(0);
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
            : <div className="section flex items-start justify-between w-full py-6 gap-2 600px:py-8 800px:gap-5">
                <div className='flex-1 h-full overflow-y-scroll'>
                    <Outlet context={{setActive, setWithNav}} />
                </div>
                <div className="w-[50px] mr-[-10px] 600px:w-[100px] 800px:mr-0 800px:w-[120px] 900px:w-[180px] first-letter:sticky pb-2">
                    <AccountSidebar active={active} />
                </div>
            </div>  
            }
            <Footer />
        </div>
    )
}

export default AccountCommonLayout