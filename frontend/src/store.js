import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { addressSlice } from './reducers/addressReducers';
import { bidSlice } from './reducers/bidReducers';
import { cardSlice } from './reducers/cardReducers';
import { categorySlice } from './reducers/categoryReducers';
import { orderSlice } from './reducers/orderReducers';
import { brandSlice, productSlice } from './reducers/productReducers'
import { socialSlice } from './reducers/socialReducers';
import { userSlice } from './reducers/userReducers'

const store = configureStore({
    reducer: {
        addressReducers: addressSlice.reducer,
        bidReducers: bidSlice.reducer,
        brandReducers: brandSlice.reducer,
        cardReducers: cardSlice.reducer,
        categoryReducers: categorySlice.reducer,
        orderReducers: orderSlice.reducer,
        productReducers: productSlice.reducer,
        socialReducers: socialSlice.reducer,
        userReducers: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store
