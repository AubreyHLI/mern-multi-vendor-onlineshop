import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const ShopOrdersPage = () => {
    const {setActive} = useOutletContext();

	useEffect(() => {
		setActive(2);
		window.scrollTo(0,0);
	}, [])

    return (
        <div>ShopOrdersPage</div>
    )
}

export default ShopOrdersPage