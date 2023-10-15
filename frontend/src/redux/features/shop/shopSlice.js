import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shopProducts: [],
        shopCoupons: [],
    },
    reducers: {
        setShopProducts: (state, action) => {
            state.shopProducts = [...action.payload];
        },
        setShopCoupons: (state, action) => {
            state.shopCoupons = [...action.payload];
        },
    }
});

// export actions
export const { 
    setShopProducts,
    setShopCoupons,
} = shopSlice.actions;

// export reducer
export default shopSlice.reducer;