import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShopOrderCard from './ShopOrderCard';
import AmountItemStyle from './AmountItemStyle';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setChekoutSummary } from '../../redux/features/checkout/checkoutSlice';

const CheckoutInfo = () => {
    const [checkoutOrders, setCheckoutOrders] = useState([ ]);
    const { shippingAddress } = useSelector(state => state.checkout);
    const { cart } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const subTotalPrice = checkoutOrders?.reduce((sum, order) => sum + order?.subTotal, 0);
    const shipping = subTotalPrice > 99 ? 0 : 10;
    const discount = checkoutOrders?.reduce((sum, order) => sum + order?.discount, 0 );
    const totalPrice = subTotalPrice + shipping - discount;
    
    useEffect(() => {
        cart?.forEach((shopCart, i) => {
            if(!checkoutOrders[i]) {
                let subTotal = 0, itemPrice = 0;
                let cartItems = [];
                shopCart?.items?.forEach(item => {
                    const { product, qty } = item;
                    itemPrice = product?.discountPrice ? product?.discountPrice : product?.originalPrice;
                    subTotal += itemPrice * qty;
                    cartItems.push({
                        productId: product?._id,
                        name: product?.name,
                        price: itemPrice,
                        image: product?.images[0]?.url,
                        qty: qty,
                        isReviewed: false
                    })
                })

                setCheckoutOrders(prevOrders => [ 
                    ...prevOrders,
                    { shop: shopCart?.shop, items: cartItems, subTotal: subTotal, discount:0, total: subTotal }
                ]);
            }
        })
    }, [])


    const updateCheckoutOrders = (index, discount, total) => {
        setCheckoutOrders(prevOrders => {
            const updatedOrders = [...prevOrders];
            updatedOrders[index].discount = discount;
            updatedOrders[index].total = total;
            return updatedOrders;
        })
    }

    const handleSubmitOrders = async () => {
        if(shippingAddress?.recipient === undefined) {
            toast.error("请填写收货地址")
        } else {
            // update local storage with the updated orders array
            dispatch(setChekoutSummary({
                subTotalPrice: subTotalPrice,
                shipping: shipping,
                allDiscount: discount,
                totalPrice: totalPrice
            }))
            localStorage.setItem("latestOrders", JSON.stringify(checkoutOrders));
            navigate("/account/payment");
        }
    }

    
    return (
        <>
            {/* cart info */}
            <div className="w-full flex flex-col gap-4">
                {checkoutOrders?.map((order, i) => 
                <ShopOrderCard order={order} key={i} index={i} updateCheckoutOrders={updateCheckoutOrders} />)
                }
            </div>

            {/* order summary */}
            <div className='w-full bg-[#e8e8e8] px-5 py-4'>
                <div className='w-full 700px:w-[50%] 700px:max-w-[400px] ml-auto mr-0'>
                    <AmountItemStyle title='总商品金额' amount={subTotalPrice?.toFixed(2)} largeSize={true} />
                    <AmountItemStyle title='运费' amount={shipping?.toFixed(2)} largeSize={true} />
                    <AmountItemStyle title='总优惠' amount={discount?.toFixed(2)} withDiscount={true} largeSize={true} />
                    <div>
                        <AmountItemStyle title='应付总款' amount={totalPrice?.toFixed(2)} largeSize={true} />
                    </div>
                </div>
            </div>

            
            <div className='w-full normalFlex justify-center 700px:justify-end'>
                <button onClick={handleSubmitOrders} className='button2 bg-[orange] text-white !rounded-none'>
                    提交订单
                </button>
            </div>
        </>
    )
}

export default CheckoutInfo