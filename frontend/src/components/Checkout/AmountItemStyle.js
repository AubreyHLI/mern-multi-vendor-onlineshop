import React from 'react'

const AmountItemStyle = ({title, amount, withDiscount = false, largeSize=false}) => {
    return (
        <div className="flex justify-between">
            <h3 className={`font-[400] text-[#000000a4] ${largeSize ? 'text-[16px]' : 'text-[15px]'}`}>
                {title}
            </h3>
            <h5 className={`font-[600] ${largeSize ? 'text-[18px]' : 'text-[16px]'}`}>
                { withDiscount && '- '}
                ¥ {amount}
            </h5>
        </div>
    )
}

export default AmountItemStyle