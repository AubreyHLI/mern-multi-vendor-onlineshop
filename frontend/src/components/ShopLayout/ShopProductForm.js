import React from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { RxCross1 } from 'react-icons/rx'
import { categoriesData } from '../../static/data';
import { BiImageAdd } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Checkbox } from '@mui/material';


const ShopProductForm = ({children, heading, formData, setFormData, withDiscount, setWithDiscount, images, setImages, setOpenForm, handleSubmit}) => {

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

    return (
        <ModalLayout optionStyle='500px:my-auto 500px:max-w-[700px] '>
            <div className='w-full flex items-center gap-4 mt-3 mb-1 500px:my-3'>
                <div onClick={() => setOpenForm(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
                    <RxCross1 size={20}/>
                </div>
                <h1 className='font-[500] text-[20px]'>{heading}</h1>
            </div>

            {/* Add Product Form */}
            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full px-2 py-2 flex flex-col gap-4 500px:gap-5">
                    <div className='flex flex-col gap-1 600px:gap-2 500px:flex-row 500px:items-center '>
                        <label className='w-[70px]'>商品名称</label>
                        <div className='flex-1'>
                            <input type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder='最多允许输入30个汉字（60个字符）' className='input'/>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 600px:gap-2 500px:flex-row 500px:items-center'>
                        <label className='w-[70px]'>商品类型</label>
                        <div className='flex-1'>
                            <select className="input !px-1" name='category' value={formData.category} onChange={handleInputChange} >
                                <option value="Choose a brand">请选择商品所属类型</option>
                                { categoriesData?.map(i => 
                                <option value={i.category} key={i.category}> {i.title} </option>
                                ) }
                            </select>
                        </div>
                    </div>

                    <div className='normalFlex gap-[40px]'>
                        <div className='flex flex-col gap-1 600px:gap-2 500px:flex-row 500px:items-center '>
                            <label className='w-[70px]'>商品价格</label>
                            <div className='flex-1'>
                                <input type='text' name='originalPrice' value={formData.originalPrice} onChange={handleInputChange} className='input !w-[80px] mr-[6px]'/>
                                元
                            </div>
                        </div>
                        <div className='flex items-start'>
                            <Checkbox checked={withDiscount} onChange={() => setWithDiscount(!withDiscount)} sx={{'& .MuiSvgIcon-root':{fontSize: 22}, }} className='relative -top-[6px] 500px:top-0'/>
                            <div className={`flex flex-col gap-1 600px:gap-2 500px:flex-row 500px:items-center ${!withDiscount && 'text-[#b8b8b8]'}`}>
                                <label className='w-[50px]' htmlFor='discountPrice'>
                                    折扣价
                                </label>
                                <div className='flex-1'>
                                    <input type='text' id='discountPrice' disabled={!withDiscount} value={formData.discountPrice} name='discountPrice' onChange={handleInputChange} className='input !w-[80px] mr-[6px]'/>
                                    元
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 600px:gap-2 500px:flex-row 500px:items-center '>
                        <label className='w-[70px]'>库存量</label>
                        <div className='flex-1'>
                            <input type='text' value={formData.stock} name='stock' onChange={handleInputChange} className='input !w-[80px] mr-[6px]'/>
                            件
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 600px:gap-2 500px:flex-row pt-[2px]'>
                        <label className='w-[70px] 500px:pt-2'>详情描述</label>
                        <div className='flex-1'>
                            <textarea type="text" value={formData.description} name='description' onChange={handleInputChange} placeholder='方便用户进一步了解商品' 
                            className='w-full border px-2 py-2 rounded-[5px] border-[#cccccc] h-[150px] resize-none text-[15px] placeholder:text-[#c8c8c8]' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 500px:flex-row -mt-1'>
                        <label className='w-full 500px:w-[70px]'>商品图片</label>
                        <div className='flex-1'>
                            <p className='text-[13px] text-[#949494] 500px:mt-[2px] mb-3'>
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

                    {children}

                </div>
            </form>
        </ModalLayout>  
    )
}

export default ShopProductForm