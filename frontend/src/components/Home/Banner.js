import React from 'react'
import { Link } from 'react-router-dom'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

const Banner = () => {
	return (
		<div className='w-full grid grid-cols-4 grid-rows-2 gap-3 section bg-white my-7'>
			<div className='col-span-4 row-span-2 900px:col-span-2'>
				<Swiper 
					navigation={true}
					pagination={{ clickable: true, }} 
					lazy="true" 
					modules={[Autoplay, Pagination]} 
					className="w-full h-full"
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					loop={true}
					>
					{ mainBannerData?.map((i, index) => 
					<SwiperSlide key={index} className='mb-auto rounded-lg shadow-sm'>
						<div className='relative w-full h-full'>
							<img src={i?.image} alt={`banner-main-${index}`} className='rounded-lg h-full object-cover object-right'/>
							<div className='absolute main-banner-content'>
								<h4>{i?.label}</h4>
								<h5>{i?.name}</h5>
								<p>{i.description}</p>
								<Link to={i?.url} className='button'>立即抢购</Link>
							</div>
						</div>
					</SwiperSlide>
					)}
					{ vibeBannerData?.map((i, index) => 
					<SwiperSlide key={index + mainBannerData?.length} className='mb-auto rounded-lg shadow-sm'>
						<div className='relative w-full h-full'>
							<img src={i?.image} alt={`banner-vibe-${index}`} className='rounded-lg h-full object-cover object-right'/>
							<div className='absolute main-banner-content'>
								<h4>{i?.label}</h4>
								<h5>{i?.name}</h5>
								<p>{i.description}</p>
							</div>
						</div>
					</SwiperSlide>
					)}

				</Swiper>
			</div>

			{vibeBannerData?.map((item, index) => 
			<div className='hidden 900px:block col-span-1 relative min-h-[160px] 1000px:min-h-[200px]' key={index}>
				<img src={item?.image} alt={`banner-vibe-${index}`} className='rounded-lg h-full object-cover object-right'/>
				<div className='absolute vibe-banner-content'>
					<h4>{item?.label}</h4>
					<h5>{item?.name}</h5>
					<p>{item?.description}</p>
				</div>
			</div>
			)}
		</div>
	)
}

const mainBannerData = [
	{
		label: '新品好货',
		name: 'Tyrrells 手工薯片',
		description: '多种口味随心选.',
		image: 'https://res.cloudinary.com/dewmfc2io/image/upload/v1700587939/mern-supermarket/banners/banner-4_dpyrj0.png',
		url: '/products?searchStr=Tyrrells'
	},
];

const vibeBannerData = [
	{
		label: '进口水果',
		name: '圆圆哈密瓜',
		description: '',
		image: 'https://res.cloudinary.com/dewmfc2io/image/upload/v1700587940/mern-supermarket/banners/banner-6_e8ypis.png'
	},
	{
		label: '人气商品',
		name: '桃子布丁',
		description: '',
		image: 'https://res.cloudinary.com/dewmfc2io/image/upload/v1700587940/mern-supermarket/banners/banner-2_hfxt0l.png'
	},
	{
		label: '低价超值',
		name: '纸巾享85折',
		description: '',
		image: 'https://res.cloudinary.com/dewmfc2io/image/upload/v1700587938/mern-supermarket/banners/banner-7_r8miwr.png'
	},
	{
		label: '快递包邮',
		name: '全场满¥99免运费',
		description: '',
		image: 'https://res.cloudinary.com/dewmfc2io/image/upload/v1700587940/mern-supermarket/banners/banner-1_zrcjjb.png'
	},
];

export default Banner