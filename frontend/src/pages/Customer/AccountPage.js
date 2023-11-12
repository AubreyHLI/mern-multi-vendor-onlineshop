import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import AccountDetails from '../../components/Account/AccountDetails';

const AccountPage = () => {
	const { setActive, setWithNav, setActiveSidebar } = useOutletContext();

    useEffect(() => {
		setWithNav(true);
		setActive(6);
		setActiveSidebar(0);
        window.scrollTo(0,0);
    }, [])

	return (
		<AccountDetails />
	);
}

export default AccountPage