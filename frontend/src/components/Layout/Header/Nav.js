import React from 'react'
import DropDown from './DropDown';
import { Link } from 'react-router-dom'
import { BiMenuAltLeft } from "react-icons/bi";
import { categoriesData, navItems } from "../../../static/data";

const Nav = ({activeHeading, dropDown, setDropDown}) => {
	
	return (
		<div className='section relative flex justify-between h-full '>
			{/* categories box*/}
			<button onClick={() => setDropDown(!dropDown)} className="relative h-full w-[210px] hidden 600px:block">
				<BiMenuAltLeft size={28} className="absolute top-[10px]" />
				<span className='h-[100%] w-full flex justify-between items-center pl-[40px] font-sans text-lg font-[500] select-none rounded-t-md text-[#333333]' >
					分类
				</span>
				{ dropDown && <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />}
			</button>
			
			{/* navitems */}
			<div className='normalFlex'>
				<div className='flex flex-col items-start 600px:flex-row 600px:items-end 600px:h-full gap-3 1000px:text-[18px]'>
				{ navItems && navItems.map((item,index) => (
					<div key={index} className={`${activeHeading === index + 1 ? "bg-lime-500 text-white" : "bg-white text-[#333333]"} normalFlex 600px:h-[40px] font-[500] px-4 600px:px-2 min-w-fit cursor-pointer }`}>
						<Link to={item.url}>
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

