import React, { useEffect, useState } from 'react'
import ShopProductForm from '../ShopLayout/ShopProductForm';
import { toast } from 'react-toastify';
import { useUpdateProductMutation } from '../../redux/features/shop/shopApi';


const EditProductForm = ({setOpenEdit, data}) => {
	const [images, setImages] = useState([...data?.images]);
    const [withDiscount, setWithDiscount] = useState(data?.discountPrice ? true : false);
	const [formData, setFormData] = useState({
		name: data?.name,
		category: data?.category,
		description: data?.description,
		originalPrice: data?.originalPrice,
		discountPrice: data?.discountPrice,
		stock: data?.stock,
	});
	const [updateProduct, {isLoading, isSuccess, isError, error}] = useUpdateProductMutation();

	useEffect(() => {
		if(isSuccess) {
			toast.success("商品信息更新成功");
			setOpenEdit(false);
		}
		if(isError) {
			toast.error(error?.data?.message);
		}
	},[isSuccess, isError]);


	const handleUpdateProduct = async (validProduct) => {
		const newFormData = new FormData();
		for(let key in validProduct) {
			if(key === 'images') {
				images.forEach((image) => {
					if(image?.url) {
						let index = data?.images.findIndex(i => i._id == image._id);
						newFormData.append("oldImagesIndex", index);
					} else {
						newFormData.append("newImages", image);
					}
				});
			} else if(validProduct[key] !== data[key]) {
				newFormData.append(key, validProduct[key]);
			}
		}
		await updateProduct({
			productId: data?._id,
			product: newFormData,
		});
	}

    return (
		<ShopProductForm 
        	heading='更改商品信息'
			formData={formData}
			setFormData={setFormData}
			images={images}
			setImages={setImages}
			withDiscount={withDiscount}
			setWithDiscount={setWithDiscount}
			setOpenForm={setOpenEdit}
			submitHandler={handleUpdateProduct}
			buttonText={isLoading ? '保存中...' : '保存'}
		/>
    )
}

export default EditProductForm