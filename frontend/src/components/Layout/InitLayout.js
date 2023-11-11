import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useGetAllProductsQuery } from '../../redux/features/products/productsApi';
import { useGetUserQuery } from '../../redux/features/auth/authApi';
import { useGetCartItemsQuery, useGetWishlistQuery } from '../../redux/features/user/userApi';
import { setProducts } from '../../redux/features/products/productsSlice';
import { setUser } from '../../redux/features/auth/authSlice';
import { setCart, setWishlist } from '../../redux/features/user/userSlice';
import { Outlet } from 'react-router-dom';
import Loader from '../atoms/Loader';


const InitLayout = () => {
    const { data: allProductsData, 
        isLoading: loadingProducts, 
        isSuccess: productsIsSuccess, } = useGetAllProductsQuery();
    const { data: userData, isLoading: loadingUser, isSuccess: userIsSuccess, isError: userIsError} = useGetUserQuery();
    const { data: cartData, isLoading: loadingCart, isSuccess: cartSuccess } = useGetCartItemsQuery(userIsSuccess, {skip: !userIsSuccess});
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


    if(loadingProducts || loadingUser || loadingCart) {
        return <Loader />
    }
    
    return (
        <Outlet  />
    )
}

export default InitLayout