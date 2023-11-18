import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PiListMagnifyingGlass } from 'react-icons/pi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { slashDateFormat } from '../../helpers/dayjsHelper';


const ShopProductsTable = ({onEditProduct, onDeleteProduct}) => {
    const { shopProducts } = useSelector(state => state.shop);

    const renderCreatedAt = (data) => {
        return (
            <div className='!text-[14px]'>
                {slashDateFormat(data?.createdAt)}
            </div>
        )
    }

    const renderProductName = (data) => {
        return (
            <div className='flex gap-2 h-[80px]'>
                <div className='w-[80px] min-w-fit'>
                    <img src={data?.value?.image} alt='' className='w-[80px] h-[80px] object-cover rounded-lg'/>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-[14px] font-[500] line-clamp-1'>{data?.value?.name}</h3>
                    <h5 className='text-[12px] text-[#999999] line-clamp-1'>ID:{data?.value?._id}</h5>
                </div>
            </div>
        )
    }

    const renderActions = (data) => {
        return (
            <div className='w-full flex flex-col text-[14px] !text-[rgb(84,157,209)] select-none'>
                <Link to={`/product/${data?.value?._id}`} className='pt-2 normalFlex gap-1 hover:text-[rgb(127,201,16)]'>
                    <PiListMagnifyingGlass size={18}/>详情
                </Link>
                <button onClick={() => onEditProduct(data?.value?._id)} className='pt-2 normalFlex gap-1 hover:text-[rgb(127,201,16)]'>
                    <AiOutlineEdit size={16}/>编辑
                </button>
                <button onClick={(e) => onDeleteProduct(data?.value?._id)} className='pt-2 normalFlex gap-1 hover:text-[rgb(255,84,75)]'>
                    <MdDeleteOutline size={16}/>删除
                </button>
            </div>
        )
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.1 },
        { field: 'productData', headerName: '商品名称', minWidth: 250, flex: 0.45, renderCell: (params) => renderProductName(params) },
        { field: 'price', headerName: '价格', flex: 0.25, minWidth:'fit' },
        { field: 'stock', headerName: '库存',  flex: 0.15, minWidth:'fit' },
        { field: 'soldOut', headerName: '销售', flex: 0.15, minWidth:'fit' },
        { field: 'createdAt', headerName: '创建时间', flex: 0.2, minWidth:'fit', renderCell: (params) => renderCreatedAt(params) },
        { field: 'actions', headerName: '操作', flex: 0.2, minWidth:'fit', sortable:false, renderCell: (params) => renderActions(params) },
    ];

    const rows = shopProducts?.map((product, index) => {
        return ({
            id: index,
            productData: { 
                image: product?.images[0]?.url, 
                name: product?.name, 
                _id: product?._id 
            },
            price: `¥ ${(product?.discountPrice ? product?.discountPrice : product?.originalPrice).toFixed(2)}`,
            stock: product?.stock,
            soldOut: product?.sold_out,
            createdAt: product?.createdAt,
            actions: {
                _id: product?._id
            }
        })
    });

    return (
        <div className='w-full h-[calc(100vh-190px)] shadow-md'>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection={false}
                rowSelection={false}
                columnVisibilityModel={{ id: false }}
                disableColumnMenu
                rowHeight={95}
                autoPageSize
                sx={{ fontSize: '16px' }}                
            />
        </div>
    )
}

export default ShopProductsTable


