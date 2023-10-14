import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const ShopAccountPage = () => {
    const {setActive} = useOutletContext();

	useEffect(() => {
		setActive(6);
		window.scrollTo(0,0);
	}, [])

    return (
        <div>ShopAccountPage</div>
    )
}

export default ShopAccountPage