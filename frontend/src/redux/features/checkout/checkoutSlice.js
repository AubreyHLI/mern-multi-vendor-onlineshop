import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        shippingAddress: null,
        shopOrders: new Map(),
        allDiscount: null,
        total: null,
    },
    reducers: {
        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },
        addShopOrder: (state, action) => {
            state.shopOrders.set(action.payload.key, action.payload.value);
        },
        // setShopOrders: (state, action) => {

        // },
       
        clearOrder: (state) => {
            state.order = null;
        },
    }
});

// export actions
export const { 
    setShippingAddress, 
    addShopOrder,
    clearOrder,
} = checkoutSlice.actions;

// export reducer
export default checkoutSlice.reducer;