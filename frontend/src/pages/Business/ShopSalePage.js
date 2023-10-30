import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import AddCouponForm from '../../components/Shop/AddCouponForm';
import CouponCard from '../../components/Coupons/CouponCard';
import ShopCouponCard from '../../components/Shop/ShopCouponCard';

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
            <h1 className="text-[20px] px-2 800px:text-[22px] 800px:px-0 ">店铺优惠券</h1> 
            
            <div className='normalFlex justify-end gap-2 '>
                <h4 className='text-[15px]'>全部优惠券( {shopCoupons?.length} )</h4>
                    <button onClick={() => setOpenAddForm(true)} className="p-2 rounded-lg text-white bg-orange-400 normalFlex gap-1" >
                    <MdAdd size={20}/>
                    <span className="mr-2 text-[14px] 800px:text-[15px]">创建新优惠券</span>
                </button>
            </div>            
            
            <div className="grid grid-cols-auto-fill-245 800px:grid-cols-auto-fill-280 gap-x-3 gap-y-[20px] mb-6 mt-4">
                { shopCoupons?.map(item => 
                <ShopCouponCard data={item} key={item?._id} />)}
            </div>

            {openAddForm && <AddCouponForm setOpenAddForm={setOpenAddForm} />}
        </div>
        
    )
}

export default ShopSalePage