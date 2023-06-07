import axios from 'axios'
import { 
    categoryListRequest,
    categoryListSuccess,
    categoryListFail,
    categoryDetailsRequest,
    categoryDetailsSuccess,
    categoryDetailsFail,
} from '../reducers/categoryReducers'

const createAPIinstance = () => {

    return axios.create({
        baseURL: `${process.env.REACT_APP_BASE_API_URL}/api/categories`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

}

export const listCategories = () => async (dispatch) => {
    try{
        dispatch(categoryListRequest())

        const api = createAPIinstance()
        const { data } = await api.get('/')

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

        const api = createAPIinstance()
        const { data } = await api.get(`/${id}`)

        dispatch(categoryDetailsSuccess(data))
    }catch(error){
        dispatch(categoryDetailsFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
            );
        }
    }
