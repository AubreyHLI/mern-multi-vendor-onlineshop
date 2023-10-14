import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const PwInput = ({label, id, password, setPassword, visible, setVisible}) => {
  return (
    <div className="flex flex-col gap-[6px] w-full relative">
        <label htmlFor={id} className='w-max'>
          {label}
        </label>
        <input type={visible ? "text" : "password"} id={id} autoComplete="current-password"  value={password} onChange={(e) => setPassword(e.target.value)} className="input"/>
        { visible 
        ? <AiOutlineEye className="absolute right-3 top-[40px] cursor-pointer text-gray-700" size={21} onClick={() => setVisible(false)}/>
        : <AiOutlineEyeInvisible className="absolute right-3 top-[40px] cursor-pointer text-gray-700" size={21} onClick={() => setVisible(true)}/>
        }
    </div>
  )
}

export default PwInput