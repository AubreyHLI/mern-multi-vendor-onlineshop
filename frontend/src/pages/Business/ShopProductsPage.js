import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import ShopProductCard from '../../components/Shop/ShopProductCard';
import AddProductForm from '../../components/Shop/AddProductForm';
import { useDeleteProductMutation } from '../../redux/features/shop/shopApi';
import { toast } from 'react-toastify';
import ShopProductsTable from '../../components/Shop/ShopProductsTable';
import EditProductForm from '../../components/Shop/EditProductForm';

const ShopProductsPage = () => {
    const {setActive} = useOutletContext();
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const { shopProducts } = useSelector(state => state.shop);
    const [deleteProduct, {isLoading, isSuccess, isError, error}] = useDeleteProductMutation();

	useEffect(() => {
		setActive(1);
		window.scrollTo(0,0);
	}, [])

    useEffect(() => {
		if(isSuccess) {
			toast.success('该商品删除成功')
		}
		if(isError) {
			toast.error(`抱歉，${error?.data?.message}`)
		}
	}, [isSuccess, isError])


    const handleDeleteProduct = async (productId) => {
        const answer = window.confirm('确认删除该商品？');
        if(!answer) {
            return
        } else {
            await deleteProduct(productId);
        }
    }

    const handleEditProduct = async (productId) => {
        const data = shopProducts?.find(item => item?._id == productId);
        setEditData({...data});
        setOpenEdit(true);
    }

    return (
        <div className='w-full my-3'>   
            <h1 className="text-[20px] px-2 800px:text-[22px] 800px:px-0">店铺商品</h1> 
            
            <div className='normalFlex justify-end gap-2 '>
                <h4 className='text-[15px]'>全部商品( {shopProducts?.length} )</h4>
                <button onClick={() => setOpenAddForm(true)} className="p-2 rounded-lg text-white bg-pink-400 normalFlex gap-1" >
                    <MdAdd size={20}/>
                    <span className="mr-2 text-[14px] 800px:text-[15px]">创建新商品</span>
                </button>
            </div>
            
            {/* mobile screen */}
            <div className="grid grid-cols-1 600px:grid-cols-auto-fill-245 gap-3 600px:gap-[20px] mt-2 mb-6 600px:mt-4 800px:hidden">
                { shopProducts?.map(item => 
                <ShopProductCard data={item} key={item?._id} onDeleteProduct={handleDeleteProduct} onEditProduct={handleEditProduct} />)}
            </div>

            {/* large screen */}
            <div className='w-full hidden 800px:block mt-4'>
                <ShopProductsTable onDeleteProduct={handleDeleteProduct} onEditProduct={handleEditProduct} />
            </div>


            {openAddForm && <AddProductForm setOpenAddForm={setOpenAddForm} />}

            {openEdit && <EditProductForm setOpenEdit={setOpenEdit} data={editData} />}
        </div>
    )
}

export default ShopProductsPage