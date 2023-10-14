import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShopProductCard from '../../components/Shop/ShopProductCard';
import { MdAdd } from 'react-icons/md';
import AddProductForm from '../../components/Shop/AddProductForm';

const ShopProductsPage = () => {
    const {setActive} = useOutletContext();
    const { shopProducts } = useSelector(state => state.shop);
    const [openAddForm, setOpenAddForm] = useState(false);

	useEffect(() => {
		setActive(1);
		window.scrollTo(0,0);
	}, [])

    return (
        <div className='w-full my-3'>   
            <h1 className="text-[20px] 600px:text-[22px] px-2">店铺商品</h1> 
            <div className='normalFlex justify-end gap-2 '>
                <h4 className='text-[15px]'>全部商品( {shopProducts?.length} )</h4>
                <button onClick={() => setOpenAddForm(true)} className="p-2 rounded-lg text-white bg-pink-400 normalFlex gap-1" >
                    <MdAdd size={20}/>
                    <span className="mr-2 text-[14px] 600px:text-[15px]">创建新商品</span>
                </button>
            </div>
            
            <div className="grid grid-cols-1 600px:grid-cols-auto-fill-245 gap-3 600px:gap-[20px] mt-2 mb-6 600px:mt-4">
                { shopProducts?.map(item => 
                <ShopProductCard data={item} key={item?._id} />)}
            </div>

            {openAddForm && <AddProductForm setOpenAddForm={setOpenAddForm} />}
        </div>
    )
}

export default ShopProductsPage