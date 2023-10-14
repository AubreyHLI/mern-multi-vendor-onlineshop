import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shopProducts: [],
    },
    reducers: {
        setShopProducts: (state, action) => {
            state.shopProducts = [...action.payload];
        },
    }
});

// export actions
export const { 
    setShopProducts,
} = shopSlice.actions;

// export reducer
export default shopSlice.reducer;