import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

const ShopHomePage = () => {
    const {setActive} = useOutletContext();

	useEffect(() => {
		setActive(0);
		window.scrollTo(0,0);
	}, [])

    return (
      	<div>ShopHomePage</div>
    )
}

export default ShopHomePage