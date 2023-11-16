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
            query: () => '/coupons/getShopCoupons',
            providesTags: ["ShopCoupons"],
        }),
        addCoupon: builder.mutation({
            query: (coupon) => ({
                url: '/coupons/createCoupon',
                method: 'POST',
                body: coupon
            }),
            invalidatesTags: ["ShopCoupons"],
        }),
        deleteCoupon: builder.mutation({
            query: (couponId) => ({
                url: `/coupons/deleteCoupon/${couponId}`,
                method: 'DELETE',
                body: couponId
            }),
            invalidatesTags: ["ShopCoupons"],
        }),
        updateCoupon: builder.mutation({
            query: (item) => ({
                url: `/coupons/updateCoupon/${item.couponId}`,
                method: 'PATCH',
                body: item.coupon
            }),
            invalidatesTags: ["ShopCoupons"],
        }),

        getShopOrders: builder.query({
            query: () => '/orders/getShopOrders',
            providesTags: ["ShopOrders"],
        }),
    })
})

export const {
   useGetShopProductsQuery,
   useAddProductMutation,
   useDeleteProductMutation,
   useUpdateProductMutation,
   useGetShopCouponsQuery,
   useAddCouponMutation,
   useDeleteCouponMutation,
   useUpdateCouponMutation,
   useGetShopOrdersQuery,
} = shopApi;

export default shopApi;