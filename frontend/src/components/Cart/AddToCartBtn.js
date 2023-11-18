import React, { useEffect } from 'react'
import { useAddToCartMutation } from '../../redux/features/user/userApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AddToCartBtn = ({data, optionStyle, children, withAuth}) => {
    const { token, user } = useSelector(state => state.auth);
    const [ addToCart, {isSuccess, isError, error } ] = useAddToCartMutation();

    useEffect(() => {
        if(isSuccess) {
            toast.success('成功加入购物车')
        }
        if(isError) {
            toast.error(error?.data?.message)
        }
    }, [isSuccess, isError])


    const addToCartWithAuth = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(token && user) {
            if (data?.stock < 1) {
                toast.error("抱歉，商品已无库存:(");
            } else {
                await addToCart({
                    shopId: data?.shopId, 
                    productId: data?.productId, 
                    qty: data?.qty
                })
            }
        } else {
            toast.error('无购物车，请先登录用户账户')
        }
    };


    const addToCartWithoutAuth = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (data?.stock < 1) {
            toast.error("抱歉，商品已无库存:(");
        } else {
            await addToCart({
                shopId: data?.shopId, 
                productId: data?.productId, 
                qty: 1
            })
        }
    }


    return (
        <button onClick={withAuth ? addToCartWithAuth : addToCartWithoutAuth} className={optionStyle} >
            {children}
        </button>
    )
}

export default AddToCartBtn