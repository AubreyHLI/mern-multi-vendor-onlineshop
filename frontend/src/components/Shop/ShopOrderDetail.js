import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAcceptRefundRequestMutation } from '../../redux/features/shop/shopApi'
import { useSelector } from 'react-redux';
import Ratings from '../Products/Ratings';

const ShopOrderDetail = ({status, orderDetails, orderId}) => {
    const [acceptRefundRequest, {isLoading, isSuccess, isError, error}] = useAcceptRefundRequestMutation();
    const { shopProducts } = useSelector(state => state.shop);

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
        if(data.value === 'Preparing') return <div className='text-[14px]'>未发货</div>
        if(data.value === 'Shipped') return <div className='text-[14px]'>已发货</div>
        if(data.value === 'Processing refund') return <div className='text-[14px] text-[orange]'>申请退款退货</div>
        if(data.value === 'Refunded') return <div className='text-[14px]'>退款退货成功</div>
    }

    const renderComment = (data) => {
        if(!data?.value?.isReviewed) {
            return <span className='text-[14px]'>未评价</span>
        } else {
            const product = shopProducts?.find(p => p?._id == data?.value?.productId);
            const review = product?.reviews?.find(r => r?._id == data?.value?.reviewId);
            return (
            <Link to={`/product/${data?.value?.productId}?reviewId=${data?.value?.reviewId}`} >
                <div className='text-[14px]'>
                    已评价
                </div>
                <Ratings ratings={review?.rating} />
            </Link>)
        }
    }

    const renderActions = (data) => {
        return (
            <div className='w-full text-[14px] select-none'>
                {data?.value?.productStatus === 'Processing refund' && 
                <button onClick={() => handleAcceptRefund(data?.value?.productId)} className='hover:text-[rgb(127,201,16)] !text-[rgb(84,157,209)] '>
                    {isLoading ? '正在同意申请...' : '同意退货退款' } 
                </button>}
                {data?.value?.productStatus === 'Refunded' && 
                <span className='text-[rgb(255,175,101)]'>
                    退款成功
                </span>}
            </div>
        )
    }
    
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.1 },
        { field: 'productData', headerName: '商品名称', minWidth: 250, flex: 0.45, renderCell: (params) => renderProductName(params)},
        { field: 'status', headerName: '状态', flex: 0.25, minWidth: 100, renderCell: (params) => renderStatus(params)},
        { field: 'price', headerName: '单价', flex: 0.2, minWidth: 100 },
        { field: 'qty', headerName: '数量',  flex: 0.15, minWidth: 100 },
        { field: 'total', headerName: '总额', flex: 0.2, minWidth: 100 },
        { field: 'comment', headerName: '评价', flex: 0.2, minWidth: 100, renderCell:(params) => renderComment(params)},
        { field: 'actions', headerName: '退款操作', flex: 0.2, minWidth: 100, sortable:false, renderCell: (params) => renderActions(params) },
    ];

    const rows = orderDetails?.map((item, index) => {
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
            comment: {
                isReviewed: item?.isReviewed,
                reviewId: item?.reviewId,
                productId: item?.productId
            },
            actions: {
                productStatus: item?.productStatus,
                productId: item?.productId,
            }
        })
    });
    
    return (
    <div className='mt-6'>
        {/* mobile screen */}
        <div className='w-full 800px:hidden'>
            { orderDetails?.map((item, index) => 
            <div className='w-full border-dotted border-b pt-1 pb-[10px]' key={index}>
                <div className="w-full flex items-center hover:opacity-80">
                    <img src={item?.image} className="w-[60px] h-[60px] 600px:w-[80px] 600px:h-[80px] object-cover rounded-lg " alt=""/>
                    <div className="px-[5px] flex-1 flex justify-between w-full">
                        <div className='flex flex-col gap-1 w-full 800px:flex-1'>
                            <h1 className='line-clamp-1 text-[14px]'>{item?.name}</h1>
                            <div className='font-[400] text-[13px] text-[#00000082] normalFlex gap-5 400px:gap-10'>
                                <span>数量 x {item?.qty}</span>
                                <span>单价: ¥ {item?.price.toFixed(2)}</span>
                            </div>
                        </div>
                        <h4 className='min-w-fit text-[16px]'>¥ {(item?.price * item?.qty).toFixed(2)}</h4>
                    </div>
                </div>
                <div className='w-full text-[13px] 600px:text-[14px] !text-[rgb(84,157,209)] select-none flex justify-end -mt-2 '>
                    {item?.productStatus === 'Processing refund' && 
                    <button onClick={() => handleAcceptRefund(item?.productId)} className='hover:text-[rgb(127,201,16)]'>
                        同意退货退款
                    </button>}
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
                pageSizeOptions={[5]}
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