import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'productReducers',
  initialState: {
    loading: false,
    success: false,
    error: null,
    product: null,
    products: null
  },
  reducers: {

    // Products
    productListRequest: (state) => { state.loading = true },
    productListSuccess: (state, action) => { state.loading = false; state.success = true; state.products = action.payload },
    productListFail: (state, action) => { state.loading = false; state.error = action.payload },

    // Product
    productDetailsRequest: (state) => { state.productDetailsLoading = true },
    productDetailsSuccess: (state, action) => { state.productDetailsLoading = false; state.productDetailsSuccess = true; state.product = action.payload },
    productDetailsFail: (state, action) => { state.productDetailsLoading = false; state.productDetailsError = action.payload },

    //  Product Publishing
    productPublishRequest: (state) => { state.productPublishLoading = true },
    productPublishSuccess: (state, action) => { state.productPublishLoading = false; state.productPublishSuccess = true; state.product = action.payload },
    productPublishFail: (state, action) => { state.productPublishLoading = false; state.productPublishError = action.payload },

    // Reset Actions
    productListReset: (state) => { state.loading = false; state.success = false; state.error = null },
    productDetailsReset: (state) => { state.productDetailsLoading = false; state.productDetailsSuccess = false; state.productDetailsError = null },
    productPublishReset: (state) => { state.productPublishLoading = false; state.productPublishSuccess = false; state.productPublishError = null },

    // Reset Slice
    productSliceReset: (state) => {
      state.loading = false; state.success = false; state.error = null; state.product = null; state.products = null;
      state.productDetailsLoading = false; state.productDetailsSuccess = false; state.productDetailsError = null;
      state.productPublishLoading = false; state.productPublishSuccess = false; state.productPublishError = null
    }
  }
})

export const {
  productListRequest,
  productListSuccess,
  productListFail,
  productListReset,

  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  productDetailsReset,

  productPublishRequest,
  productPublishSuccess,
  productPublishFail,
  productPublishReset,

  productSliceReset,
} = productSlice.actions

export const brandSlice = createSlice({
  name: 'brandSlice',
  initialState: {
    loading: false,
    success: false,
    error: null,
    brand: {},
    brands: []
  },
  reducers : {

    // Brands
    brandListRequest: (state) => { state.loading = true },
    brandListSuccess: (state, action) => { state.loading = false; state.success = true; state.brands = action.payload },
    brandListFail: (state, action) => { state.loading = false; state.error = action.payload },

    // Reset Actions
    brandListReset: (state) => { state.loading = false; state.success = false; state.error = null },

    // Reset Slice
    brandSliceReset: (state) => {
      state.loading = false; state.success = false; state.error = null; state.brand = null; state.brands = [];
    }
  }
})

export const {

  brandListRequest,
  brandListSuccess,
  brandListFail,
  brandListReset,

  brandSliceReset,

} = brandSlice.actions
