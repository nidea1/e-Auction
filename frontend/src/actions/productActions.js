import axios from 'axios'
import qs, { parse } from 'qs'
import { 
    productListRequest,
    productListSuccess,
    productListFail,
    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFail,
    brandListRequest,
    brandListSuccess,
    brandListFail,
 } from '../reducers/productReducers'

 export const listProducts = (keyword, category, brands) => async (dispatch) => {
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

        const { data } = await axios.get(`/api/products/?${qs.stringify(params, { arrayFormat: 'repeat' })}`);

        dispatch(productListSuccess(data));
    } catch (error) {
        dispatch(productListFail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        ));
    }
};

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
