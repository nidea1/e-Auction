import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

export const userSlice = createSlice({
  name: 'userReducers',
  initialState: {
    loading: false,
    success: false,
    error: null,
    user: {},
    userInfo: userInfoFromStorage
  },
  reducers: {

    // Login
    userLoginRequest: (state) => { state.loading = true },
    userLoginSuccess: (state, action) => { state.loading = false; state.userInfo = action.payload; state.success = true },
    userLoginFail: (state, action) => { state.loading = false; state.error = action.payload },

    // Logout
    userLogout: (state) => { state.userInfo = {} },

    // Register
    userRegisterRequest: (state) => { state.userRegisterLoading = true },
    userRegisterSuccess: (state, action) => { state.userRegisterLoading = false; state.userInfo = action.payload; state.userRegisterSuccess = true },
    userRegisterFail: (state, action) => { state.userRegisterLoading = false; state.userRegisterError = action.payload },

    // Profile
    userDetailsRequest: (state) => { state.userDetailsLoading = true },
    userDetailsSuccess: (state, action) => { state.userDetailsLoading = false; state.user = action.payload; state.userDetailsSuccess = true },
    userDetailsFail: (state, action) => { state.userDetailsLoading = false; state.userDetailsError = action.payload },

    // Update Profile
    userUpdateProfileRequest: (state) => { state.userUpdateProfileLoading = true },
    userUpdateProfileSuccess: (state, action) => { state.userUpdateProfileLoading = false; state.userInfo = action.payload; state.userUpdateProfileSuccess = true },
    userUpdateProfileFail: (state, action) => { state.userUpdateProfileLoading = false; state.userUpdateProfileError = action.payload },

    // Delete Account
    userDeleteRequest: (state) => { state.userDeleteLoading = true },
    userDeleteSuccess: (state, action) => { state.userDeleteLoading = false; state.userInfo = action.payload; state.userDeleteSuccess = true },
    userDeleteFail: (state, action) => { state.userDeleteLoading = false; state.userDeleteError = action.payload },

    // Reset Actions
    userLoginReset: (state) => { state.loading = false; state.success = false; state.error = null },
    userRegisterReset: (state) => { state.userRegisterLoading = false; state.userRegisterSuccess = false; state.userRegisterError = null },
    userDetailsReset: (state) => { state.userDetailsLoading = false; state.userRegisterSuccess = false; state.userDetailsError = null },
    userUpdateProfileReset: (state) => { state.userUpdateProfileLoading = false; state.userUpdateProfileSuccess = false; state.userUpdateProfileError = null },
    userDeleteReset: (state) => { state.userDeleteLoading = false; state.userDeleteSuccess = false; state.userDeleteError = null },

    // Reset Slice
    userSliceReset: (state) => {
      state.loading = false; state.success = false; state.error = null; state.user = {}; state.userInfo = {};
      state.userRegisterLoading = false; state.userRegisterSuccess = false; state.userRegisterError = null;
      state.userDetailsLoading = false; state.userRegisterSuccess = false; state.userDetailsError = null;
      state.userUpdateProfileLoading = false; state.userUpdateProfileSuccess = false; state.userUpdateProfileError = null;
      state.userDeleteLoading = false; state.userDeleteSuccess = false; state.userDeleteError = null
    }
  }
})

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLoginReset,

  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userRegisterReset,

  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userDetailsReset,

  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFail,
  userUpdateProfileReset,
  
  userDeleteRequest,
  userDeleteSuccess,
  userDeleteFail,
  userDeleteReset,

  userSliceReset,
  userLogout,
} = userSlice.actions
