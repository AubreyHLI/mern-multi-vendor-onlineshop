import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import UpdatePwForm from '../../components/Account/UpdatePwForm';

const ChangePwPage = () => {
	const { setActive, setWithNav } = useOutletContext();
	
    useEffect(() => {
		setWithNav(true);
		setActive(4);
        window.scrollTo(0,0);
    }, [])

    return (
		<div className="w-full pb-[20px]">
			<h1 className="text-[22px] 800px:text-[26px] mb-[16px]">修改密码</h1>

			<UpdatePwForm />
		</div>
    )
}

export default ChangePwPage