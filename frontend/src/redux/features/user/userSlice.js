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
        clearCart: (state) => {
            state.cart = [];
        },
    }
});

// export actions
export const { 
    setCart, 
    setWishlist,
    setAddressBook,
} = userSlice.actions;

// export reducer
export default userSlice.reducer;