import axios from "axios"
import { bidListFail, bidListRequest, bidListSuccess, bidPaidFail, bidPaidRequest, bidPaidSuccess, bidPlaceFail, bidPlaceRequest, bidPlaceSuccess, bidProductFail, bidProductRequest, bidProductSuccess } from "../reducers/bidReducers"

const createAPIinstance = () => {

    return axios.create({
        baseURL: '/api/users/bids',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

}

export const listBids = () => async (dispatch) => {
    try{
        dispatch(bidListRequest())

        const api = createAPIinstance()
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

export const placeBid = (bid) => async (dispatch) => {
    try{
        dispatch(bidPlaceRequest())

        const api = createAPIinstance()
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

export const calculateBidPaid = (bid) => async (dispatch) => {
    try{
        dispatch(bidPaidRequest())

        const api = createAPIinstance()
        const { data } = await api.post('/calculate-payment/', bid)

        dispatch(bidPaidSuccess(data))
    }catch(error){
        dispatch(bidPaidFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}

export const productBids = (productID) => async (dispatch) => {
    try{
        dispatch(bidProductRequest())
        
        const api = createAPIinstance()
        const { data } = await api.get(`/product/${productID}`)
        
        dispatch(bidProductSuccess(data))
    }catch(error){
        dispatch(bidProductFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}
