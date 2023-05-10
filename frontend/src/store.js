import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { addressListSlice, addressUpdateSlice, addressCreateSlice, addressDeleteSlice } from './reducers/addressReducers';
import { cardSlice } from './reducers/cardReducers';
import { categoryListSlice, categoryDetailsSlice } from './reducers/categoryReducers';
import { brandSlice, productSlice } from './reducers/productReducers'
import { userLoginSlice, userRegisterSlice, userDetailsSlice, userUpdateProfileSlice, userDeleteSlice } from './reducers/userReducers'

const store = configureStore({
    reducer: {
        addressCreate: addressCreateSlice.reducer,
        addressDelete: addressDeleteSlice.reducer,
        addressList: addressListSlice.reducer,
        addressUpdate: addressUpdateSlice.reducer,
        brandReducers: brandSlice.reducer,
        cardReducers: cardSlice.reducer,
        categoryDetails: categoryDetailsSlice.reducer,
        categoryList: categoryListSlice.reducer,
        productReducers: productSlice.reducer,
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
