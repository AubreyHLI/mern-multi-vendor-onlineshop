import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        shippingAddress: null,
        subTotalPrice: null,
        allDiscount: null,
        shipping: null,
        totalPrice: null,
    },
    reducers: {
        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },
        setChekoutSummary: (state, action) => {
            state.subTotalPrice = action.payload.subTotalPrice;
            state.allDiscount = action.payload.allDiscount;
            state.shipping = action.payload.shipping;
            state.totalPrice = action.payload.totalPrice;
        },
        clearCheckoutSummary: (state) => {
            state.subTotalPrice = null;
            state.allDiscount = null;
            state.shipping = null;
            state.totalPrice = null;
        }
    }
});

// export actions
export const { 
    setShippingAddress, 
    setChekoutSummary,
    clearCheckoutSummary,
} = checkoutSlice.actions;

// export reducer
export default checkoutSlice.reducer;