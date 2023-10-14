import React, { useEffect, useState } from 'react'
import * as yup from "yup";
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


    const handleAddProduct = async (e) => {
        e.preventDefault();
		try{
            const productInfo = {
                name: formData.name.trim(),
                category: formData.category,
                description: formData.description.trim(),
                originalPrice: formData.originalPrice,
                stock: formData.stock,
                images,
            };
            if(withDiscount) {
                productInfo.discountPrice = formData.discountPrice.trim();
            }
            const validProduct = await submitSchema.validate(productInfo);

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
		} catch(error) {
			toast.error(error.message);
		} 
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
			handleSubmit={handleAddProduct}
		>
			<button type="submit" className='w-[90%] h-11 my-3 mx-auto px-5 bg-[#78be20] text-white rounded-full font-[600] tracking-wider'>
                { isLoading ? '创建中...' : '保存' }
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


export default AddProductForm