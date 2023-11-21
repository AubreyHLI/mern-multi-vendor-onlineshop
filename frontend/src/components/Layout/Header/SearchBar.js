import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchData, setSearchData] = useState([]);
    const { products } = useSelector(state => state.products);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        const filteredProducts = products.filter( p => 
            p?.name?.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchData(filteredProducts);
    }

    const handleClick = (url) => {
        navigate(url);
        setSearchInput("");
    }

    const handleSearch = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let searchStr = searchInput?.trim();
        if(searchStr !== '') {
            navigate(`/products?searchStr=${searchStr}`);
            setSearchInput("");
        }
    }

    return (
        <div className='w-[60%] 600px:w-[40%]'>
            <div className='relative w-full '>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="搜索商品" value={searchInput} onChange={handleSearchChange} className="h-[40px] w-full px-3 hover:border-[#3957db] border-[2px] rounded-md" />
                    <button type='submit' className="absolute right-[10px] top-2 cursor-pointer hover:text-[#78be20]">
                        <AiOutlineSearch size={24} />
                    </button>
                </form>
         
                { searchData?.length !== 0 && searchInput
                ? <div className='absolute w-full shadow-sm-2 border border-[2px] border-t-0 bg-[#fff] min-h-[30vh] z-[9]'>
                    { searchData?.map((item, index) => 
                    <div onClick={() => handleClick(`/product/${item._id}`)} key={index} className="cursor-pointer hover:bg-[#eeeeee] w-full px-2" >
                        <div className="w-full flex items-start-py-3 py-1 border-t border-t-slate-200">
                            <img src={item?.images[0]?.url} alt="" className="w-[40px] h-[40px] mr-[10px] object-cover"/>
                            <p className='line-clamp-1 text-[14px] 600px:text-[15px]'>
                                {item?.name}
                            </p>
                        </div>
                    </div>
                    )}
                    </div>
                : null }
            </div>
        </div>
    )
}

export default SearchBar