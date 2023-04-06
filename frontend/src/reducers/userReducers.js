import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null



export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    userInfo: userInfoFromStorage
  },
  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
        state.userInfo = null;
      },
  },
});

export const { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } = userLoginSlice.actions;

export const userRegisterSlice = createSlice({
    name: 'userRegister',
    initialState: {
      userInfo: userInfoFromStorage
    },
    reducers: {
      userRegisterRequest: (state) => {
        state.loading = true;
      },
      userRegisterSuccess: (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      },
      userRegisterFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  
export const { userRegisterRequest, userRegisterSuccess, userRegisterFail } = userRegisterSlice.actions;

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    user : { }
  },
  reducers: {
    userDetailsRequest: (state) => {
      state.loading = true;
    },
    userDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userDetailsReset: (state) => {
      state.user = { }
    },
  },
});

export const { userDetailsRequest, userDetailsSuccess, userDetailsFail, userDetailsReset } = userDetailsSlice.actions;

export const userUpdateProfileSlice = createSlice({
  name: 'userUpdateProfile',
  initialState: {
    userInfo: null,
  },
  reducers: {
    userUpdateProfileRequest: (state) => {
      state.loading = true;
    },
    userUpdateProfileSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
    },
    userUpdateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userUpdateProfileReset: (state) => {
      state.success = false;
      state.error = null;
    },
  },
});

export const { userUpdateProfileRequest, userUpdateProfileSuccess, userUpdateProfileFail, userUpdateProfileReset } = userUpdateProfileSlice.actions;