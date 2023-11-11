import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useGetPublicStripeKeyQuery } from '../../redux/features/checkout/checkoutApi';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { setAddressBook } from '../../redux/features/user/userSlice';
import { useGetAddressBookQuery } from '../../redux/features/user/userApi';
import Header from './Header';
import Loader from '../atoms/Loader';
import Footer from './Footer';


const CheckoutCommonLayout = () => {
    const [withNav, setWithNav] = useState(false);
    const [stripePromise, setStripePromise] = useState(null);
	const { data, isSuccess } = useGetPublicStripeKeyQuery();
    const { data: addressData, isLoading: addressLoading, isSuccess: addressSuccess } = useGetAddressBookQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if(addressSuccess) {
            dispatch(setAddressBook(addressData.addressBook));
        } 
    }, [addressSuccess, addressData])

	useEffect(() => {
		if(isSuccess) {
			const { publishKey } = data;
			setStripePromise(loadStripe(publishKey));
		}
	}, [isSuccess])

    return (
        <div className='h-full min-h-[600px]'>
            <Header activeHeading={10} withNav={withNav}/>
            { addressLoading
            ? <Loader />
            :  <div className="w-full my-7 section">
                <Outlet context={{stripePromise, setWithNav}} />
            </div>
            }
            <Footer />
        </div>
       
    )
}

export default CheckoutCommonLayout