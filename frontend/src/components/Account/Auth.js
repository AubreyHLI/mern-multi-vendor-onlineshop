import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/features/auth/authApi';
import { setUser } from '../../redux/features/auth/authSlice';

const Auth = ({children}) => {
    const { token, user } = useSelector(state => state.auth);
    const { data: userData, isLoading, isSuccess, isError } = useGetUserQuery(token, {skip: token === null});
    const dispatch = useDispatch();

    useEffect(() => {
        if(isSuccess) {
            dispatch(setUser(userData.user));
        } else {
            dispatch(setUser(null));
        }
    }, [isSuccess, isError])


    if(!isLoading && (!token || !user)) {
        return <Navigate to="/login" replace={true} /> 
    }

    return (
        children
    )
}

export default Auth