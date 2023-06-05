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
                'redirect_uri': 'http://localhost:3000/login/discord',
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
            '/api/users/github/',
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
