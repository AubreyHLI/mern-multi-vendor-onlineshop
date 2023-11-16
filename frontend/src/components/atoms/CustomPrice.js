import React from 'react'

const CustomPrice = ({price, optionStyle}) => {
    return (
        <div className={`text-[16px] w-fit ${optionStyle}`}>
            <span className='text-[calc(1em-4px)]'>¥</span>
            <span>{price?.toFixed(2)}</span>
        </div>
    )
}

export default CustomPrice