import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllProductsQuery } from '../../redux/features/products/productsApi'
import { setUser } from '../../redux/features/auth/authSlice'
import { useGetUserQuery } from '../../redux/features/auth/authApi'
import { setProducts } from '../../redux/features/products/productsSlice'
import { Outlet } from 'react-router-dom'
import { setCart, setWishlist } from '../../redux/features/user/userSlice'
import { useGetCartItemsQuery, useGetWishlistQuery } from '../../redux/features/user/userApi'
import Loader from '../../components/atoms/Loader'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'


const UserCommonLayout = () => {
    const [active, setActive] = useState(0);
    const { token } = useSelector(state => state.auth);
    const { data: allProductsData, 
        isLoading: loadingProducts, 
        isSuccess: productsIsSuccess, } = useGetAllProductsQuery();
    const { data: userData, 
        isLoading: loadingUser, 
        isSuccess: userIsSuccess, 
        isError: userIsError,
    } = useGetUserQuery(token, {skip: token === null});
    const { data: cartData, isSuccess: cartSuccess } = useGetCartItemsQuery(userIsSuccess, {skip: !userIsSuccess});
    const { data: wishlistData, isSuccess: wishlistSuccess } = useGetWishlistQuery(userIsSuccess, {skip: !userIsSuccess});
    const dispatch = useDispatch();

    useEffect(() => {
        if(productsIsSuccess) {
            dispatch(setProducts(allProductsData.products));
        } 
    }, [productsIsSuccess])

    useEffect(() => {
        if(userIsSuccess) {
            dispatch(setUser(userData.user));
        } 
        if(userIsError) {
            dispatch(setUser(null));
        }
    }, [userIsSuccess, userIsError])

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


    if(loadingProducts || loadingUser) {
        return <Loader />
    }
    
    return (
        <div className='h-full min-h-[600px]'>
            <Header activeHeading={active} withNav={true} />
            <Outlet  context={{setActive}} />
            <Footer />
        </div>
    )
}

export default UserCommonLayout