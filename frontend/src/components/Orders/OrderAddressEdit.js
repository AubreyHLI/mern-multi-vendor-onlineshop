import React, { useEffect, useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { RxCross1 } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import { LiaShippingFastSolid } from 'react-icons/lia'
import AddressCard from '../Address/AddressCard'
import NewAddressForm from '../Address/NewAddressForm'
import EditAddressForm from '../Address/EditAddressForm'
import { useUpdateOrderAddressMutation } from '../../redux/features/user/userApi'
import { toast } from 'react-toastify'

const OrderAddressEdit = ({heading, setOpenForm, orderId}) => {
    const [address, setAddress] = useState({});
    const [selectedAddress, setSelectedAddress] = useState({});
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const { orderHistory, addressBook } = useSelector(state => state.user);
    const [updateOrderAddress, {isLoading, isSuccess, isError, error}] = useUpdateOrderAddressMutation();

    useEffect(() => {
        const order = orderHistory.find(item => item._id == orderId);
        setAddress(order?.shippingAddress);
    }, [orderId])

    useEffect(() => {
        if(isSuccess) {
            setOpenForm(false);
            toast.success('收货地址修改成功')
        }
        if(isError) {
            toast.error(error?.data?.message)
        }
    }, [isSuccess, isError])

    const handleSubmit = async () => {
        if(!selectedAddress?.recipient) {
            setOpenForm(false);
            return
        } else {
            await updateOrderAddress({
                id: orderId,
                address: selectedAddress
            })
        }
    }

    return (
        <ModalLayout optionStyle='600px:my-auto 600px:max-w-[700px] '>
            <div className='w-full flex items-center gap-4 mt-3 mb-1 600px:my-3'>
                <div onClick={() => setOpenForm(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex justify-center cursor-pointer transition-colors duration-200 ease-out hover:bg-[#eff3f4]'>
                    <RxCross1 size={20}/>
                </div>
                <h1 className='font-[500] text-[20px]'>{heading}</h1>
            </div>

            <div className=' px-3 py-2 shadow-sm'>
                <div className='font-[500] 800px:text-[18px] normalFlex gap-2 mb-1 '>
                    <h3>原地址</h3>
                    <LiaShippingFastSolid size={22} /> 
                </div>
                <div className='text-[15px] 800px:text-[16px]'>
                    <div>{address?.province}  {address?.city}  {address?.district}  {address?.address1} </div>
                    <div className='normalFlex gap-3 font-[600]'>
                        <span>{address?.recipient}</span>
                        <span>{address?.phone}</span>
                    </div>
                </div>
            </div>

            <div className='px-3 mt-5'>
                <h3 className='font-[500] 800px:text-[18px]'>选择新的收货地址</h3>

                {addressBook?.addresses?.length > 0 ?
                <fieldset className='w-full grid grid-cols-1 gap-2 700px:grid-cols-2 700px:gap-y-4 overflow-y-scroll py-3'>
                    {addressBook?.addresses?.map((ad, index) => {
                        if(ad?._id === address?._id ) return <></>
                        return (
                        <div key={index} className='normalFlex gap-2 w-full'>
                            <input type='radio' id={ad?._id} name='selectedAddress' value={selectedAddress?.id} onChange={() => setSelectedAddress(ad)} checked={ad?._id == selectedAddress?._id} className='w-[20px] h-[20px] cursor-pointer'/>
                            <label htmlFor={ad?._id} className='w-full cursor-pointer'>
                                <AddressCard data={ad} optionStyle={selectedAddress?._id == ad?._id ? 'border-[#78be20]': ''} isDefault={ad?._id == addressBook?.defaultAddressId} 
                                    setOpenEdit={setOpenEdit} setEditData={setEditData}/>
                            </label>
                        </div>
                        )
                    })}
                </fieldset>
                : <div className='w-full h-full normalFlex text-[18px] justify-center'>
                    暂无收货地址
                </div>
                }

                <div className='normalFlex w-full gap-3 px-3 sticky mt-auto mb-3 z-[101]'>
                    <button onClick={()=> setOpenAddForm(true)} className='bg-white border text-[#78be20] border-[#78be20] rounded-full text-[15px] py-2 flex-1 font-[600]'>
                        添加新地址
                    </button>
                    <button onClick={handleSubmit} className='bg-[#78be20] border text-white rounded-full text-[15px] py-2 flex-1 font-[600]'>
                        {isLoading? '修改中...' :'提交修改' }
                    </button>
                </div>
            </div>

            { openAddForm && <NewAddressForm setOpenAddForm={setOpenAddForm} />}

            { openEdit && <EditAddressForm address={editData} setOpenEdit={setOpenEdit} />}


        </ModalLayout>
    )
}

export default OrderAddressEdit