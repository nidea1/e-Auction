import axios from 'axios'
import { 
    productListRequest,
    productListSuccess,
    productListFail,
    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFail,
 } from '../reducers/productReducers'

export const listProducts = () => async (dispatch) => {
    try{
        dispatch(productListRequest())

        const { data } = await axios.get('/api/products/')

        dispatch(productListSuccess(data))
    }catch(error){
        dispatch(productListFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
            );
        }
    }

export const detailProducts = (id) => async (dispatch) => {
    try{
        dispatch(productDetailsRequest())

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch(productDetailsSuccess(data))
    }catch(error){
        dispatch(productDetailsFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
            );
        }
    }