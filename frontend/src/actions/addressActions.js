import axios from "axios"
import {
    addressListRequest,
    addressListSuccess,
    addressListFail,

    addressUpdateRequest,
    addressUpdateSuccess,
    addressUpdateFail,

    addressCreateRequest,
    addressCreateSuccess,
    addressCreateFail,
    
    addressDeleteRequest,
    addressDeleteSuccess,
    addressDeleteFail,
} from '../reducers/addressReducers'

const createAPIinstance = (getState) => {

    const {
        userLogin: { userInfo }
    } = getState();

    return axios.create({
        baseURL: '/api/users/addresses',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.token}`
        }
    })
}

export const listAddresses = () => async (dispatch, getState) => {
    try{
        dispatch(addressListRequest())

        const api = createAPIinstance(getState);
        const { data } = await api.get('/');

        dispatch(addressListSuccess(data))
    }catch(error){
        dispatch(addressListFail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        ))
    }
}


export const createAddress = (address) => async (dispatch, getState) => {
    try{
        dispatch(addressCreateRequest())

        const api = createAPIinstance(getState);
        const { data } = await api.post(
            '/',
            address
        );

        dispatch(addressCreateSuccess(data))
    }catch(error){
        dispatch(addressCreateFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}

export const updateAddress = (address) => async (dispatch, getState) => {
    try{
        dispatch(addressUpdateRequest())

        const api = createAPIinstance(getState);
        const { data } = await api.put(
            `/${address._id}/`,
            address
        );

        await dispatch(addressUpdateSuccess(data))
        dispatch(listAddresses())
    }catch(error){
        dispatch(addressUpdateFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}

export const deleteAddress = (id) => async (dispatch, getState) => {
    try{
        dispatch(addressDeleteRequest())

        const api = createAPIinstance(getState);
        const { data } = await api.delete(`/${id}/`);

        await dispatch(addressDeleteSuccess(data))
        dispatch(listAddresses())
    }catch(error){
        dispatch(addressDeleteFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}
