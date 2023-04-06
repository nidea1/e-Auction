import axios from 'axios'
import { 
    userLoginRequest,
    userLoginSuccess,
    userLoginFail,
    
    userLogout,

    userRegisterRequest,
    userRegisterSuccess,
    userRegisterFail,
    userDetailsRequest,
    userDetailsSuccess,
    userDetailsFail,
    userUpdateProfileRequest,
    userUpdateProfileSuccess,
    userUpdateProfileFail,
    userUpdateProfileReset,
    userDetailsReset,
 } from '../reducers/userReducers'

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch(userLoginRequest())

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login/',
            {'username':email,'password':password},
            config
        )

        dispatch(userLoginSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch(userLoginFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}

export const logout = ()  => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch(userLogout())
    dispatch(userDetailsReset())
}

export const register = (name, email, password) => async (dispatch) => {
    try{
        dispatch(userRegisterRequest())

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register/',
            {'name':name,'email':email,'password':password},
            config
        )

        dispatch(userRegisterSuccess(data))
        
        dispatch(userLoginSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch(userRegisterFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}

export const detail = (id) => async (dispatch, getState) => {
    try{
        dispatch(userDetailsRequest())

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization : `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        )

        dispatch(userDetailsSuccess(data))

    }catch(error){
        dispatch(userDetailsFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}

export const update = (user) => async (dispatch, getState) => {
    try{
        dispatch(userUpdateProfileRequest())

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
            `/api/users/profile/update/`,
            user,
            config
        )

        dispatch(userUpdateProfileSuccess(data))

        dispatch(userLoginSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch(userUpdateProfileFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}