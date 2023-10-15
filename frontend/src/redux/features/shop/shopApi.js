import appApi from "../../services/apiSlice";

const shopApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getShopProducts: builder.query({
            query: (shopId) => `/products/getShopProducts/${shopId}`,
            providesTags: ["ShopProducts"],
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: '/products/createProduct',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ["ShopProducts"],
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/products/deleteProduct/${productId}`,
                method: 'DELETE',
                body: productId
            }),
            invalidatesTags: ["ShopProducts"],
        }),
        updateProduct: builder.mutation({
            query: (item) => ({
                url: `/products/updateProduct/${item.productId}`,
                method: 'PATCH',
                body: item.product
            }),
            invalidatesTags: ["ShopProducts"],
        }),

        getShopCoupons: builder.query({
            query: (shopId) => '/coupons/getShopCoupons',
            providesTags: ["ShopCoupons"],
        }),
        addCoupon: builder.mutation({
            query: (coupon) => ({
                url: '/coupons/createCoupon',
                method: 'POST',
                body: coupon
            }),
            invalidatesTags: ["ShopCoupons"],

        })
    })
})

export const {
   useGetShopProductsQuery,
   useAddProductMutation,
   useDeleteProductMutation,
   useUpdateProductMutation,
   useGetShopCouponsQuery,
   useAddCouponMutation,
} = shopApi;

export default shopApi;