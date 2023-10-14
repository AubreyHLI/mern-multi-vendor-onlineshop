import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null,
    },
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state) => {
            state.token = null;
            state.user = null;
        },
    }
});

// export actions
export const { setLogin, setUser, setLogout } = authSlice.actions;

// export reducer
export default authSlice.reducer;