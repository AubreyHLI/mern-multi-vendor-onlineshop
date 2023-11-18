import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { Link } from 'react-router-dom'

const ShopOrderDetail = ({status, orderDetails}) => {

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

    const renderStatus = (data) => {
        if(data === 'Processing') {
            return <div className='text-[14px]'>未发货</div>
        } else if(data === 'Cancelled'  || data === 'Refunded') {
            return <div className='text-[14px]'>已退回</div>
        } else {
            return <div className='text-[14px] text-[orange]'>已出库</div>
        }
    }

    const renderComment = (data) => {
        if(!data?.value?.isReviewed) {
            return <span className='text-[14px]'>未评价</span>
        } else {
            return <Link to={''} className='text-[14px]'>已评价</Link>
        }
    }

    const renderActions = (data) => {
        return (
            <div className='w-full flex flex-col text-[14px] !text-[rgb(84,157,209)] select-none'>
                {/* <button onClick={() => onEditProduct(data?.value?._id)} className='pt-2 normalFlex gap-1 hover:text-[rgb(127,201,16)]'>
                    同意退款
                </button>
                <button onClick={() => onEditProduct(data?.value?._id)} className='pt-2 normalFlex gap-1 hover:text-[rgb(127,201,16)]'>
                    同意退款退货
                </button> */}
            </div>
        )
    }
    
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.1 },
        { field: 'productData', headerName: '商品名称', minWidth: 250, flex: 0.45, renderCell: (params) => renderProductName(params)},
        { field: 'status', headerName: '状态', flex: 0.25, minWidth:'fit', renderCell: (params) => renderStatus(params)},
        { field: 'price', headerName: '单价', flex: 0.2, minWidth:'fit' },
        { field: 'qty', headerName: '数量',  flex: 0.15, minWidth:'fit' },
        { field: 'total', headerName: '总额', flex: 0.2, minWidth:'fit' },
        { field: 'comment', headerName: '评价', flex: 0.2, minWidth:'fit', renderCell:(params) => renderComment(params)},
        { field: 'actions', headerName: '操作', flex: 0.2, minWidth:'fit', sortable:false, renderCell: (params) => renderActions(params) },
    ];

    const rows = orderDetails?.map((item, index) => {
        return ({
            id: index,
            productData: { 
                image: item?.image, 
                name: item?.name, 
                _id: item?.productId 
            },
            status: status,
            price: `¥ ${item?.price?.toFixed(2)}`,
            qty: item?.qty,
            total: `¥ ${(item?.price * item?.qty).toFixed(2)}`,
            comment: {
                isReviewed: item?.isReviewed,
                commentId: item?.commentId,
            },
        })
    });
    
    return (
    <div className='mt-6'>
        {/* mobile screen */}
        <div className='w-full 800px:hidden'>
            { orderDetails?.map((item, index) => 
            <div className="w-full flex items-center py-1 border-dotted border-b hover:opacity-80" key={index}>
                <img src={item?.image} className="w-[60px] h-[60px] 600px:w-[80px] 600px:h-[80px] object-cover rounded-lg " alt=""/>
                <div className="px-[5px] flex-1 flex justify-between w-full">
                    <div className='flex flex-col gap-1 w-full 800px:flex-1'>
                        <h1 className='line-clamp-1 text-[14px]'>{item?.name}</h1>
                        <div className='font-[400] text-[13px] text-[#00000082]'>
                            <span className='800px:hidden'>¥{item?.price} * {item?.qty}</span>
                            <span className='hidden 800px:block'>数量 x {item?.qty}</span>
                        </div>
                    </div>
                    <div className='min-w-fit 800px:flex-1 flex justify-between'>
                        <span className='hidden 800px:block text-[#00000082] text-[14px]'>单价: ¥ {item?.price.toFixed(2)}</span>
                        <h4 className='min-w-fit text-[15px]'>¥ {(item?.price * item?.qty).toFixed(2)}</h4>
                    </div>
                </div>
            </div>
            )}
        </div>

        {/* large screen */}
        <div className='w-full shadow-md h-full mb-4 hidden 800px:block'>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                checkboxSelection
                rowSelection
                columnVisibilityModel={{ id: false }}
                disableColumnMenu
                rowHeight={95}

                sx={{ fontSize: '16px' }}                
            />
        </div>
    </div>
    )
}

export default ShopOrderDetail