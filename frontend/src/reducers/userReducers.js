import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

export const userSlice = createSlice({
  name: 'userReducers',
  initialState: {
    loading: false,
    success: false,
    error: null,
    user: userFromStorage,
    userInfo: null,
  },
  reducers: {

    // Login
    userLoginRequest: (state) => { state.loading = true },
    userLoginSuccess: (state, action) => { state.loading = false; state.userInfo = action.payload; state.success = true },
    userLoginFail: (state, action) => { state.loading = false; state.error = action.payload },

    // Logout
    userLogoutRequest: (state) => { state.userLogoutLoading = false },
    userLogoutSuccess: (state) => { state.userLogoutLoading = false; state.userInfo = null; state.user = null; state.userLogoutSuccess = true },
    userLogoutFail: (state,action) => { state.userLogoutLoading = false; state.userLogoutError = action.payload },

    // Register
    userRegisterRequest: (state) => { state.userRegisterLoading = true },
    userRegisterSuccess: (state) => { state.userRegisterLoading = false; state.userRegisterSuccess = true },
    userRegisterFail: (state, action) => { state.userRegisterLoading = false; state.userRegisterError = action.payload },

    // Verify E-mail
    userVerifyRequest: (state) => { state.userVerifyLoading = true },
    userVerifySuccess: (state) => { state.userVerifyLoading = false; state.userVerifySuccess = true; },
    userVerifyFail: (state,action) => { state.userVerifyLoading = false; state.userVerifyError = action.payload },

    // Send Verify E-mail
    userSendVerifyEmailRequest: (state) => { state.userSendVerifyEmailLoading = true },
    userSendVerifyEmailSuccess: (state) => { state.userSendVerifyEmailLoading = false; state.userSendVerifyEmailSuccess = true; },
    userSendVerifyEmailFail: (state,action) => { state.userSendVerifyEmailLoading = false; state.userSendVerifyEmailError = action.payload },

    // Profile
    userDetailsRequest: (state) => { state.userDetailsLoading = true },
    userDetailsSuccess: (state, action) => { state.userDetailsLoading = false; state.user = action.payload; state.userDetailsSuccess = true },
    userDetailsFail: (state, action) => { state.userDetailsLoading = false; state.userDetailsError = action.payload },

    // Update Profile
    userUpdateProfileRequest: (state) => { state.userUpdateProfileLoading = true },
    userUpdateProfileSuccess: (state, action) => { state.userUpdateProfileLoading = false; state.user = action.payload; state.userUpdateProfileSuccess = true },
    userUpdateProfileFail: (state, action) => { state.userUpdateProfileLoading = false; state.userUpdateProfileError = action.payload },

    // Delete Account
    userDeleteRequest: (state) => { state.userDeleteLoading = true },
    userDeleteSuccess: (state, action) => { state.userDeleteLoading = false; state.user = action.payload; state.userDeleteSuccess = true },
    userDeleteFail: (state, action) => { state.userDeleteLoading = false; state.userDeleteError = action.payload },

    // Reset Actions
    userLoginReset: (state) => { state.loading = false; state.success = false; state.error = null },
    userLogoutReset: (state) => { state.userLogoutLoading = false; state.userLogoutSuccess = false; state.userLogoutError = null },
    userRegisterReset: (state) => { state.userRegisterLoading = false; state.userRegisterSuccess = false; state.userRegisterError = null },
    userDetailsReset: (state) => { state.userDetailsLoading = false; state.userDetailsSuccess = false; state.userDetailsError = null },
    userUpdateProfileReset: (state) => { state.userUpdateProfileLoading = false; state.userUpdateProfileSuccess = false; state.userUpdateProfileError = null },
    userDeleteReset: (state) => { state.userDeleteLoading = false; state.userDeleteSuccess = false; state.userDeleteError = null; state.user = null },
    userVerifyReset: (state) => { state.userVerifyLoading = false; state.userVerifySuccess = false; state.userVerifyError = null },
    userSendVerifyEmailReset: (state) => { state.userSendVerifyEmailLoading = false; state.userSendVerifyEmailSuccess = false; state.userSendVerifyEmailError = null },

    // Reset Slice
    userSliceReset: (state) => {
      state.loading = false; state.success = false; state.error = null; state.user = null; state.userInfo = null;
      state.userRegisterLoading = false; state.userRegisterSuccess = false; state.userRegisterError = null;
      state.userDetailsLoading = false; state.userRegisterSuccess = false; state.userDetailsError = null;
      state.userUpdateProfileLoading = false; state.userUpdateProfileSuccess = false; state.userUpdateProfileError = null;
      state.userDeleteLoading = false; state.userDeleteSuccess = false; state.userDeleteError = null;
      state.userVerifyLoading = false; state.userVerifySuccess = false; state.userVerifyError = null;
      state.userSendVerifyEmailLoading = false; state.userSendVerifyEmailSuccess = false; state.userSendVerifyEmailError = null;
      state.userLogoutLoading = false; state.userLogoutSuccess = false; state.userLogoutError = null;
    }
  }
})

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLoginReset,

  userLogoutRequest,
  userLogoutSuccess,
  userLogoutFail,
  userLogoutReset,

  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userRegisterReset,

  userVerifyRequest,
  userVerifySuccess,
  userVerifyFail,
  userVerifyReset,

  userSendVerifyEmailRequest,
  userSendVerifyEmailSuccess,
  userSendVerifyEmailFail,
  userSendVerifyEmailReset,

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
} = userSlice.actions
