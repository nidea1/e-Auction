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

const createAPIinstance = (getState) => {

    const {
        userReducers: { userInfo }
    } = getState();

    return axios.create({
        baseURL: '/api/users/cards',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.token}`
        }
    })
};

export const listCards = () => async (dispatch, getState) => {
    try{
        dispatch(cardListRequest());

        const api = createAPIinstance(getState);
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

export const createCard = (card) => async (dispatch, getState) => {
    try{
        dispatch(cardCreateRequest());

        const api = createAPIinstance(getState);
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

export const updateCard = (card) => async (dispatch, getState) => {
    try{
        dispatch(cardUpdateRequest());

        const api = createAPIinstance(getState);
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

export const deleteCard = (id) => async (dispatch, getState) => {
    try{
        dispatch(cardDeleteRequest());

        const api = createAPIinstance(getState);
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
