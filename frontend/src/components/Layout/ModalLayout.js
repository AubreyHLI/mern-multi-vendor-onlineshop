import React from 'react'

const ModalLayout = ({children, optionStyle}) => {
    return (
        <div className='fixed z-[200] inset-0 w-full h-screen min-w-[350px] overflow-auto bg-[rgba(0,0,0,0.4)] flex justify-center'>
            <div className={`w-full h-full bg-white flex flex-col px-3 overflow-scroll 500px:w-[90%] 500px:h-max 500px:rounded-[16px] 500px:px-[16px] 500px:pt-[4px] 500px:pb-[10px] 500px:overflow-visible 
                ${optionStyle}`}>
                
                {children}
            </div>
        </div>
    )
}

export default ModalLayout