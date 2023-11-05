import React, { useEffect } from 'react'
import Cart from '../../components/Cart'
import Header from '../../components/Layout/Header';

const CartPage = () => {

	useEffect(() => {
		window.scrollTo(0,0);
	},[])

    return (      
        <div className={`h-screen min-h-[600px] flex flex-col overflow-y-scroll`}>
            <Header activeHeading={0} withNav={true} />
            <Cart />
        </div>
    )
}

export default CartPage