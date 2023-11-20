import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shopProducts: [],
        shopCoupons: [],
        shopOrders: [],
        shopRefunds: []
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
        setShopRefunds: (state, action) => {
            state.shopRefunds = [...action.payload];
        },
    }
});

// export actions
export const { 
    setShopProducts,
    setShopCoupons,
    setShopOrders,
    setShopRefunds,
} = shopSlice.actions;

// export reducer
export default shopSlice.reducer;