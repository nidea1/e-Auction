import { createSlice } from "@reduxjs/toolkit";



export const orderSlice = createSlice({
    name: 'orderReducers',
    initialState: {
        buyOrderLoading: false,
        buyOrderSuccess: false,
        buyOrderError: null,
        buyOrder: null,
        buyOrders: null,

        // sellOrderLoading: false,
        // sellOrderSuccess: false,
        // sellOrderError: null,
        // sellOrder: null,
        // sellOrders: null,
    },
    reducers: {

        // Buying Orders
        buyOrderListRequest: (state) => { state.buyOrderLoading = true },
        buyOrderListSuccess: (state,action) => { state.buyOrderLoading = false; state.buyOrderSuccess = true; state.buyOrders = action.payload },
        buyOrderListFail: (state,action) => { state.buyOrderLoading = false; state.buyOrderError = action.payload },

        // Buying Order
        buyOrderDetailRequest: (state) => { state.buyOrderDetailLoading = true },
        buyOrderDetailSuccess: (state,action) => { state.buyOrderDetailLoading = false; state.buyOrderDetailSuccess = true; state.buyOrder = action.payload },
        buyOrderDetailFail: (state,action) => { state.buyOrderDetailLoading = false; state.buyOrderDetailError = action.payload },

        // // Selling Orders
        // sellOrderListRequest: (state) => { state.loading = true },
        // sellOrderListSuccess: (state,action) => { state.loading = false; state.sellOrderSuccess = true; state.sellOrders = action.payload },
        // sellOrderListFail: (state,action) => { state.loading = false; state.sellOrderError = action.payload },

        // // Selling Order
        // sellOrderDetailRequest: (state) => { state.orderDetailLoading = true },
        // sellOrderDetailSuccess: (state,action) => { state.orderDetailLoading = false; state.orderDetailSuccess = true; state.order = action.payload },
        // sellOrderDetailFail: (state,action) => { state.orderDetailLoading = false; state.orderDetailError = action.payload },

        // Actions Reset
        buyOrderListReset: (state) => { state.buyOrderLoading = false; state.buyOrderSuccess = false; state.buyOrderError = null },
        buyOrderDetailReset: (state) => { state.buyOrderDetailLoading = false; state.buyOrderDetailSuccess = false; state.buyOrderDetailError = null },
        // sellOrderListReset: (state) => { state.loading = false; state.success = false; state.error = null },
        // sellOrderDetailReset: (state) => { state.orderDetailLoading = false; state.orderDetailSuccess = false; state.orderDetailError = null },

        // Slice Reset
        orderSliceReset: (state) => {
            state.buyOrderLoading = false; state.buyOrderSuccess = false; state.buyOrderError = null; state.buyOrder = null; state.buyOrders = null;
            state.buyOrderDetailLoading = false; state.buyOrderDetailSuccess = false; state.buyOrderDetailError = null
        }

    }
})

export const {

    buyOrderListRequest,
    buyOrderListSuccess,
    buyOrderListFail,
    buyOrderListReset,

    buyOrderDetailRequest,
    buyOrderDetailSuccess,
    buyOrderDetailFail,
    buyOrderDetailReset,

    orderSliceReset,

} = orderSlice.actions
