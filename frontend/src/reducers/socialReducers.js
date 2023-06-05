import { createSlice } from "@reduxjs/toolkit";


export const socialSlice = createSlice({
    name: 'socialReducers',
    initialState: {
        loading: false,
        success: false,
        error: null,
        social: null,
    },
    reducers: {

        // Social
        socialLoginRequest: (state) => { state.loading = true },
        socialLoginSuccess: (state,action) => { state.loading = false; state.social = action.payload; state.success = true },
        socialLoginFail: (state,action) => { state.loading = false; state.error = action.payload },

        // Reset Actions
        socialLoginReset: (state) => { state.loading = false; state.success = false; state.error = null },

        // Reset Slice
        socialSliceReset: (state) => { state.loading = false; state.success = false; state.error = null; state.social = null }
    }
})

export const {
    socialLoginRequest,
    socialLoginSuccess,
    socialLoginFail,
    socialLoginReset,

    socialSliceReset,
} = socialSlice.actions
