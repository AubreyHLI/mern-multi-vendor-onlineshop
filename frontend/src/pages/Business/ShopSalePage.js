import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import AddCouponForm from '../../components/Shop/AddCouponForm';
import CouponCard from '../../components/Coupons/CouponCard';

const ShopSalePage = () => {
    const {setActive} = useOutletContext();
    const [openAddForm, setOpenAddForm] = useState(false);
    const { shopCoupons } = useSelector(state => state.shop);

	useEffect(() => {
		setActive(4);
		window.scrollTo(0,0);
	}, [])

    return (
        <div className='w-full my-3'>   
            <h1 className="text-[20px] 600px:text-[22px] px-2 mb-4">店铺优惠券</h1> 
            
            <div className='w-full px-2 mb-2'>
                <h4 className='text-[15px]'>全部优惠券( {shopCoupons?.length} )</h4>
            </div>

            <button onClick={() => setOpenAddForm(true)} className="p-2 rounded-lg text-white bg-orange-400 normalFlex gap-1" >
                <MdAdd size={20}/>
                <span className="mr-2 text-[14px] 600px:text-[15px]">创建新优惠券</span>
            </button>
            
            <div className="grid grid-cols-1 600px:grid-cols-auto-fill-245 gap-3 600px:gap-[20px] mt-2 mb-6 600px:mt-4">
                { shopCoupons?.map(item => 
                <CouponCard data={item} key={item?._id} isSeller={true}/>)}
            </div>

            {openAddForm && <AddCouponForm setOpenAddForm={setOpenAddForm} />}
        </div>
        
    )
}

export default ShopSalePage