import React from 'react'

const CustomInput = ({label, type, id, value, setValue, isDisabled=false}) => {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      <label htmlFor={id} className='w-max'>{label}</label>
      <input type={type} id={id} className='input' value={value} onChange={(e) => setValue(e.target.value)} disabled={isDisabled} />
    </div>
  )
}

export default CustomInput