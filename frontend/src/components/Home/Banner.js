import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
	return (
		<div className='normalFlex relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat'
			style={{ backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)" }}>
			<div className='section w-[90%] 800px:w-[60%]'>
				<h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
					Best Collection for <br /> home Decoration
				</h1>
				<p className="pt-5 w-full max-w-[600px] text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, assumenda? Quisquam itaque
					exercitationem labore vel, dolorequidem asperiores, laudantium temporibus soluta optio consequatur{" "}
					aliquam deserunt officia. Dolorum saepe nulla provident.
				</p>
				<Link to="/products" className="inline-block mt-6">
					<div className='button !bg-[#f1c500] !text-[#2d333a]'>
						<span className="">
							Shop Now
						</span>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default Banner