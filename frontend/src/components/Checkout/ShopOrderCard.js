import React, { useEffect, useState } from 'react'
import AmountItemStyle from './AmountItemStyle';
import { PiStorefront } from "react-icons/pi";
import { useCheckCouponMutation } from '../../redux/features/checkout/checkoutApi';
import { compareDate, dotDateFormat } from '../../helpers/dayjsHelper';

const ShopOrderCard = ({order, index, updateCheckoutOrders}) => {
    const [couponCode, setCouponCode] = useState('');
    const [couponMsg, setCouponMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [checkCoupon, {data, isSuccess, isError, error}] = useCheckCouponMutation();


    useEffect(() => {
        if(isError) {
			setErrMsg(error?.data?.message);
		}
        if(isSuccess) {
            const {beginsAt, expiresAt, lowerLimit, type, discountPrice, discountPercentage} = data?.coupon;
            let today = new Date();
            if(compareDate(today, beginsAt) < 0) {
                setErrMsg('该优惠券不可用：尚未到使用日期 ' + dotDateFormat(beginsAt) )
            } 
            else if(compareDate(expiresAt, today) < 0) {
                setErrMsg('该优惠券已过期')
            }
            else if(order?.subTotal < lowerLimit) {
                setErrMsg('该优惠券不可用：需在该店铺消费满 ' + lowerLimit + ' 元（不含运费）')
            }
            else {
                switch(type) {
                    case 'percentage':
                        let discountTotal = discountPercentage * 0.01 * order?.subTotal;
                        setCouponMsg(`满${lowerLimit}打${10 - (discountPercentage * 0.1)}折`);
                        updateCheckoutOrders(index, discountTotal,  order?.subTotal - discountTotal);
                        break;
                    case 'fixedAmount':
                        setCouponMsg(`满${lowerLimit}减${discountPrice}`);
                        updateCheckoutOrders(index, discountPrice,  order?.subTotal - discountPrice)
                        break;
                    default:
                        break;
                }
            }
        }
    }, [isError, isSuccess])


    const handleApplyCoupon = async (e) => {
        e.preventDefault();
        const couponObj = {
            code: couponCode, 
            shopId: order?.shop?._id
        };
        await checkCoupon(couponObj);
    }

    const handleInputCoupon = (e) => {
        if(errMsg) {
            setErrMsg(null)
        } 
        setCouponCode(e.target.value)
    }


    return (
        <div className="w-full bg-[#fff] rounded-md flex flex-col gap-3 px-5 py-4">
            <div className='normalFlex gap-[6px] text-[14px] text-[#000000a4]'>
                <PiStorefront size={20}/>
                <h3>{order?.shop?.name}</h3>
            </div>

            <div className='w-full'>
                { order?.items?.map((item, index) => 
                <div className="w-full flex items-center py-1 border-dotted border-b" key={index}>
                    <img src={item?.image} alt="" className="w-[40px] h-[40px] mr-2 rounded-[5px] object-cover"/>
                    <div className="px-[5px] flex-1">
                        <div className='800px:hidden'>
                            <div className='flex justify-between w-full text-[14px]'>
                                <h1 className='line-clamp-1'>{item?.name}</h1>
                                <h4>¥{(item?.price * item?.qty).toFixed(2)}</h4>
                            </div>
                            <h4 className='pt-[4px] font-[400] text-[13px] text-[#00000082]'>
                                ¥{item?.price} * {item?.qty}
                            </h4>
                        </div>
                        <div className='hidden 800px:grid 800px:grid-cols-4'>
                            <h1 className='line-clamp-1 col-span-2'>{item?.name}</h1>
                            <h4 className='font-[400] text-[14px] text-[#00000082] text-center'>
                                ¥ {item?.price} * {item?.qty}
                            </h4>
                            <h4 className='text-end'>¥ {(item?.price * item?.qty).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>)}
            </div>

            <div className='flex flex-col gap-3 700px:flex-row  700px:justify-between'>
                <div className='flex flex-col gap-2 700px:w-[40%] 700px:max-w-[300px]'>
                    <AmountItemStyle title='店铺优惠' amount={order?.discount?.toFixed(2)} withDiscount={true} couponMsg={couponMsg} />
                    <AmountItemStyle title='店铺合计' amount={(order?.subTotal - order?.discount)?.toFixed(2)} />
                </div> 
                <div className='700px:order-first'>
                    <div className='normalFlex gap-2'>
                        <input type="text" placeholder="店铺优惠券代码" value={couponCode} className='input'
                            onChange={handleInputCoupon}/>
                        <button onClick={handleApplyCoupon} className='text-center text-[15px] border font-[600] w-[120px] h-[40px] py-[5px] border-[#53565a] text-[#53565a] hover:opacity-80 rounded-full'>
                            使用
                        </button>
                    </div>
                    {errMsg && <span className='text-[#D8000C] text-[13px]'>{errMsg}</span>}
                </div>
            </div>
        </div>
    )
}

export default ShopOrderCard