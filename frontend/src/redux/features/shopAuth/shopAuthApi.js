import appApi from "../../services/apiSlice";

const shopAuthApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        signupShop: builder.mutation({
            query: (shop) => ({
                url: '/shop/signup',
                method: 'POST',
                body: shop
            })
        }),
        verifyEmail: builder.mutation({
            query: (shop) => ({
                url: '/shop/verifyOtp',
                method: 'POST',
                body: shop
            })
        }),
        resendEmail: builder.mutation({
            query: (shopId) => ({
                url: '/shop/resendEmail',
                method: 'POST',
                body: shopId
            })
        }),
        loginShop: builder.mutation({
            query: (shop) => ({
                url: '/shop/login',
                method: 'POST',
                body: shop
            })
        }),
        logoutShop: builder.mutation({
            query: () => ({
                url: '/shop/logout',
                method: 'GET',
            })
        }), 
        getShop: builder.query({
            query: () => '/shop/getShop',
            providesTags: ["Shop"],
        }),
        updateShopInfo: builder.mutation({
            query: (shopInfo) => ({
                url: '/shop/updateShopInfo',
                method: 'PATCH',
                body: shopInfo
            }),
            invalidatesTags: ["Shop"],
        }),
        updateShopPw: builder.mutation({
            query: (password) => ({
                url: '/shop/updatePassword',
                method: 'PATCH',
                body: password
            })
        }),
    })
})

export const {
    useSignupShopMutation,
    useVerifyEmailMutation,
    useResendEmailMutation,
    useLoginShopMutation,
    useLogoutShopMutation,
    useGetShopQuery,
    useUpdateShopInfoMutation,
    useUpdateShopPwMutation,
} = shopAuthApi;

export default shopAuthApi;