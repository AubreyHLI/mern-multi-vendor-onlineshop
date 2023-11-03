import React from 'react';
import { IoBagHandleOutline } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import WishlistItem from './WishlistItem';

const Wishlist = ({setOpenWishlist}) => {
    const { wishlist } = useSelector(state => state.user);

    return (
    <div className="fixed top-0 left-0 w-full min-w-[360px] bg-[#0000004b] h-screen z-10">
        <div className="fixed top-0 right-0 h-full w-[90%] min-w-[300px] 500px:w-[350px] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
            <div className="w-full h-full">
                <div className="normalFlex w-full h-[65px] justify-between px-5 bg-white">
                    {/* Item length */}
                    <div className='normalFlex'>
                        <IoBagHandleOutline size={24} />
                        <h5 className="pl-2 text-[18px] font-[500]">收藏夹<span className='text-[16px]'>({wishlist?.length})</span></h5>
                    </div>
                    <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpenWishlist(false)} />
                </div>
                { wishlist?.length === 0 
                ? <div className='widhlist_content flex items-center justify-center'>
                    <h5>收藏夹为空!</h5>
                </div>
                : <div className='wishlist_content'>
                    <div className="w-full border-t">
                        {wishlist?.map((item, index) => (<WishlistItem key={index} data={item}/>))}
                    </div>
                </div>
                }
            </div>
           
        </div>
    </div>
    )
}

export default Wishlist