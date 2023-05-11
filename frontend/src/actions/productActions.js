import axios from 'axios'
import qs from 'qs'
import { 
    productListRequest,
    productListSuccess,
    productListFail,

    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFail,

    productPublishRequest,
    productPublishSuccess,
    productPublishFail,

    brandListRequest,
    brandListSuccess,
    brandListFail,
} from '../reducers/productReducers'

const createAPIinstance = (getState, isMultipart) => {
    
    const {
        userLogin: { userInfo }
    } = getState()

    return axios.create({
        baseURL: '/api/products',
        headers: {
            "Content-Type": isMultipart ? 'multipart/form-data' : 'application/json',
            'Authorization': isMultipart ? `Bearer ${userInfo.token}` : ''
        }
    })
}

 export const listProducts = (keyword, category, brands) => async (dispatch, getState) => {
    try {
        dispatch(productListRequest());

        let params = {};

        if (keyword) {
            params.search = keyword;
        }
        if (category) {
            params.category = category;
        }
        if (brands) {
            params.brand = brands;
        }
        
        const api = createAPIinstance(getState)
        const { data } = await api.get(`/?${qs.stringify(params, { arrayFormat: 'repeat' })}`);

        dispatch(productListSuccess(data));
    } catch (error) {
        dispatch(productListFail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ));
    }
};

export const detailProducts = (id) => async (dispatch, getState) => {
    try{
        dispatch(productDetailsRequest())

        const api = createAPIinstance(getState)
        const { data } = await api.get(`/${id}`)

        dispatch(productDetailsSuccess(data))
    }catch(error){
        dispatch(productDetailsFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ));
    }
}

export const publishProduct = (product) => async (dispatch, getState) => {
    try{
        dispatch(productPublishRequest())

        const api = createAPIinstance(getState, true)
        const { data } = await api.post('/', product)

        dispatch(productPublishSuccess(data))
    }catch(error){
        dispatch(productPublishFail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ))
    }
}

export const listBrands = () => async (dispatch) => {
    try{
        dispatch(brandListRequest())

        const { data } = await axios.get(`/api/products/brands/`)

        dispatch(brandListSuccess(data))
    }catch(error){
        dispatch(brandListFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
            );
        }
    }
