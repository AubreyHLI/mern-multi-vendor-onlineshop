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
        })       
    })
})

export const {
    useGetAllProductsQuery,
    useGetSingleShopInfoQuery,
    useGetOrderStatusHistoryQuery,
} = productsApi;

export default productsApi;