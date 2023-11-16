import React, { useEffect } from 'react'
import { useAddToCartMutation } from '../../redux/features/user/userApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddToCartBtn = ({data, optionStyle, children,}) => {
    const { token, user } = useSelector(state => state.auth);
    const [ addToCart, {isSuccess: cartSuccess } ] = useAddToCartMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if(cartSuccess) {
            toast.success('成功加入购物车')
        }
    }, [cartSuccess])

    const addToCartHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(token && user) {
            if (data?.stock < 1) {
                toast.error("抱歉，商品已无库存:(");
            } else {
                await addToCart({
                    shopId: data?.shopId, 
                    productId: data?._id, 
                    qty: data?.qty
                })
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <div onClick={e => addToCartHandler(e)} className={optionStyle} >
            {children}
        </div>
    )
}

export default AddToCartBtn