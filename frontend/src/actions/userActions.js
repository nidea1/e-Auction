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

    userDeleteRequest,
    userDeleteSuccess,
    userDeleteFail,
} from '../reducers/userReducers'

const createAPIinstance = (getState, profile) => {

    const {
        userReducers: { userInfo }
    } = getState()

    return axios.create({
        baseURL: '/api/users',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': profile ? `Bearer ${userInfo.token}`: ''
        }
    })

}

export const login = (email, password) => async (dispatch, getState) => {
    try{
        dispatch(userLoginRequest())

        const api = createAPIinstance(getState);
        const { data } = await api.post(
            '/login/',
            { 'username': email, 'password': password }
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
}

export const register = (name, email, password) => async (dispatch, getState) => {
    try{
        dispatch(userRegisterRequest())

        const api = createAPIinstance(getState);
        const { data } = await api.post(
            '/register/',
            { 'name': name, 'email': email, 'password': password }
        )

        dispatch(userRegisterSuccess(data))

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

        const api = createAPIinstance(getState, true);
        const { data } = await api.get(
            `/${id}`,
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

        const api = createAPIinstance(getState, true);
        const { data } = await api.put(
            '/profile/',
            user
        )

        dispatch(userUpdateProfileSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch(userUpdateProfileFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}

export const deleteUser = () => async (dispatch, getState) => {
    try{
        dispatch(userDeleteRequest())

        const api = createAPIinstance(getState, true);
        const { data } = await api.delete(
            '/profile/',
        )

        dispatch(userDeleteSuccess(data))

        localStorage.removeItem('userInfo')
        dispatch(userLogout())
    }catch(error){
        dispatch(userDeleteFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}
