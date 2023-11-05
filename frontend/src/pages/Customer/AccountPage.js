import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import AccountDetails from '../../components/Account/AccountDetails';

const AccountPage = () => {
	const { setActive, setWithSidebar, setWithNav, setIsCart } = useOutletContext();

    useEffect(() => {
		setIsCart(false);
		setWithNav(true);
		setWithSidebar(true);
		setActive(0);
        window.scrollTo(0,0);
    }, [])

	return (
		<AccountDetails />
	);
}

export default AccountPage