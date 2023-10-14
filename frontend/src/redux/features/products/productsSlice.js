import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    }
});

// export actions
export const { 
    setProducts,
  
 } = productsSlice.actions;

// export reducer
export default productsSlice.reducer;