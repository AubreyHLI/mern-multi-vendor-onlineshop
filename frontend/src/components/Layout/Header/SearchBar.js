import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchBar = ({ isSidebar }) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchData, setSearchData] = useState(null);
    const { products } = useSelector(state => state.products);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        const filteredProducts = products.filter( p => 
            p.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchData(filteredProducts);
    }

    return (
        <div className={isSidebar ? 'w-full relative my-7 px-2 h-[40px]' : 'w-[45%] relative hidden 800px:block'}>
            <input type="text" placeholder="Search Product..." value={searchInput} onChange={handleSearchChange} className="h-[40px] w-full px-3 hover:border-[#3957db] border-[2px] rounded-md" />
            <AiOutlineSearch size={30} className="absolute right-3 top-1.5 cursor-pointer" />
            
            { searchData && searchData.length !== 0 && searchInput
            ? <div className={`absolute w-full shadow-sm-2 p-4 divide-y divide-slate-200 ${isSidebar ? 'h-[100vh] bg-[#fff] z-10  pr-10':'min-h-[30vh] bg-slate-50 z-[9]'}`}>
                { searchData && searchData.map((item, index) => 
                <div className="py-1">
                    <Link to={`/product/${item._id}`}>
                        <div className="w-full flex items-start-py-3">
                            {/* <img src={`${BACKEND_URL}${item?.images[0]}`} alt="" className="w-[40px] h-[40px] mr-[10px]"/> */}
                            <h1>{item.name}</h1>
                        </div>
                    </Link>
                </div>
                )}
                </div>
            : null }
        </div>
    )
}

export default SearchBar