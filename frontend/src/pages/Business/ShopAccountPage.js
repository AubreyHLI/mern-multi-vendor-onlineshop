import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShopAccountDetail from '../../components/Shop/ShopAccountDetail';


const ShopAccountPage = () => {
    const { setActive } = useOutletContext();
    const { shop } = useSelector(state => state.shopAuth);
    const [openCouponList, setOpenCouponsList] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);

	useEffect(() => {
		setActive(6);
		window.scrollTo(0,0);
	}, [])


    return (
        <div className="w-full my-3 ">
             <h1 className="text-[20px] 600px:text-[22px] 800px:text-[24px] ">
                店铺账号信息
            </h1> 
				
            <div className='w-full mt-3'>
                <ShopAccountDetail />
            </div>

		</div>
    )
}

export default ShopAccountPage