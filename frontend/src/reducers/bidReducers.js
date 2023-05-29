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

        // Place a Bid
        bidPlaceRequest: (state) => { state.bidPlaceLoading = true },
        bidPlaceSuccess: (state,action) => { state.bidPlaceLoading = false; state.bid = action.payload; state.bidPlaceSuccess = true },
        bidPlaceFail: (state,action) => { state.bidPlaceLoading = false; state.bidPlaceError = action.payload },

        // Calculate Paid Amount
        bidPaidRequest: (state) => { state.bidPaidLoading = true },
        bidPaidSuccess: (state,action) => { state.bidPaidLoading = false; state.bid = action.payload; state.bidPaidSuccess = true },
        bidPaidFail: (state,action) => { state.bidPaidLoading = false; state.bidPaidError = action.payload },

        // Product Bids List
        bidProductRequest: (state) => { state.bidProductLoading = true },
        bidProductSuccess: (state,action) => { state.bidProductLoading = false; state.bids = action.payload; state.bidProductSuccess = true },
        bidProductFail: (state,action) => { state.bidProductLoading = false; state.bidProductError = action.payload },

        // Reset Actions
        bidListReset: (state) => { state.loading = false; state.success = false; state.error = null },
        bidPlaceReset: (state) => { state.bidPlaceLoading = false; state.bidPlaceSuccess = false; state.bidPlaceError = null },
        bidPaidReset: (state) => { state.bidPaidLoading = false; state.bidPaidSuccess = false; state.bidPaidError = null },
        bidProductReset: (state) => { state.bidProductLoading = false; state.bidProductSuccess = false; state.bidProductError = null },


        // Reset Slice
        bidSliceReset: (state) => {
            state.loading = false; state.success = false; state.error = null; state.bids = null; state.bid = null;
            state.bidPlaceLoading = false; state.bidPlaceSuccess = false; state.bidPlaceError = null;
            state.bidPaidLoading = false; state.bidPaidSuccess = false; state.bidPaidError = null
            state.bidProductLoading = false; state.bidProductSuccess = false; state.bidProductError = null
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

    bidPaidRequest,
    bidPaidSuccess,
    bidPaidFail,
    bidPaidReset,

    bidProductRequest,
    bidProductSuccess,
    bidProductFail,
    bidProductReset,

    bidSliceReset,
} = bidSlice.actions
