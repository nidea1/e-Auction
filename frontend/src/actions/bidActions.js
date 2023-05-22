import axios from "axios"
import { bidListFail, bidListRequest, bidListSuccess, bidPlaceFail, bidPlaceRequest, bidPlaceSuccess } from "../reducers/bidReducers"

const createAPIinstance = (getState) => {

    const {
        userReducers: { userInfo }
    } = getState()

    return axios.create({
        baseURL: '/api/users/bids',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.token}`
        }
    })
}

export const listBids = () => async (dispatch, getState) => {
    try{
        dispatch(bidListRequest())

        const api = createAPIinstance(getState)
        const { data } = await api.get('/?ordering=createdAt')

        dispatch(bidListSuccess(data))
    }catch(error){
        dispatch(bidListFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}

export const placeBid = (bid) => async (dispatch, getState) => {
    try{
        dispatch(bidPlaceRequest())

        const api = createAPIinstance(getState)
        const { data } = await api.post('/', bid)

        dispatch(bidPlaceSuccess(data))
    }catch(error){
        dispatch(bidPlaceFail(
            error.response && error.response.data.bid.detail ?
            error.response.data.bid.detail :
            error.message
        ))
    }
}
