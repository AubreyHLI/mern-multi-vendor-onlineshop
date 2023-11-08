import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import AddressCard from '../../components/Address/AddressCard';
import NewAddressForm from '../../components/Address/NewAddressForm';
import EditAddressForm from '../../components/Address/EditAddressForm';


const AddressBookPage = () => {
    const { setActive, setWithNav } = useOutletContext();
	const { addressBook } = useSelector(state => state.user);
	const [openAddForm, setOpenAddForm] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setEditData] = useState(null);

	useEffect(() => {
		setWithNav(true);
		setActive(3);
		window.scrollTo(0,0);
	},[])

	useEffect(() => {
        if(openAddForm || openEdit) {
            document.body.style.overflow = 'hidden';  // lock the scroll of home page
        } else {
            document.body.style.overflow = 'unset';  // unlock the scroll of home page
        }
    }, [openAddForm, openEdit]);

    return (
        <div className="w-full pb-[20px]">
            <h1 className="text-[22px] 800px:text-[26px] mb-[16px]">您的地址</h1>

			<div className='w-full grid grid-cols-1 gap-2 700px:grid-cols-2 800px:grid-cols-auto-fill-280'>
				<div onClick={() => setOpenAddForm(true)} className='w-full h-[160px] 700px:h-[240px] 700px:max-w-[280px] border-2 border-dashed rounded-lg border-gray-300 cursor-pointer'>
					<div className='w-full h-full normalFlex flex-col justify-center'>
						<MdAdd size={60} color='#cccccc'/> 
						<h2 className='text-[20px] 700px:text-[24px] font-[600] text-[#565959]'>新地址</h2>
					</div>				
				</div>

				{addressBook?.addresses?.map((item, index) => 
					<div key={index}>
						<AddressCard data={item} isDefault={item?._id == addressBook?.defaultAddressId} 
							setOpenEdit={setOpenEdit} setEditData={setEditData}
						/>
					</div>
				)}
			</div>

			{ openAddForm && <NewAddressForm setOpenAddForm={setOpenAddForm} />}

			{ openEdit && <EditAddressForm address={editData} setOpenEdit={setOpenEdit} />}
        </div>
    );
   
}

export default AddressBookPage