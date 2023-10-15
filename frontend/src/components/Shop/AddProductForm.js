import React, { useEffect, useState } from 'react'
import ShopProductForm from '../ShopLayout/ShopProductForm';
import { toast } from 'react-toastify';
import { useAddProductMutation } from '../../redux/features/shop/shopApi';


const AddProductForm = ({setOpenAddForm}) => {
    const [images, setImages] = useState([]);
    const [withDiscount, setWithDiscount] = useState(false);
    const [formData, setFormData] = useState({
		name: '',
		category: '',
		description: '',
		originalPrice: '',
		discountPrice: '',
		stock: '',
	});
    const [addProduct, {isLoading, isSuccess, isError, error}] = useAddProductMutation();
	
    useEffect(() => {
		if(isSuccess) {
			toast.success("商品添加成功");
			setOpenAddForm(false);
		}
		if(isError) {
			toast.error(error?.data?.message);
		}
	},[isSuccess, isError]);


    const handleAddProduct = async (validProduct) => {
        const newFormData = new FormData();
        for(let key in validProduct) {
            if(key === 'images') {
                images.forEach((image) => {
                    newFormData.append("images", image);
                });
            }
            else newFormData.append(key, validProduct[key]);
        }
        await addProduct(newFormData);
    }

    return (
        <ShopProductForm 
        	heading='添加新商品'
			formData={formData}
			setFormData={setFormData}
			images={images}
			setImages={setImages}
			withDiscount={withDiscount}
			setWithDiscount={setWithDiscount}
			setOpenForm={setOpenAddForm}
            submitHandler={handleAddProduct}
			buttonText={isLoading ? '创建中...' : '保存'}
		/>
    )
}

export default AddProductForm