import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const OrdersPage = () => {
  const { setWithSidebar, setActive, setWithNav } = useOutletContext();

    useEffect(() => {
		setWithNav(true);
      	setWithSidebar(true);
		setActive(1);
        window.scrollTo(0,0);
    }, [])

	return (
		<div>OrdersPage</div>
	)
}

export default OrdersPage