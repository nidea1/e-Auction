import { createSlice } from '@reduxjs/toolkit';


export const categorySlice = createSlice({
  name: 'categoryReducers',
  initialState: {
    loading: false,
    success: false,
    error: null,
    category: {},
    categories: []
  },
  reducers: {

    // Categories
    categoryListRequest: (state) => { state.loading = true },
    categoryListSuccess: (state, action) => { state.loading = false; state.success = true; state.categories = action.payload },
    categoryListFail: (state, action) => { state.loading = false; state.error = action.payload },

    // Category
    categoryDetailsRequest: (state) => { state.categoryDetailsLoading = true },
    categoryDetailsSuccess: (state, action) => { state.categoryDetailsLoading = false; state.categoryDetailsSuccess = true; state.category = action.payload },
    categoryDetailsFail: (state, action) => { state.categoryDetailsLoading = false; state.categoryDetailsError = action.payload },

    // Reset Actions
    categoryListReset: (state) => { state.loading = false; state.success = false; state.error = null },
    categoryDetailsReset: (state) => { state.categoryDetailsLoading = false; state.categoryDetailsSuccess = false; state.categoryDetailsError = null },
  
    // Reset Slice
    categorySliceReset: (state) => {
      state.loading = false; state.success = false; state.error = null; state.categories = null;
      state.categoryDetailsLoading = false; state.categoryDetailsSuccess = false; state.categoryDetailsError = null; state.category = null
    },
  }
})

export const {
  categoryListRequest,
  categoryListFail,
  categoryListSuccess,
  categoryListReset,

  categoryDetailsRequest,
  categoryDetailsSuccess,
  categoryDetailsFail,
  categoryDetailsReset,

  categorySliceReset
} = categorySlice.actions
