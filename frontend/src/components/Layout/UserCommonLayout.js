import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'


const UserCommonLayout = () => {
    const [active, setActive] = useState(0);
    
    return (
        <div className='h-full min-h-[600px]'>
            <Header activeHeading={active} withNav={true} />
            <Outlet context={{setActive}} />
            <Footer />
        </div>
    )
}

export default UserCommonLayout