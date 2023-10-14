import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const ShopStatisPage = () => {
    const {setActive} = useOutletContext();

	useEffect(() => {
		setActive(5);
		window.scrollTo(0,0);
	}, [])

    return (
        <div>ShopStatisPage</div>
    )
}

export default ShopStatisPage