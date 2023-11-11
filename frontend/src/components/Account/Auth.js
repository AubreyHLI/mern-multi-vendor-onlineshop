import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/features/auth/authApi';
import { setUser } from '../../redux/features/auth/authSlice';

const Auth = () => {
    const { token, user } = useSelector(state => state.auth);
    const { data: userData, isLoading, isSuccess, isError } = useGetUserQuery(token, {skip: !token});
    const dispatch = useDispatch();

    useEffect(() => {
        if(isSuccess) {
            dispatch(setUser(userData.user));
        }  
        if(isError) {
            dispatch(setUser(null));
        }
    }, [isSuccess, isError])


    if(!isLoading && (!token || !user)) {
        return <Navigate to="/login" replace={true} /> 
    } 

    return (
        <Outlet />
    )
}

export default Auth