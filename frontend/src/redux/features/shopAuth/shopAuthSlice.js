import { createSlice } from "@reduxjs/toolkit";

export const shopAuthSlice = createSlice({
    name: 'shopAuth',
    initialState: {
        shopToken: null,
        shop: null,
    },
    reducers: {
        setShopLogin: (state, action) => {
            state.shopToken = action.payload.shopToken;
            state.shop = action.payload.shop;
        },
        setShop: (state, action) => {
            state.shop = action.payload;
        },
        setShopLogout: (state) => {
            state.shopToken = null;
            state.shop = null;
        },
    }
});

// export actions
export const { setShopLogin, setShop, setShopLogout  } = shopAuthSlice.actions;

// export reducer
export default shopAuthSlice.reducer;