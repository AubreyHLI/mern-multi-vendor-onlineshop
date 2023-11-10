import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animations/Animation - 1699604313087.json";

const PaymentSuccessPage = () => {
    const { setWithNav } = useOutletContext();

    useEffect(() => {
        setWithNav(true);
        window.scrollTo(0, 0);
    }, []);

    
    return (
        <div className="w-full h-full mx-auto pt-[80px] pb-[120px] ">
            <div className='w-full text-center'>
                <Player
                    autoplay
                    loop={false}
                    keepLastFrame={true}
                    src={animationData}
                    style={{ height: '160px', width: '160px' }}
                    >
                </Player>
            </div>
            <div className="text-center">
                <h1 className='text-[22px]'>支付成功! </h1>
                <h3 className='mt-2 text-[#2e2e2e82] text-[15px]'>我们将尽快给您发货</h3>
                <button className='mt-12 button2 bg-indigo-400 text-white shadow-sm'>查看订单详情</button>
            </div>
        </div>
    )
}

export default PaymentSuccessPage