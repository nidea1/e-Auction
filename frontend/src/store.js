import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { addressListSlice, addressUpdateSlice, addressCreateSlice, addressDeleteSlice } from './reducers/addressReducer';
import { productListSlice, productDetailsSlice } from './reducers/productReducers'
import { userLoginSlice, userRegisterSlice, userDetailsSlice, userUpdateProfileSlice, userDeleteSlice } from './reducers/userReducers'

const store = configureStore({
    reducer: {
        addressCreate: addressCreateSlice.reducer,
        addressDelete: addressDeleteSlice.reducer,
        addressList: addressListSlice.reducer,
        addressUpdate: addressUpdateSlice.reducer,
        productDetails: productDetailsSlice.reducer,
        productList: productListSlice.reducer,
        userDetails: userDetailsSlice.reducer,
        userDelete: userDeleteSlice.reducer,
        userLogin: userLoginSlice.reducer,
        userRegister: userRegisterSlice.reducer,
        userUpdateProfile: userUpdateProfileSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store
