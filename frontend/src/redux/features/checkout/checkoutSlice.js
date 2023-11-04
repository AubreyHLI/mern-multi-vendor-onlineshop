import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        shippingAddress: null,
        allDiscount: null,
        total: null,
    },
    reducers: {
        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },
        // setShopOrders: (state, action) => {

        // },
    }
});

// export actions
export const { 
    setShippingAddress, 
} = checkoutSlice.actions;

// export reducer
export default checkoutSlice.reducer;