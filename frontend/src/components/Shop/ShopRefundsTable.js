import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify';
import { PiListMagnifyingGlass } from 'react-icons/pi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { PiKeyReturn } from "react-icons/pi";
import { Link } from 'react-router-dom'
import { useAcceptRefundRequestMutation } from '../../redux/features/shop/shopApi';


const ShopRefundsTable = ({refundItems, orderId}) => {
    const [acceptRefundRequest, {isLoading, isSuccess, isError, error}] = useAcceptRefundRequestMutation();

    useEffect(() => {
        if(isSuccess) {
            toast.success('退款退货申请已同意')
        }
        if(isError) {
            toast.error(error?.data?.message)
        }
    }, [isSuccess, isError])

    const handleAcceptRefund = async (productId) => {
        const answer = window.confirm('确认同意该退款申请？');
        if(!answer) {
            return
        } else {
            await acceptRefundRequest({
                productId,
                orderId
            })
        }
    }

    const renderProductName = (data) => {
        return (
            <div className='flex gap-2 h-[60px]'>
                <div className='w-[60px] min-w-fit'>
                    <img src={data?.value?.image} alt='' className='w-[60px] h-[60px] object-cover rounded-lg'/>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-[14px] font-[500] line-clamp-1'>{data?.value?.name}</h3>
                    <h5 className='text-[12px] text-[#999999] line-clamp-1'>ID:{data?.value?._id}</h5>
                </div>
            </div>
        )
    }

    const renderStatus = (data) => {
        if(data.value === 'Preparing') return <div className='text-[14px]'>未发货</div>
        if(data.value === 'Shipped') return <div className='text-[14px]'>已发货</div>
        if(data.value === 'Processing refund') return <div className='text-[14px] text-[orange]'>申请退款退货</div>
        if(data.value === 'Refunded') return (
            <div className='text-[14px] flex gap-[2px]'>
                <IoMdCheckmarkCircleOutline size={20} className='text-[rgb(132,204,22)]'/>
                <span>已同意，退款退货成功</span>
            </div>)
    }

    const renderActions = (data) => {
        return (
            <div className='w-full flex flex-col text-[14px] !text-[rgb(84,157,209)] select-none'>
                <Link to={`/business/order/${orderId}`} className='normalFlex gap-1 hover:text-[rgb(127,201,16)]'>
                    <PiListMagnifyingGlass size={18}/>详情
                </Link>
                <button onClick={() => handleAcceptRefund(data?.value?.productId)} className='pt-2 normalFlex gap-1 hover:text-[rgb(127,201,16)] disabled:cursor-default disabled:text-[#999999]' disabled={data?.value?.productStatus !== 'Processing refund'}>
                    <PiKeyReturn size={19} />
                    同意退货退款
                </button>
            </div>
        )
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.1 },
        { field: 'productData', headerName: '商品名称', minWidth: 250, flex: 0.4, renderCell: (params) => renderProductName(params)},
        { field: 'status', headerName: '售后状态', flex: 0.3, minWidth: 100, renderCell: (params) => renderStatus(params)},
        { field: 'price', headerName: '单价', flex: 0.2, minWidth: 100 },
        { field: 'qty', headerName: '数量',  flex: 0.15, minWidth: 100 },
        { field: 'total', headerName: '总额', flex: 0.2, minWidth: 100 },
        { field: 'actions', headerName: '操作', flex: 0.2, minWidth: 100, sortable:false, renderCell: (params) => renderActions(params) },
   ];

   const rows = refundItems?.map((item, index) => {
        return ({
            id: index,
            productData: { 
                image: item?.image, 
                name: item?.name, 
                _id: item?.productId 
            },
            status: item?.productStatus,
            price: `¥ ${item?.price?.toFixed(2)}`,
            qty: item?.qty,
            total: `¥ ${(item?.price * item?.qty).toFixed(2)}`,
            actions: {
                productStatus: item?.productStatus,
                productId: item?.productId,
            }
        })
    });

    return (
        <div className='w-full h-full my-2'>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 3 },
                    },
                }}
                pageSizeOptions={[3]}
                checkboxSelection={false}
                rowSelection={false}
                columnVisibilityModel={{ id: false }}
                disableColumnMenu
                rowHeight={80}
                sx={{ fontSize: '16px' }}                
            />
        </div>
    )
}

export default ShopRefundsTable