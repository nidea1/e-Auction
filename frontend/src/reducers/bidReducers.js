import { createSlice } from "@reduxjs/toolkit";

export const bidSlice = createSlice({
    name: 'bidReducers',
    initialState: {
        loading: false,
        success: false,
        error: null,
        bids: [],
        bid: {}
    },
    reducers: {
        
        // Bids
        bidListRequest: (state) => { state.loading = true },
        bidListSuccess: (state,action) => { state.loading = false; state.success = true; state.bids = action.payload },
        bidListFail: (state,action) => { state.loading = false; state.error = action.payload },

        // Place a bid
        bidPlaceRequest: (state) => { state.bidPlaceLoading = true },
        bidPlaceSuccess: (state,action) => { state.bidPlaceLoading = false; state.bid = action.payload; state.bidPlaceSuccess = true },
        bidPlaceFail: (state,action) => { state.bidPlaceLoading = false; state.bidPlaceError = action.payload },

        // Reset Actions
        bidListReset: (state) => { state.loading = false; state.success = false; state.error = null },
        bidPlaceReset: (state) => { state.bidPlaceLoading = false; state.bidPlaceSuccess = false; state.bidPlaceError = null },

        // Reset Slice
        bidSliceReset: (state) => {
            state.loading = false; state.success = false; state.error = null; state.bids = []; state.bid = {};
            state.bidPlaceLoading = false; state.bidPlaceSuccess = false; state.bidPlaceError = null
        }
    }
})

export const {
    bidListRequest,
    bidListSuccess,
    bidListFail,
    bidListReset,

    bidPlaceRequest,
    bidPlaceSuccess,
    bidPlaceFail,
    bidPlaceReset,

    bidSliceReset,
} = bidSlice.actions
