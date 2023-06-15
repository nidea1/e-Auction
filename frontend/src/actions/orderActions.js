import axios from "axios"
import { buyOrderListFail, buyOrderListRequest, buyOrderListSuccess } from "../reducers/orderReducers"



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
