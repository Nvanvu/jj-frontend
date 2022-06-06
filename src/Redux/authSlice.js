import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: 'idle',
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.status = action.payload.status;
            state.user = action.payload.data;
        },
        login: (action) => {
            localStorage.setItem('accessToken', action.payload.accessToken);
            window.location.href = action.payload.returnUrl || '/';
        },
        logout: (state) => {
            localStorage.removeItem('accessToken');
            state.user = null;
        },
    }
})

export const { setUserInfo, login, logout, link } = authSlice.actions;

export default authSlice.reducer;