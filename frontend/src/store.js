import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { addressListSlice, addressUpdateSlice, addressCreateSlice, addressDeleteSlice } from './reducers/addressReducers';
import { cardDeleteSlice, cardListSlice, cardUpdateSlice } from './reducers/cardReducers';
import { categoryListSlice, categoryDetailsSlice } from './reducers/categoryReducers';
import { productListSlice, productDetailsSlice, brandListSlice } from './reducers/productReducers'
import { userLoginSlice, userRegisterSlice, userDetailsSlice, userUpdateProfileSlice, userDeleteSlice } from './reducers/userReducers'

const store = configureStore({
    reducer: {
        addressCreate: addressCreateSlice.reducer,
        addressDelete: addressDeleteSlice.reducer,
        addressList: addressListSlice.reducer,
        addressUpdate: addressUpdateSlice.reducer,
        brandList: brandListSlice.reducer,
        cardDelete: cardDeleteSlice.reducer,
        cardList: cardListSlice.reducer,
        cardUpdate: cardUpdateSlice.reducer,
        categoryDetails: categoryDetailsSlice.reducer,
        categoryList: categoryListSlice.reducer,
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
