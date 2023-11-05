import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const InboxPage = () => {
	const { setWithSidebar, setActive, setIsCart } = useOutletContext();

    useEffect(() => {
		setIsCart(false);
		setWithSidebar(true);
		setActive(2);
        window.scrollTo(0,0);
    }, [])

	return (
		<div>Inbox</div>
	)
}

export default InboxPage