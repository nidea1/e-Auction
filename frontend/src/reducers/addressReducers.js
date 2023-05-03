import { createSlice } from '@reduxjs/toolkit';

export const addressListSlice = createSlice({
  name: 'addressList',
  initialState:{
    addresses: [],
  },
  reducers: {
    addressListRequest: (state) => {
      state.loading = true;
      state.addresses = [];
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
  extraReducers: (builder) => {
        builder.addCase(addressUpdateSlice.actions.addressUpdateSuccess, (state, action) => {
        const index = state.addresses.findIndex((address) => address._id === action.payload._id);
        if (index !== -1) {
            state.addresses[index] = action.payload;
        }
    });
        builder.addCase(addressCreateSlice.actions.addressCreateSuccess, (state,action) => {
            state.addresses.push(action.payload);
        })
  }
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

export const { addressUpdateRequest, addressUpdateSuccess, addressUpdateFail, addressUpdateReset } = addressUpdateSlice.actions;

export const addressCreateSlice = createSlice({
  name: 'addressCreate',
  initialState : {
      address: null
  },
  reducers: {
      addressCreateRequest: (state) => {
          state.loading = true;
      },
      addressCreateSuccess: (state,action) => {
          state.loading = false;
          state.success = true;
          state.address = action.payload
      },
      addressCreateFail: (state, action) => {
          state.loading = false;
          state.error = action.payload
      },
  },
});

export const { addressCreateRequest, addressCreateSuccess, addressCreateFail, addressCreateReset } = addressCreateSlice.actions;

export const addressDeleteSlice = createSlice({
  name: 'addressDelete',
  initialState : {
      address: null
  },
  reducers: {
      addressDeleteRequest: (state) => {
          state.loading = true;
      },
      addressDeleteSuccess: (state,action) => {
          state.loading = false;
          state.success = true;
          state.address = action.payload
      },
      addressDeleteFail: (state, action) => {
          state.loading = false;
          state.error = action.payload
      },
  },
});

export const { addressDeleteRequest, addressDeleteSuccess, addressDeleteFail } = addressDeleteSlice.actions;
