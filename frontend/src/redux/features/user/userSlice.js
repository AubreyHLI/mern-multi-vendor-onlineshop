import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        cart: [],
        wishlist: [],
        addressBook: null,
        orderHistory: []
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload.cartDetails;
        },
        setWishlist: (state, action) => {
            state.wishlist = action.payload.wishlistDetails;
        },
        setAddressBook: (state, action) => {
            state.addressBook = action.payload;
        },
        setOrders: (state, action) => {
            state.orderHistory = action.payload;
        },
        clearCart: (state) => {
            state.cart = [];
        },
        clearUserData: (state) => {
            state.cart = [];
            state.wishlist = [];
            state.addressBook = null;
            state.orderHistory = [];
        }
    }
});

// export actions
export const { 
    setCart, 
    setWishlist,
    setAddressBook,
    clearCart,
    clearUserData,
} = userSlice.actions;

// export reducer
export default userSlice.reducer;