import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const ShopShippingPage = () => {
    const {setActive} = useOutletContext();

	useEffect(() => {
		setActive(3);
		window.scrollTo(0,0);
	}, [])

    return (
        <div>ShopShippingPage</div>
    )
}

export default ShopShippingPage