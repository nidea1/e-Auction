import { createSlice } from '@reduxjs/toolkit';

export const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState:{
    categories: [],
  },
  reducers: {
    categoryListRequest: (state) => {
      state.loading = true;
      state.categories = []
    },
    categoryListSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    categoryListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { categoryListRequest, categoryListSuccess, categoryListFail } = categoryListSlice.actions;

export const categoryDetailsSlice = createSlice({
  name: 'categoryDetails',
  initialState:{
    category: {},
  },
  reducers: {
    categoryDetailsRequest: (state) => {
      state.loading = true;
      state.category = {}
    },
    categoryDetailsSuccess: (state, action) => {
      state.loading = false;
      state.category = action.payload;
    },
    categoryDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { categoryDetailsRequest, categoryDetailsSuccess, categoryDetailsFail } = categoryDetailsSlice.actions;
