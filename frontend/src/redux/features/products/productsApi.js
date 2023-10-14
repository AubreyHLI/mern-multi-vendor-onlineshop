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
    })
})

export const {
    useGetAllProductsQuery,
    useGetSingleShopInfoQuery,
} = productsApi;

export default productsApi;