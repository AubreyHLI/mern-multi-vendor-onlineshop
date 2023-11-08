import React, { useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import AccountSidebar from '../Account/AccountSidebar'


const AccountCommonLayout = () => {
    const [active, setActive] = useState(0);
    const { setWithNav } = useOutletContext();

    return (
        <div className="section flex items-start justify-between w-full py-6 gap-2 600px:py-8 800px:gap-5">
            <div className='flex-1 h-full overflow-y-scroll'>
                <Outlet context={{setActive, setWithNav}} />
            </div>
            <div className="w-[50px] mr-[-10px] 600px:w-[100px] 800px:mr-0 800px:w-[120px] 900px:w-[180px] first-letter:sticky pb-2">
                <AccountSidebar active={active} />
            </div>
        </div>  
    )
}

export default AccountCommonLayout