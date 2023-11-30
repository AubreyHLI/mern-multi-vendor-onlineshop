import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetShopQuery } from '../../redux/features/shopAuth/shopAuthApi';
import { setShop } from '../../redux/features/shopAuth/shopAuthSlice';
import { Navigate } from 'react-router-dom';

const ShopAuth = ({children}) => {
    const { shopToken, shop } = useSelector(state => state.shopAuth);
    const { data: shopData, isLoading, isSuccess, isError } = useGetShopQuery(shopToken, {skip: shopToken === null});
    const dispatch = useDispatch();

    useEffect(() => {
        if(isSuccess) {
            dispatch(setShop(shopData.shop));
        } 
        if(isError) {
            dispatch(setShop(null));
        }
    }, [isSuccess, isError, shopData])

    if(!isLoading && (!shopToken || !shop)) {
        return <Navigate to="/business/login" replace={true} /> 
    }

    return (
        children
    )
}

export default ShopAuth