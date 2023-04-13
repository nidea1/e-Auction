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
} from '../reducers/addressReducer'

export const listAddresses = () => async (dispatch, getState) => {
    try{
        dispatch(addressListRequest())

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization : `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.get('/api/addresses/',
        config
        )

        dispatch(addressListSuccess(data))
    }catch(error){
        dispatch(addressListFail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        ))
    }
}

export const updateAddress = (address) => async (dispatch, getState) => {
    try{
        dispatch(addressUpdateRequest())

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization : `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.put(
            `/api/addresses/${address._id}/`,
            address,
            config
        )

        dispatch(addressUpdateSuccess(data))

    }catch(error){
        dispatch(addressUpdateFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}

export const createAddress = (address) => async (dispatch, getState) => {
    try{
        dispatch(addressCreateRequest())

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization : `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.post(
            `/api/addresses/`,
            address,
            config
        )

        dispatch(addressCreateSuccess(data))

    }catch(error){
        dispatch(addressCreateFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}

export const deleteAddress = (id) => async (dispatch, getState) => {
    try{
        dispatch(addressDeleteRequest())

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization : `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.delete(
            `/api/addresses/${id}/`,
            config
        )

        dispatch(addressDeleteSuccess(data))

    }catch(error){
        dispatch(addressDeleteFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}
