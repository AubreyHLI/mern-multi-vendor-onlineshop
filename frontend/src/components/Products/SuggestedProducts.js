import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import SuggestedProductCard from './SuggestedProductCard';


const SuggestedProducts = ({data}) => {
    const [suggests, setSuggests] = useState(null);    
    const { products } = useSelector(state => state.products);

    useEffect(() => {
        const d = products?.filter(i => i.category === data?.category && i._id !== data?._id);
        setSuggests(d.slice(0,6));
    }, [data?._id]);
    
    return (
        <div className='py-4 w-full'>
            <h2 className='text-[24px] font-[500] border-b mb-5'>
                产品推荐
            </h2>
            <div className="grid grid-cols-auto-fill-150 600px:grid-cols-auto-fill-170 gap-3 mt-2 mb-6 ">
                { suggests && suggests?.map((i,index) => <SuggestedProductCard data={i} key={index} />) }
            </div>
        </div>
    );
}

export default SuggestedProducts