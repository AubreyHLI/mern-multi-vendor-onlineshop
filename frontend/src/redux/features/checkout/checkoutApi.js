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
    })
})

export const {
    useGetPublicStripeKeyQuery,
    useCreatePaymentMutation,
} = checkoutApi;

export default checkoutApi;