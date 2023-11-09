import appApi from "../../services/apiSlice";

const checkoutApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getPublicStripeKey: builder.query({
            query: () => '/payment/config',
        }),
        checkCoupon: builder.mutation({
            query: (coupon) => ({
                url: `/coupons/checkCoupon/${coupon.code}`,
                method: 'POST',
                body: coupon,
            }),
        }),
        createOrders: builder.mutation({
            query: (ordersData) => ({
                url: 'orders/createOrders',
                method: 'POST',
                body: ordersData
            })
        })
    })
})

export const {
    useGetPublicStripeKeyQuery,
    useCheckCouponMutation,
    useCreateOrdersMutation,
} = checkoutApi;

export default checkoutApi;