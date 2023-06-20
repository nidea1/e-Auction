import { createSlice } from "@reduxjs/toolkit";



export const orderSlice = createSlice({
    name: 'orderReducers',
    initialState: {
        order: null,
        orders: null,

        // sellOrderLoading: false,
        // sellOrderSuccess: false,
        // sellOrderError: null,
        // sellOrder: null,
        // sellOrders: null,
    },
    reducers: {

        // Buying Orders
        buyOrderListRequest: (state) => { state.buyOrderLoading = true },
        buyOrderListSuccess: (state,action) => { state.buyOrderLoading = false; state.buyOrderSuccess = true; state.orders = action.payload },
        buyOrderListFail: (state,action) => { state.buyOrderLoading = false; state.buyOrderError = action.payload },

        // Order Detail
        orderDetailRequest: (state) => { state.orderDetailLoading = true },
        orderDetailSuccess: (state,action) => { state.orderDetailLoading = false; state.orderDetailSuccess = true; state.order = action.payload },
        orderDetailFail: (state,action) => { state.orderDetailLoading = false; state.orderDetailError = action.payload },

        // Confirmed Orders
        confirmedOrderListRequest: (state) => { state.confirmedOrderLoading = true },
        confirmedOrderListSuccess: (state,action) => { state.confirmedOrderLoading = false; state.confirmedOrderSuccess = true; state.orders = action.payload },
        confirmedOrderListFail: (state,action) => { state.confirmedOrderLoading = false; state.confirmedOrderError = action.payload },

        // // Selling Orders
        // sellOrderListRequest: (state) => { state.loading = true },
        // sellOrderListSuccess: (state,action) => { state.loading = false; state.sellOrderSuccess = true; state.sellOrders = action.payload },
        // sellOrderListFail: (state,action) => { state.loading = false; state.sellOrderError = action.payload },

        // // Selling Order
        // sellOrderDetailRequest: (state) => { state.orderDetailLoading = true },
        // sellOrderDetailSuccess: (state,action) => { state.orderDetailLoading = false; state.orderDetailSuccess = true; state.order = action.payload },
        // sellOrderDetailFail: (state,action) => { state.orderDetailLoading = false; state.orderDetailError = action.payload },

        // Update Order
        updateOrderRequest: (state) => { state.updateOrderLoading = true },
        updateOrderSuccess: (state,action) => { state.updateOrderLoading = false; state.updateOrderSuccess = true; state.order = action.payload },
        updateOrderFail: (state,action) => { state.updateOrderLoading = false; state.updateOrderError = action.payload },

        // Actions Reset
        buyOrderListReset: (state) => { state.buyOrderLoading = false; state.buyOrderSuccess = false; state.buyOrderError = null },
        orderDetailReset: (state) => { state.orderDetailLoading = false; state.orderDetailSuccess = false; state.orderDetailError = null },
        confirmedOrderListReset: (state) => { state.confirmedOrderLoading = false; state.confirmedOrderSuccess = false; state.confirmedOrderError = null },
        // sellOrderListReset: (state) => { state.loading = false; state.success = false; state.error = null },
        // sellOrderDetailReset: (state) => { state.orderDetailLoading = false; state.orderDetailSuccess = false; state.orderDetailError = null },
        updateOrderReset: (state) => { state.updateOrderLoading = false; state.updateOrderSuccess = false; state.updateOrderError = null },

        // Slice Reset
        orderSliceReset: (state) => {
            state.buyOrderLoading = false; state.buyOrderSuccess = false; state.buyOrderError = null; state.order = null; state.orders = null;
            state.orderDetailLoading = false; state.orderDetailSuccess = false; state.orderDetailError = null;
            state.confirmedOrderLoading = false; state.confirmedOrderSuccess = false; state.confirmedOrderError = null;
            state.updateOrderLoading = false; state.updateOrderSuccess = false; state.updateOrderError = null
        }

    }
})

export const {

    buyOrderListRequest,
    buyOrderListSuccess,
    buyOrderListFail,
    buyOrderListReset,

    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFail,
    orderDetailReset,

    confirmedOrderListRequest,
    confirmedOrderListSuccess,
    confirmedOrderListFail,
    confirmedOrderListReset,

    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFail,
    updateOrderReset,

    orderSliceReset,

} = orderSlice.actions
