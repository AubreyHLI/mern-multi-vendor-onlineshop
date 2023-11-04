import appApi from "../../services/apiSlice";

const checkoutApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getPublicStripeKey: builder.query({
            query: () => '/payment/config',
        }),
        createPayment: builder.mutation({
            query: (orderInfo) => ({
                url: '/payment/process',
                method: 'POST',
                body: orderInfo
            }),
        }),
        checkCoupon: builder.mutation({
            query: (coupon) => ({
                url: `/coupons/checkCoupon/${coupon.code}`,
                method: 'POST',
                body: coupon,
            }),
        }),
    })
})

export const {
    useGetPublicStripeKeyQuery,
    useCreatePaymentMutation,
    useCheckCouponMutation,
} = checkoutApi;

export default checkoutApi;