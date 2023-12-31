import React from 'react'

const OrderStatus = ({status, optionStyle}) => {
    const statusOptions = [
        "Processing",  // 订单待发货
        "Shipped",  // 卖家已发货
        "Shipping",  // 运输中
        "Dispatching",  // 快递员派送中
        "Delivered",  // 买家已签收
        
        "Archived", // 交易成功
        "Processing refund", // 退款处理中

        "Refunded", // 退款成功
        "Cancelled", // 交易关闭
    ];

    return (
        <span>
            <span className={`text-[rgb(132,204,22)] ${optionStyle}`}>
                { status === 'Processing' && <h1>订单待发货</h1> }
                { status === 'Shipped' && <h1>卖家已发货</h1> }
                { status === 'Shipping' && <h1>运输中</h1> }
                { status === 'Dispatching' && <h1>快递员派送中</h1> }
                { status === 'Delivered' && <h1>买家已签收</h1> }
            </span>
            { status === 'Archived' && <h1>交易成功</h1> }
            { status === 'Refunded Success' && <h1>订单退款成功</h1> }
            { status === 'Cancelled' && <h1 className=''>交易已关闭</h1> }
        </span>
    )
}

export default OrderStatus