import axios from "axios";
import { socialLoginFail, socialLoginRequest, socialLoginSuccess } from "../reducers/socialReducers";

export const discord = (code) => async (dispatch) => {
    try {
        dispatch(socialLoginRequest())
        const clientID = process.env.REACT_APP_SOCIAL_AUTH_DISCORD_KEY
        const clientSecret = process.env.REACT_APP_SOCIAL_AUTH_DISCORD_SECRET

        const { data } = await axios.post(
            'https://discord.com/api/oauth2/token',
            {
                'client_id': clientID,
                'client_secret': clientSecret,
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': `${process.env.REACT_APP_BASE_URL}/login/discord`,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        )
        dispatch(socialLoginSuccess(data))
    } catch (error) {
        dispatch(socialLoginFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}


export const github = (code) => async (dispatch) => {
    try {
        dispatch(socialLoginRequest())

        const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/api/users/github/`,
            {
                'code': code,
            }
        )
        dispatch(socialLoginSuccess(data))
    } catch (error) {
        dispatch(socialLoginFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}


export const google = (code) => async (dispatch) => {
    try {
        dispatch(socialLoginRequest())
        const clientID = process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_OAUTH2_KEY
        const clientSecret = process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET

        const { data } = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                'code': code,
                'redirect_uri': `${process.env.REACT_APP_BASE_URL}/login/google-oauth2`,
                'client_id': clientID,
                'client_secret': clientSecret,
                'grant_type': 'authorization_code',
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        )
        dispatch(socialLoginSuccess(data))
    } catch (error) {
        dispatch(socialLoginFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}
