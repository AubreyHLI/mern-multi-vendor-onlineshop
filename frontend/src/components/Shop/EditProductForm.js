import React, { useEffect, useState } from 'react'
import * as yup from "yup";
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


	const handleUpdateProduct = async (e) => {
		e.preventDefault();
		try {
			const productInfo = {
                name: formData.name.trim(),
                category: formData.category,
                description: formData.description.trim(),
                originalPrice: formData.originalPrice,
                stock: formData.stock,
                images,
            };
            if(withDiscount) {
                productInfo.discountPrice = formData.discountPrice;
            }
            const validProduct = await submitSchema.validate(productInfo);

			const newFormData = new FormData();
			for(let key in validProduct) {
				if(key === 'images') {
                    images.forEach((image) => {
						if(image?.url) {
							console.log(image);
							let index = data?.images.findIndex(i => i._id == image._id);
							console.log(index);
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
		} catch (error) {
			toast.error(error.message);
		}
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
			handleSubmit={handleUpdateProduct}
		>
			<button type="submit" className='w-[90%] h-11 my-3 mx-auto px-5 bg-[#78be20] text-white rounded-full font-[600] tracking-wider'>
				{ isLoading ? '保存中...' : '保存' }
			</button>
		</ShopProductForm>
    )
}

const submitSchema = yup.object().shape({
    images: yup.array().test({
        message: "请上传商品图片",
        test: arr => arr.length > 0
    }),
    description: yup.string().required("商品介绍不能为空"),
    stock: yup.number().typeError('库存数无效，请重新填写').required("请填写库存").integer("库存数量必须是整数").positive("库存不能小于0件").max(100000, "库存不能大于100,000件"),
    discountPrice: yup.number().typeError('折扣价无效，请重新填写').lessThan(yup.ref('originalPrice'), "折扣价格不能低于原价"),
	originalPrice: yup.number().typeError('价格无效，请重新填写').required("请填写价格").positive("价格必须大于0元"),
	category: yup.string().required("请选择商品类型"),
	name: yup.string().required("商品名称不能为空").max(60, '商品名称不能多于30个汉字 (60个字符)'),
});

export default EditProductForm