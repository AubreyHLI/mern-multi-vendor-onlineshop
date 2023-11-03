import React, { useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from './AddressCard';
import NewAddressForm from './NewAddressForm';
import EditAddressForm from './EditAddressForm';
import { setShippingAddress } from '../../redux/features/checkout/checkoutSlice';

const AddressSelector = ({setOpenAddressSelector}) => {
    const { addressBook } = useSelector(state => state.user);
    const { shippingAddress } = useSelector(state => state.checkout);

    const [openAddForm, setOpenAddForm] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(shippingAddress);
    const [editData, setEditData] = useState(null);
    const dispatch = useDispatch();
    

    const handleSubmit = async () => {
        dispatch( setShippingAddress(selectedAddress) );
        setOpenAddressSelector(false);
    }

    return (
        <ModalLayout optionStyle='600px:my-[60px] 600px:max-w-[700px] 600px:!h-[calc(100%-120px)]'>
            <div className='w-full flex items-center gap-4 mt-3 mb-1 600px:my-3'>
                <div onClick={() => setOpenAddressSelector(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
                    <RxCross1 size={20}/>
                </div>
                <h1 className='font-[500] text-[20px]'>选择收货地址</h1>
            </div>

            <fieldset className='w-full grid grid-cols-1 gap-2 700px:grid-cols-2 700px:gap-y-4 overflow-y-scroll py-3'>
                { addressBook?.addresses?.map((ad, index) => 
                <div key={index} className={`normalFlex gap-2 w-full ${ad?._id == shippingAddress?._id && 'order-first'}`}>
                    <input type='radio' id={ad?._id} name='selectedAddress' value={selectedAddress?.id} onChange={() => setSelectedAddress(ad)} checked={ad?._id == selectedAddress?._id} className='w-[20px] h-[20px] cursor-pointer'/>
                    <label htmlFor={ad?._id} className='w-full cursor-pointer'>
                        <AddressCard data={ad} optionStyle={selectedAddress?._id == ad?._id ? 'border-[#78be20]': ''} isDefault={ad?._id == addressBook?.defaultAddressId} 
							setOpenEdit={setOpenEdit} setEditData={setEditData}/>
                    </label>
                </div>)
                }
            </fieldset>

            <div className='normalFlex w-full gap-3 px-3 sticky mt-auto mb-3 z-[101]'>
                <button onClick={()=> setOpenAddForm(true)} className='bg-white border text-[#78be20] border-[#78be20] rounded-full text-[15px] py-2 flex-1 font-[600]'>
                    添加新地址
                </button>
                <button onClick={() => handleSubmit()} className='bg-[#78be20] border text-white rounded-full text-[15px] py-2 flex-1 font-[600]'>
                    确定
                </button>
            </div>
            
            { openAddForm && <NewAddressForm setOpenAddForm={setOpenAddForm} />}

			{ openEdit && <EditAddressForm address={editData} setOpenEdit={setOpenEdit} />}
        </ModalLayout>
    )
}

export default AddressSelector

