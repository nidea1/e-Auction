import axios from "axios"
import {
    addressListRequest,
    addressListSuccess,
    addressListFail,
    addressUpdateRequest,
    addressUpdateSuccess,
    addressUpdateFail,
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

export const update = (address) => async (dispatch, getState) => {
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

        localStorage.setItem('address', JSON.stringify(data))

    }catch(error){
        dispatch(addressUpdateFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}
