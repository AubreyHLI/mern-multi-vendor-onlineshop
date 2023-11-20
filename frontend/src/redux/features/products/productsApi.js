import appApi from "../../services/apiSlice";

const productsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/products/getAllProducts',
            providesTags: ["Products"],
        }),
        getSingleShopInfo: builder.query({
            query: (shopId) => `/shop/getShopInfo/${shopId}`,
        }), 
        getOrderStatusHistory: builder.query({
            query: (detailId) => `/orders/getOrderStatusHistory/${detailId}`
        }),
        createProductReview: builder.mutation({
            query: (review) => ({
                url: '/products/createReview',
                method: 'POST',
                body: review
            }),
            invalidatesTags: ["Products", "Orders"]
        })   
    })
})

export const {
    useGetAllProductsQuery,
    useGetSingleShopInfoQuery,
    useGetOrderStatusHistoryQuery,
    useCreateProductReviewMutation,
} = productsApi;

export default productsApi;