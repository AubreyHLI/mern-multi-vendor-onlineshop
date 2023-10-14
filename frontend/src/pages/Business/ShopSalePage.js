import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const ShopSalePage = () => {
    const {setActive} = useOutletContext();

	useEffect(() => {
		setActive(4);
		window.scrollTo(0,0);
	}, [])

    return (
        <div>ShopSalePage</div>
    )
}

export default ShopSalePage