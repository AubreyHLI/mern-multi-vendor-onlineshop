import appApi from "../../services/apiSlice";

const userApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getCartItems: builder.query({
            query: () => '/users/getCart',
            providesTags: ["CartItems"],
        }),
        addToCart: builder.mutation({
            query: (item) => ({
                url: '/users/addCartItem',
                method: 'POST',
                body: item
            }),
            invalidatesTags: ["CartItems"],
        }),
        removeFromCart: builder.mutation({
            query: (item) => ({
                url: '/users/removeCartItem',
                method: 'DELETE',
                body: item
            }),
            invalidatesTags: ["CartItems"],
        }),
        updateCart: builder.mutation({
            query: (item) => ({
                url: '/users/updateCartItem',
                method: 'PATCH',
                body: item
            }),
            invalidatesTags: ["CartItems"],
        }),
        getWishlist: builder.query({
            query: () => '/users/getWishlist',
            providesTags: ["Wishlist"],
        }),
        addToWishlist: builder.mutation({
            query: (item) => ({
                url: '/users/addWishlist',
                method: 'POST',
                body: item
            }),
            invalidatesTags: ["Wishlist"],
        }),
        removeFromWishlist: builder.mutation({
            query: (item) => ({
                url: '/users/removeWishlist',
                method: 'DELETE',
                body: item
            }),
            invalidatesTags: ["Wishlist"],
        }),
        getAddressBook: builder.query({
            query: () => '/users/getAddresses',
            providesTags: ["AddressBook"],
        }),
        addAddress: builder.mutation({
            query: (address) => ({
                url: '/users/addAddress',
                method: 'POST',
                body: address
            }),
            invalidatesTags: ["AddressBook"],
        }),
        updateDefaultAddress: builder.mutation({
            query: (addressId) => ({
                url: '/users/updateDefaultAddress',
                method: 'PATCH',
                body: addressId
            }),
            invalidatesTags: ["AddressBook"],
        }),
        updateAddress: builder.mutation({
            query: (item) => ({
                url: `/users/updateAddress/${item.addressId}`,
                method: 'PATCH',
                body: item.address
            }),
            invalidatesTags: ["AddressBook"],
        }),
        deleteAddress: builder.mutation({
            query: (addressId) => ({
                url: `/users/deleteAddress/${addressId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["AddressBook"],
        }),
    })
})

export const {
    useGetCartItemsQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useUpdateCartMutation,
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useGetAddressBookQuery,
    useAddAddressMutation,
    useUpdateDefaultAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
} = userApi;

export default userApi;