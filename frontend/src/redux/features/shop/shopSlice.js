import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shopProducts: [],
        shopCoupons: [],
        shopOrders: [],
    },
    reducers: {
        setShopProducts: (state, action) => {
            state.shopProducts = [...action.payload];
        },
        setShopCoupons: (state, action) => {
            state.shopCoupons = [...action.payload];
        },
        setShopOrders: (state, action) => {
            state.shopOrders = [...action.payload];
        },
    }
});

// export actions
export const { 
    setShopProducts,
    setShopCoupons,
    setShopOrders,
} = shopSlice.actions;

// export reducer
export default shopSlice.reducer;