import axios from 'axios'
import { 
    categoryListRequest,
    categoryListSuccess,
    categoryListFail,
    categoryDetailsRequest,
    categoryDetailsSuccess,
    categoryDetailsFail,
 } from '../reducers/categoryReducers'

export const listCategories = () => async (dispatch) => {
    try{
        dispatch(categoryListRequest())

        const { data } = await axios.get('/api/categories/')

        dispatch(categoryListSuccess(data))
    }catch(error){
        dispatch(categoryListFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
            );
        }
    }

export const detailCategories = (id) => async (dispatch) => {
    try{
        dispatch(categoryDetailsRequest())

        const { data } = await axios.get(`/api/categories/${id}`)

        dispatch(categoryDetailsSuccess(data))
    }catch(error){
        dispatch(categoryDetailsFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
            );
        }
    }
