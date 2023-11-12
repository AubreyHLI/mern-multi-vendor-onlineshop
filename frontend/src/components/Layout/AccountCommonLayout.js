import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AccountSidebar from '../Account/AccountSidebar'
import { useDispatch } from 'react-redux';
import { useGetAddressBookQuery, useGetOrdersQuery } from '../../redux/features/user/userApi';
import { setAddressBook, setOrders } from '../../redux/features/user/userSlice';
import Loader from '../atoms/Loader';
import Header from './Header';
import Footer from './Footer';


const AccountCommonLayout = () => {
    const [active, setActive] = useState(6);
    const [activeSidebar, setActiveSidebar] = useState(0);
    const [withNav, setWithNav] = useState(true);
    const { data: addressData, isLoading: addressLoading, isSuccess: addressSuccess } = useGetAddressBookQuery();
    const { data: ordersData, isLoading: ordersLoading, isSuccess: ordersSuccess } = useGetOrdersQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if(addressSuccess) {
            dispatch(setAddressBook(addressData.addressBook));
        } 
    }, [addressSuccess, addressData])

    useEffect(() => {
        if(ordersSuccess) {
            dispatch(setOrders(ordersData.orders))
        }
    }, [ordersSuccess])

    return (
        <div className='h-full min-h-[600px]'>
            <Header activeHeading={active} withNav={withNav}/>
            { addressLoading || ordersLoading
            ? <Loader />
            : <div className="section w-full flex items-start justify-between py-6 gap-4 800px:gap-5 1200px:gap-6 relative">
                <div className='flex-1 h-full overflow-y-scroll'>
                    <Outlet context={{setActive, setWithNav, setActiveSidebar}} />
                </div>
                <div className="hidden 600px:block sticky top-[154px] -mr-[16px] w-[90px] 800px:w-[120px] h-[calc(100vh-164px)] 1000px:w-[160px] 1200px:w-[180px] rounded-[10px] bg-white shadow-md">
                    <AccountSidebar active={activeSidebar} />
                </div>
            </div>  
            }
            <Footer />
        </div>
    )
}

export default AccountCommonLayout