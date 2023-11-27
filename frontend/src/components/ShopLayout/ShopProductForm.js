import React from 'react'
import ModalLayout from '../Layout/ModalLayout'
import * as yup from "yup";
import { RxCross1 } from 'react-icons/rx'
import { categoriesData } from '../../static/data';
import { BiImageAdd } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Checkbox } from '@mui/material';


const ShopProductForm = ({heading, buttonText, submitHandler, formData, setFormData, withDiscount, setWithDiscount, images, setImages, setOpenForm, }) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUploadImgs = async (e) => {
        e.preventDefault();
		let files = Array.from(e.target.files);
        if(images.length + files.length > 4) { // check if exceed max count
            toast.error('上传失败, 最多上传4张商品图片', 4500)
        } 
        else if( !isValidFileType(files)) { // check if is correct file type
            toast.error('上传失败, 只能上传格式为 jpg、png、jpeg 的图片', 4500)
        } 
        else if( !isValidFileSize) { // check if exceed max file size
            toast.error('上传失败, 每张图片不能超过 3Mb', 4500)
        }
        else {    
            setImages((prevImages) => [...prevImages, ...files]);
        }
    }

    const isValidFileType = (files) => {
        let valid = true;
        files.forEach(file => {
            if(!['image/jpg', 'image/png', 'image/jpeg'].includes(file.type)) {
                valid = false
            };            
        });
        return valid
    }

    const isValidFileSize = (files) => {
        let valid = true;
        files.forEach(file => {
            const size = file.size / 1024 / 1024
            if (size > 3) {
                valid = false
            }          
        });
        return valid
    }

    const handleRemoveImg = (index) => {
        const allImgs  = [...images];
        const filterImgs = [];
        for(let i = 0 ; i < allImgs.length; i++) {
            if(i !== index) {
                filterImgs.push(allImgs[i]);
            }
        }
        setImages([...filterImgs]);
    }

    const handleSubmit = async (e) => {
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
                productInfo.discountPrice = formData.discountPrice;
            }
            const validProduct = await submitSchema.validate(productInfo);
            await submitHandler(validProduct);

        } catch (error) {
			toast.error(error.message);
		}
    }

    return (
        <ModalLayout setOpenForm={setOpenForm} optionStyle='600px:my-auto 600px:max-w-[700px] '>
            <div className='w-full flex items-center gap-4 mt-3 mb-1 600px:my-3'>
                <div onClick={() => setOpenForm(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
                    <RxCross1 size={20}/>
                </div>
                <h1 className='font-[500] text-[20px]'>{heading}</h1>
            </div>

            {/* Add Product Form */}
            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full px-2 py-2 flex flex-col gap-4 600px:gap-5">
                    <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row 600px:items-center '>
                        <label className='w-[70px]'>商品名称</label>
                        <input type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder='最多允许输入30个汉字（60个字符）' className='input 600px:flex-1'/>
                    </div>

                    <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row 600px:items-center'>
                        <label className='w-[70px]'>商品类型</label>
                        <select className="input !px-1 600px:flex-1" name='category' value={formData.category} onChange={handleInputChange} >
                            <option value="">请选择商品所属类型</option>
                            { categoriesData?.map(i => 
                            <option value={i.category} key={i.category}> {i.title} </option>
                            ) }
                        </select>
                    </div>

                    <div className='normalFlex gap-[40px]'>
                        <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row 600px:items-center '>
                            <label className='w-[70px]'>商品价格</label>
                            <div className='600px:flex-1'>
                                <input type='number' name='originalPrice' value={formData.originalPrice} onChange={handleInputChange} className='input !w-[80px] mr-[6px]'/>
                                元
                            </div>
                        </div>
                        <div className='flex items-start'>
                            <Checkbox checked={withDiscount} onChange={() => setWithDiscount(!withDiscount)} sx={{'& .MuiSvgIcon-root':{fontSize: 22}, }} className='relative -top-[6px] 600px:top-0'/>
                            <div className={`flex flex-col gap-1 600px:gap-2 600px:flex-row 600px:items-center ${!withDiscount && 'text-[#b8b8b8]'}`}>
                                <label className='w-[50px]' htmlFor='discountPrice'>
                                    折扣价
                                </label>
                                <div className='600px:flex-1'>
                                    <input type='number' id='discountPrice' disabled={!withDiscount} value={formData.discountPrice} name='discountPrice' onChange={handleInputChange} className='input !w-[80px] mr-[6px]'/>
                                    元
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row 600px:items-center '>
                        <label className='w-[70px]'>库存量</label>
                        <div className='600px:flex-1'>
                            <input type='number' value={formData.stock} name='stock' onChange={handleInputChange} className='input !w-[80px] mr-[6px]'/>
                            件
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 600px:gap-2 600px:flex-row pt-[2px]'>
                        <label className='w-[70px] 600px:pt-2'>详情描述</label>
                        <textarea type="text" value={formData.description} name='description' onChange={handleInputChange} placeholder='方便用户进一步了解商品' 
                            className='600px:flex-1 w-full border px-2 py-2 rounded-[5px] border-[#cccccc] h-[150px] resize-none text-[15px] placeholder:text-[#c8c8c8]' />
                    </div>

                    <div className='flex flex-col gap-2 600px:flex-row -mt-1'>
                        <label className='w-full 600px:w-[70px]'>商品图片</label>
                        <div className='600px:flex-1'>
                            <p className='text-[13px] text-[#949494] 600px:mt-[2px] mb-3'>
                                最多允许上传 4张图片；每张图片大小不能超过 3Mb；只能上传格式为 jpg、png、jpeg 的图片. 
                            </p>
                            <input type="file" id="images" multiple onChange={handleUploadImgs} className="hidden" />
                            <div className="w-full grid grid-cols-auto-fill-120 gap-4">
                                {images?.map((i, index) => (
                                    <div className='h-[120px] w-[120px] border relative' key={index} >
                                        <img src={i?.url? i.url : URL.createObjectURL(i)} key={i} alt="" className="w-full h-full object-cover" />
                                        <span onClick={() => handleRemoveImg(index)} className='absolute top-[-10px] left-[-10px] w-[26px] h-[26px] rounded-full normalFlex justify-center cursor-pointer bg-[#eff3f4]'>
                                            <RxCross1 size={15}/>
                                        </span>
                                    </div>
                                ))}
                                <label htmlFor='images' className={`${images.length >= 4 && 'hidden'} w-[120px] h-[120px] border-[1.5px] border-dashed rounded-[5px] border-[#cccccc] cursor-pointer`}>
                                    <div className='w-full h-full normalFlex flex-col justify-center'>
                                        <BiImageAdd size={36} color='#cccccc'/> 
                                        <h2 className='text-[14px] text-[#c8c8c8]'>上传添加图片</h2>
                                    </div>	
                                </label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className='w-[90%] h-11 my-3 mx-auto px-5 bg-[#78be20] text-white rounded-full font-[600] tracking-wider'>
                        { buttonText }
                    </button>

                </div>
            </form>
        </ModalLayout>  
    )
}

const submitSchema = yup.object().shape({
    images: yup.array().test({
        message: "请上传商品图片",
        test: arr => arr.length > 0
    }),
    description: yup.string().required("商品介绍不能为空"),
    stock: yup.number().typeError('请填写库存').required("请填写库存").integer("库存数量必须是整数").positive("库存不能小于0件").max(100000, "库存不能大于100,000件"),
    discountPrice: yup.number().typeError('请填写折扣价格').lessThan(yup.ref('originalPrice'), "折扣价格不能低于原价"),
	originalPrice: yup.number().typeError('请填写价格').required("请填写价格").positive("价格必须大于0元"),
	category: yup.string().required("请选择商品类型"),
	name: yup.string().required("商品名称不能为空").max(60, '商品名称不能多于30个汉字 (60个字符)'),
});


export default ShopProductForm