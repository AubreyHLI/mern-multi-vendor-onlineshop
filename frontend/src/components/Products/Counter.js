import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa';
import IntegarInput from '../atoms/IntegarInput';

const Counter = ({count, setCount, stock}) => {

    const incrementCount = () => {
        setCount(Number(count) + 1);
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(Number(count) - 1);
        }
    };

    return (
        <div className='normalFlex justify-between gap-3'>
            <div className='border normalFlex border-[#cccccc]'>
                <button onClick={decrementCount} className={`${count < 2 ? 'text-[#cccccc]': 'text-[#666666]'} bg-[#ededed] w-[24px] h-[30px] normalFlex justify-center cursor-pointer`}>
                    <FaMinus size={12} />
                </button>
                <IntegarInput inputValue={count} setInputValue={setCount} id='count' min={1}  max={stock} optionStyle='!w-[50px] !px-0 !h-[30px] !rounded-none !border-y-0 text-center focus:outline-none'/>
                <button onClick={incrementCount} className={`${count < stock ? 'text-[#666666]' : 'text-[#bcbcbc]'} bg-[#ededed] w-[24px] h-[30px] normalFlex justify-center cursor-pointer`}>
                    <FaPlus size={13} />
                </button>
            </div>
            <span>件</span>
        </div>
    )
}

export default Counter