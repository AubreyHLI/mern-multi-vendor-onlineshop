import React from "react";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data";

const Categories = () => {
    return (
        <div id="categories" className='section bg-white p-6 rounded-lg my-6 600px:my-12'>
            <div className="grid grid-cols-auto-fill-120 600px:grid-cols-auto-fill-145 gap-x-[30px] gap-y-[10px]">
                { categoriesData?.map(i => 
                <Link to={`/products?category=${i.category}`} className="w-full h-[50px] 600px:h-[80px] flex items-center justify-around overflow-hidden" key={i.id}>
                    <h5 className={`text-[14px] w-[60px] 600px:text-[16px] 600px:w-[80px] font-[500] text-[#383838] leading-[1.3]`}>{i?.title}</h5>
                    <img className="w-[45px] 600px:w-[65px] object-cover ml-[10px]" alt="" src={i?.image_Url}/>
                </Link>
                )}
            </div>
        </div>
    );
};

export default Categories;