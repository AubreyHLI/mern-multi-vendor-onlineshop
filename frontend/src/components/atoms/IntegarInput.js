import React from 'react'

const IntegarInput = ({inputValue, setInputValue, optionStyle, id, max, min}) => {

    const handleChange = (e) => {
        const { value } = e.target;

        if(/^[0-9]\d*$/.test(value)) {
            if(value > max) {
                setInputValue(max)
            } else if(value < min) {
                setInputValue(min)
            } else {
                setInputValue(value);
            }
        }
        if(value === '') {
            setInputValue('');
        }
    }
    
    return (
        <input type='text' id={id} value={inputValue} onChange={handleChange} className={`input ${optionStyle}`} />
    )
}

export default IntegarInput