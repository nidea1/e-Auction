import axios from "axios";
import {

    cardDeleteFail,
    cardDeleteRequest,
    cardDeleteSuccess,

    cardListFail,
    cardListRequest,
    cardListSuccess,

    cardUpdateFail,
    cardUpdateRequest,
    cardUpdateSuccess,

    cardCreateRequest,
    cardCreateSuccess,
    cardCreateFail,

} from "../reducers/cardReducers";

const createAPIinstance = () => {

    return axios.create({
        baseURL: '/api/users/cards',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

}

export const listCards = () => async (dispatch) => {
    try{
        dispatch(cardListRequest());

        const api = createAPIinstance();
        const { data } = await api.get('/');

        dispatch(cardListSuccess(data))
    }catch(error){
        dispatch(cardListFail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ))
    }
};

export const createCard = (card) => async (dispatch) => {
    try{
        dispatch(cardCreateRequest());

        const api = createAPIinstance();
        const { data } = await api.post(
            '/',
            card
        );

        dispatch(cardCreateSuccess(data))
    }catch(error){
        dispatch(cardCreateFail(
            error.response && error.response.data.cardNumber.detail
            ? error.response.data.cardNumber.detail
            : error.message
        ))
    }
};

export const updateCard = (card) => async (dispatch) => {
    try{
        dispatch(cardUpdateRequest());

        const api = createAPIinstance();
        const { data } = await api.put(
            `/${card._id}/`,
            card
        );

        await dispatch(cardUpdateSuccess(data))
        dispatch(listCards())
    }catch(error){
        dispatch(cardUpdateFail(
            error.response && error.response.data.cardNumber.detail
            ? error.response.data.cardNumber.detail
            : error.message
        ))
    }
};

export const deleteCard = (id) => async (dispatch) => {
    try{
        dispatch(cardDeleteRequest());

        const api = createAPIinstance();
        const { data } = await api.delete(`/${id}/`);

        await dispatch(cardDeleteSuccess(data))
        dispatch(listCards())
    }catch(error){
        dispatch(cardDeleteFail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ))
    }
};
