import axios from "axios";
import { cardDeleteFail, cardDeleteRequest, cardDeleteSuccess, cardListFail, cardListRequest, cardListSuccess, cardUpdateFail, cardUpdateRequest, cardUpdateSuccess } from "../reducers/cardReducers";

export const listCards = () => async (dispatch, getState) => {
    try{
        dispatch(cardListRequest())

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/users/cards/',
            config
        )
        
        dispatch(cardListSuccess(data))
    }catch(error){
        dispatch(cardListFail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ))
    }
}

export const updateCard = (card) => async (dispatch, getState) => {
    try{
        dispatch(cardUpdateRequest())

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/cards/${card._id}/`,
            card,
            config
        )

        dispatch(cardUpdateSuccess(data))

    }catch(error){
        dispatch(cardUpdateFail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ))
    }
}

export const deleteCard = (id) => async (dispatch, getState) => {
    try{
        dispatch(cardDeleteRequest())

        const { 
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/users/cards/${id}/`,
            config
        )

        dispatch(cardDeleteSuccess(data))
    }catch(error){
        dispatch(cardDeleteFail(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message    
        ))
    }
}
