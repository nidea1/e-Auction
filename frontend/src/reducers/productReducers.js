import { createSlice } from '@reduxjs/toolkit';

export const productListSlice = createSlice({
  name: 'productList',
  initialState:{
    products: [],
  },
  reducers: {
    productListRequest: (state) => {
      state.loading = true;
      state.products = []
    },
    productListSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productListRequest, productListSuccess, productListFail } = productListSlice.actions;

export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState:{
      product: {bids: []},
    },
    reducers: {
      productDetailsRequest: (state) => {
        state.loading = true;
        state.product = {bids : []}
      },
      productDetailsSuccess: (state, action) => {
        state.loading = false;
        state.product = action.payload;
      },
      productDetailsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  
  export const { productDetailsRequest, productDetailsSuccess, productDetailsFail } = productDetailsSlice.actions;