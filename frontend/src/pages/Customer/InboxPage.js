import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const InboxPage = () => {
	const { setWithNav, setActive, setActiveSidebar } = useOutletContext();

    useEffect(() => {
		setWithNav(true);
		setActive(8);
		setActiveSidebar(2);
        window.scrollTo(0,0);
    }, [])

	return (
		<div>Inbox</div>
	)
}

export default InboxPage