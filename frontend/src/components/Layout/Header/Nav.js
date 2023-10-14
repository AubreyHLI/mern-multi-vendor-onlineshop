import React from 'react'
import DropDown from './DropDown';
import { Link } from 'react-router-dom'
import { BiMenuAltLeft } from "react-icons/bi";
import { categoriesData, navItems } from "../../../static/data";

const Nav = ({activeHeading, dropDown, setDropDown}) => {
	
	return (
		<div className='section relative flex justify-between h-full '>
			{/* categories box*/}
			<button onClick={() => setDropDown(!dropDown)} className="relative h-full w-[210px] hidden 800px:block">
				<BiMenuAltLeft size={28} className="absolute top-[10px]" />
				<span className='h-[100%] w-full flex justify-between items-center pl-[40px] font-sans text-lg font-[500] select-none rounded-t-md text-[#333333]' >
					分类
				</span>
				{ dropDown && <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />}
			</button>
			
			{/* navitems */}
			<div className='normalFlex'>
				<div className='flex flex-col items-start 800px:flex-row 800px:items-end 800px:h-full gap-[30px] 800px:gap-3 text-lg'>
				{ navItems && navItems.map((item,index) => (
					<div key={index} className={`${activeHeading === index + 1 ? "bg-lime-500 text-white" : "bg-white text-[#333333]"} normalFlex 800px:h-[40px] font-[500] px-4 cursor-pointer}`}>
						<Link to={item.url} >
							{item.title}
						</Link>
					</div>
					))
				}
				</div>
			</div>

		</div>
	)
}

export default Nav

