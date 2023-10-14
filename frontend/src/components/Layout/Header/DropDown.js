import React from 'react'
import { useNavigate } from 'react-router-dom'

const DropDown = ({categoriesData, setDropDown}) => {
	const navigate = useNavigate();

	const handleClickDropDownItem = (item) => {
		navigate(`/products?category=${item.category}`);
		setDropDown(false);
	}

	return (
		<div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm left-[-10px]">
			{ categoriesData?.map((item, index) => 
			<div key={index} className='normalFlex' onClick={() => handleClickDropDownItem(item)}>
				<img src={item.image_Url} alt=" " style={{ width: "25px", height: "25px", objectFit: "contain", marginLeft: "10px",  userSelect: "none" }}/>
				<h3 className="m-3 cursor-pointer select-none">{item.title}</h3>
			</div>)}
		</div>
	)
}

export default DropDown