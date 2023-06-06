import axios from 'axios'
import { socialSliceReset } from '../reducers/socialReducers'
import { 
    userLoginRequest,
    userLoginSuccess,
    userLoginFail,

    userLogoutRequest,
    userLogoutSuccess,
    userLogoutFail,

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

    userVerifyRequest,
    userVerifySuccess,
    userVerifyFail,

    userSendVerifyEmailRequest,
    userSendVerifyEmailSuccess,
    userSendVerifyEmailFail,
} from '../reducers/userReducers'


const createAPIinstance = () => {

    return axios.create({
        baseURL: '/api/users',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

}


export const login = (email, password) => async (dispatch) => {
    try{
        dispatch(userLoginRequest())
        const clientID = process.env.REACT_APP_MAIN_AUTH_CID
        const clientSecret = process.env.REACT_APP_MAIN_AUTH_CSECRET

        const api = createAPIinstance();
        const { data } = await api.post(
            '/login/',
            {
                'grant_type': 'password',
                'username': email,
                'password': password,
                'client_id': clientID,
                'client_secret': clientSecret,
            }
        )

        dispatch(userLoginSuccess(data))
        await dispatch(detail())
    }catch(error){
        dispatch(userLoginFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}


export const logout = ()  => async (dispatch) => {
    try{
        dispatch(userLogoutRequest())

        const api = createAPIinstance();
        const { data } = await api.post('/logout/')

        dispatch(userLogoutSuccess(data))
        dispatch(socialSliceReset())
        localStorage.removeItem('user')
    }catch(error){
        dispatch(userLogoutFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}


export const detail = () => async (dispatch) => {
    try{
        dispatch(userDetailsRequest())

        const api = createAPIinstance();
        const { data } = await api.get('/profile/')

        dispatch(userDetailsSuccess(data))
        localStorage.setItem('user', JSON.stringify(data))
    }catch(error){
        dispatch(userDetailsFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}


export const register = (name, email, password) => async (dispatch) => {
    try{
        dispatch(userRegisterRequest())

        const api = createAPIinstance();
        const { data } = await api.post(
            '/register/',
            { 'name': name, 'email': email, 'password': password }
        )

        dispatch(userRegisterSuccess(data))
    }catch(error){
        dispatch(userRegisterFail(error.response && error.response.data.email.email
                ? error.response.data.email.email
                : error.message,
                )
        );
    }
}


export const update = (user) => async (dispatch) => {
    try{
        dispatch(userUpdateProfileRequest())

        const api = createAPIinstance();
        const { data } = await api.put(
            '/profile/',
            user
        )

        dispatch(userUpdateProfileSuccess(data))
        localStorage.setItem('user', JSON.stringify(data))
    }catch(error){
        dispatch(userUpdateProfileFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}


export const deleteUser = (password) => async (dispatch) => {
    try{
        dispatch(userDeleteRequest())

        const api = createAPIinstance();
        const { data } = await api.post(
            '/delete/',
            {
                'password': password
            }
        )
        
        dispatch(userDeleteSuccess(data))

        localStorage.removeItem('user')
    }catch(error){
        dispatch(userDeleteFail(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                )
        );
    }
}


export const verifyUser = (uidb64,token) => async (dispatch) => {
    try {
        dispatch(userVerifyRequest())

        const api = createAPIinstance()
        const { data } = await api.get(`/activate/${uidb64}/${token}/`)

        dispatch(userVerifySuccess(data))
    } catch (error) {
        dispatch(userVerifyFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}


export const resendEmail = (email) => async (dispatch) => {
    try {
        dispatch(userSendVerifyEmailRequest())

        const api = createAPIinstance()
        const { data } = await api.post('/activate/resend/', {email})

        dispatch(userSendVerifyEmailSuccess(data))
    } catch (error) {
        dispatch(userSendVerifyEmailFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}


export const socialLogin = (socialPlatform, code) => async (dispatch) => {
    try {
        dispatch(userLoginRequest())
        const clientID = process.env.REACT_APP_MAIN_AUTH_CID
        const clientSecret = process.env.REACT_APP_MAIN_AUTH_CSECRET

        const api = createAPIinstance()
        const { data } = await api.post(
            '/social/',
            {
                'client_id': clientID,
                'client_secret': clientSecret,
                'grant_type': 'convert_token',
                'backend': socialPlatform,
                'token': code

            }
        )

        dispatch(userLoginSuccess(data))
    } catch (error) {
        dispatch(userLoginFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}
