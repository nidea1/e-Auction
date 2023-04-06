import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { productListSlice, productDetailsSlice } from './reducers/productReducers'
import { userLoginSlice, userRegisterSlice, userDetailsSlice, userUpdateProfileSlice } from './reducers/userReducers'

const store = configureStore({
    reducer: {
        productList: productListSlice.reducer,
        productDetails: productDetailsSlice.reducer,
        userLogin: userLoginSlice.reducer,
        userRegister: userRegisterSlice.reducer, 
        userDetails: userDetailsSlice.reducer,
        userUpdateProfile: userUpdateProfileSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store