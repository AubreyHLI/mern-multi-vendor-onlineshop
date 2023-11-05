import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllProductsQuery } from '../../redux/features/products/productsApi';
import { useGetUserQuery } from '../../redux/features/auth/authApi';
import { useGetCartItemsQuery, useGetWishlistQuery } from '../../redux/features/user/userApi';
import { setProducts } from '../../redux/features/products/productsSlice';
import { setUser } from '../../redux/features/auth/authSlice';
import { setCart, setWishlist } from '../../redux/features/user/userSlice';
import Loader from '../atoms/Loader';
import { Outlet } from 'react-router-dom';

const InitLayout = () => {
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
        <Outlet  />
    )
}

export default InitLayout