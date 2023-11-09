import React, { useEffect, useState } from 'react'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_URL } from '../../static/server';
import { toast } from 'react-toastify';
import { useCreateOrdersMutation } from '../../redux/features/checkout/checkoutApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useClearCartMutation } from '../../redux/features/user/userApi';
import { clearCart } from '../../redux/features/user/userSlice';
import { clearCheckoutSummary } from '../../redux/features/checkout/checkoutSlice';


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [select, setSelect] = useState(0);
    const [orders, setOrders] = useState([]);
    const [name, setName] = useState('');
    const { user, token } = useSelector(state => state.auth);
    const { shippingAddress, subTotalPrice, allDiscount, shipping, totalPrice } = useSelector(state => state.checkout);
    const [createOrders, {isLoading, isSuccess, isError, error}] = useCreateOrdersMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const ordersData = JSON.parse(localStorage.getItem("latestOrders"));
        setOrders(ordersData);
    }, []);

    useEffect(() => {
        if(isSuccess) {
            navigate("/account/paymentSuccess");
            localStorage.setItem("latestOrders", JSON.stringify([]));
            dispatch(clearCart());
            dispatch(clearCheckoutSummary());
        }
        if(isError) {
            toast.error(error?.data?.message);
        }
    }, [isSuccess, isError])

    const options = { 
        style: {
            base: {
                fontSize: "15px",
                fontWeight: 500,
                color: "#444",
            },
            empty: {
                color: "#3a120a",
                backgroundColor: "transparent",
                "::placeholder": { color: "#c8c8c8"},
            },
        }, 
    };

    const paymentData = {
        amount: Math.round(totalPrice * 100),  // if charge $1 you must set amount=100 as stripe uses cents, $1 = 100cents
    }

    const ordersData = {
        orders,
        shippingAddress,
        shipping: (shipping / orders?.length).toFixed(2),
    }


    const handlePayByCard = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        try {
            const response = await axios.post(`${SERVER_URL}/payment/process`, paymentData, { 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, withCredentials: true 
            });

            const result = await stripe.confirmCardPayment(response?.data?.client_secret, { 
                payment_method: { 
                    card: elements.getElement(CardNumberElement) 
                } 
            });

            if (result?.error) {
                toast.error(result.error.message);
                return
            } 
            // else 
            if (result?.paymentIntent?.status === "succeeded") {
                ordersData.paymentInfo = {
                    id: result.paymentIntent.id,
                    status: result.paymentIntent.status,
                    type: "Bank Card",
                };
                await createOrders(ordersData);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handlePayInCash = async (e) => {
        e.preventDefault();
        ordersData.paymentInfo = {
            status: "incomplete",
            type: "Cash On Delivery",
        };
        await createOrders(ordersData);
    }

    return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md px-5 pb-4 pt-4">
        <h3 className='font-[500] text-[18px]'>选择支付方式</h3>
        {/* pay with card */}
        <div className='border-b'>
            <div onClick={() => setSelect(1)}  className="normalFlex w-full py-5 cursor-pointer">
                <div className="w-[22px] h-[22px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center">
                    {select === 1 && <div className="w-[10px] h-[10px] bg-[#1d1a1acb] rounded-full" />}
                </div>
                <h4 className="text-[16px] pl-2 font-[600] text-[#000000b1]">
                    信用卡 / 借记卡支付
                </h4>
            </div>
            <form onSubmit={handlePayByCard} className={`w-full pb-4 ${select !== 1 && 'hidden'}`}>
                <div className="w-full grid grid-cols-1 gap-2 600px:grid-cols-2 800px:gap-x-3">
                    <div className='flex flex-col gap-1'>
                        <label className="text-[15px]">卡号</label>
                        <CardNumberElement
                            className='input pt-[10px]'
                            options={options}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className="text-[15px]">持卡人姓名</label>
                        <input value={name} required placeholder={user?.name} onChange={e => setName(e.target.value)} className='input text-[#444] placeholder:text-[#c8c8c8] placeholder:font-[500]'/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className="text-[15px]">有效期至</label>
                        <CardExpiryElement 
                            className='input pt-[10px]' 
                            options={options} 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className="text-[15px]">安全码</label>
                        <CardCvcElement
                            className='input pt-[10px]'
                            options={options}
                        />
                    </div>
                </div>
                <div className='w-full flex justify-end mt-4'>
                    <input type="submit" value={isLoading ? "支付中..." : "立即支付"} disabled={isLoading} className='button2 bg-[orange] text-white !rounded-none cursor-pointer' />
                </div>
            </form>
        </div>


        {/* cash on delivery */}
        <div className='border-b'>
            <div onClick={() => setSelect(2)}  className="normalFlex w-full py-5 cursor-pointer">
                <div className="w-[22px] h-[22px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center">
                    {select === 2 && <div className="w-[10px] h-[10px] bg-[#1d1a1acb] rounded-full" /> }
                </div>
                <h4 className="text-[16px] pl-2 font-[600] text-[#000000b1]">
                    货到付款
                </h4>
            </div>

            {/* cash on delivery */}
            <div className={`w-full pb-4 ${select !== 2 && 'hidden'}`}>
                <div className='text-[15px] text-[#444]'>
                    可使用现金支付、微信或支付宝付款给快递派送员
                </div>
                <div className='w-full flex justify-end'>
                    <button onClick={handlePayInCash} className='button2 bg-[orange] text-white !rounded-none' >
                        提交订单
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default PaymentForm