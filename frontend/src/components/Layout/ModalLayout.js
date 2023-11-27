import React from 'react'

const ModalLayout = ({children, optionStyle, setOpenForm}) => {
    return (
        <div onClick={() => setOpenForm(false)} className='fixed z-[200] inset-0 w-full h-screen min-w-[350px] overflow-auto bg-[rgba(0,0,0,0.4)] flex justify-center'>
            <div onClick={e => e.stopPropagation()} className={`w-full h-full bg-white flex flex-col px-3 overflow-scroll 600px:w-[90%] 600px:h-max 600px:rounded-[16px] 600px:px-[16px] 600px:pt-[4px] 600px:pb-[10px] 600px:overflow-visible 
                ${optionStyle}`}>
                
                {children}
            </div>
        </div>
    )
}

export default ModalLayout