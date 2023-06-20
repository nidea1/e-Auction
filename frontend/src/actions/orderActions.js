import axios from "axios"
import { buyOrderListFail, buyOrderListRequest, buyOrderListSuccess, confirmedOrderListFail, confirmedOrderListRequest, confirmedOrderListSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess } from "../reducers/orderReducers"



const createAPIinstance = () => {

    return axios.create({
        baseURL: `${process.env.REACT_APP_BASE_API_URL}/api/users/orders`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
}


export const buyList = () => async (dispatch) => {

    try {
        dispatch(buyOrderListRequest())

        const api = createAPIinstance()
        const { data } = await api.get('/buying/')

        dispatch(buyOrderListSuccess(data))
    } catch (error) {
        dispatch(buyOrderListFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }

}


export const updateOrder = (orderID, updatedData) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest())

        const api = createAPIinstance()

        const { data } = await api.put(`/order/${orderID}`, updatedData)

        dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(
            error.message && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }
}


export const confirmedList = () => async (dispatch) => {

    try {
        dispatch(confirmedOrderListRequest())

        const api = createAPIinstance()
        const { data } = await api.get('/confirmed/')

        dispatch(confirmedOrderListSuccess(data))
    } catch (error) {
        dispatch(confirmedOrderListFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }

}


export const orderDetail = (id) => async (dispatch) => {

    try {
        dispatch(orderDetailRequest())

        const api = createAPIinstance()
        const { data } = await api.get(`/${id}`)

        dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(
            error.response && error.response.data.detail ?
            error.response.data.detail :
            error.message
        ))
    }

}
