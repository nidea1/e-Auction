import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { addressSlice } from './reducers/addressReducers';
import { cardSlice } from './reducers/cardReducers';
import { categorySlice } from './reducers/categoryReducers';
import { brandSlice, productSlice } from './reducers/productReducers'
import { userSlice } from './reducers/userReducers'

const store = configureStore({
    reducer: {
        addressReducers: addressSlice.reducer,
        brandReducers: brandSlice.reducer,
        cardReducers: cardSlice.reducer,
        categoryReducers: categorySlice.reducer,
        productReducers: productSlice.reducer,
        userReducers: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store
