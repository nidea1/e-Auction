import { createSlice } from '@reduxjs/toolkit';

export const addressListSlice = createSlice({
  name: 'addressList',
  initialState:{
    addresses: [],
  },
  reducers: {
    addressListRequest: (state) => {
      state.loading = true;
      state.addresses = []
    },
    addressListSuccess: (state, action) => {
      state.loading = false;
      state.addresses = action.payload;
    },
    addressListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addressListRequest, addressListSuccess, addressListFail } = addressListSlice.actions;

export const addressUpdateSlice = createSlice({
    name: 'addressUpdate',
    initialState : {
        address: null
    },
    reducers: {
        addressUpdateRequest: (state) => {
            state.loading = true;
        },
        addressUpdateSuccess: (state,action) => {
            state.loading = false;
            state.success = true;
            state.address = action.payload
        },
        addressUpdateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        addressUpdateReset: (state) => {
            state.success = false;
            state.error = null;
        },
    },
});

export const { addressUpdateRequest, addressUpdateSuccess, addressUpdateFail } = addressUpdateSlice.actions;
