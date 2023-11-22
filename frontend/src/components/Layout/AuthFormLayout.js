import React from 'react'
import { Link } from 'react-router-dom'

const AuthFormLayout = ({children, heading, isSignup}) => {
    return (
        <div className='w-full h-screen 800px:flex'>
            <div className={`w-full 800px:w-[40%] hidden 800px:flex items-center justify-center py-8 px-6 ${isSignup ? 'bg-lime-50' : 'bg-amber-50 '}`}>
                <img src='https://res.cloudinary.com/dewmfc2io/image/upload/v1700674324/mern-supermarket/logo/logo2_thsytr.png' alt='logo2' className='w-full max-w-[400px] rounded-full'/>
            </div>
            <div className='w-full h-screen 800px:w-[65%] flex flex-col relative'>
                <div className='w-full normalFlex justify-between gap-4 py-8 px-6 h-fit absolute'> 
                    <Link to='/' className='h-9 800px:h-10'>
                        <img src='https://res.cloudinary.com/dewmfc2io/image/upload/v1695238416/mern-supermarket/logo/logo_lj7bii.png' alt='logo' className='h-full'/>
                    </Link>
                    <span className='normalFlex rounded-full px-4 h-[30px] text-[15px] bg-[orange] text-[#fff] min-w-fit'>
                        买家版
                    </span>
                </div>

                <div className="min-h-[300px] flex flex-col items-center w-full justify-center h-full -mt-8">
                    <div className="mx-auto w-full max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            { heading }
                        </h2>

                        <div className="mt-8 px-4 mx-auto w-full max-w-md">   
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthFormLayout