import React, { useEffect } from 'react'
import Cart from '../../components/Cart'
import { useOutletContext } from 'react-router-dom';

const CartPage = () => {
    const { setIsCart } = useOutletContext(true);

	useEffect(() => {
        setIsCart(true);
		window.scrollTo(0,0);
	},[])

    return (
       <Cart />
    )
}

export default CartPage