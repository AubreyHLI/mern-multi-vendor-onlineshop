import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        order: null,
    },
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        clearOrder: (state) => {
            state.order = null;
        },
    }
});

// export actions
export const { 
    setOrder, 
    clearOrder,
} = checkoutSlice.actions;

// export reducer
export default checkoutSlice.reducer;