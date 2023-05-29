import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
    name: 'cardReducers',
    initialState: {
        error: null,
        loading: false,
        success: false,
        card: {},
        cards: []
    },
    reducers: {

        // Cards
        cardListRequest: (state) => { state.loading = true },
        cardListSuccess: (state, action) => { state.loading = false; state.cards = action.payload; state.success = true },
        cardListFail: (state, action) => { state.loading = false; state.error = action.payload},

        // Update Card
        cardUpdateRequest: (state) => { state.cardUpdateLoading = true },
        cardUpdateSuccess: (state, action) => { state.cardUpdateLoading = false; state.cardUpdateSuccess = true; state.card = action.payload},
        cardUpdateFail: (state, action) => { state.cardUpdateLoading = false; state.cardUpdateError = action.payload},

        // Delete Card
        cardDeleteRequest: (state) => { state.cardDeleteLoading = true },
        cardDeleteSuccess: (state, action) => { state.cardDeleteLoading = false; state.cardDeleteSuccess = true; state.cards = state.cards.filter(card => card._id !== action.payload) },
        cardDeleteFail: (state, action) => { state.cardDeleteLoading = false; state.cardDeleteError = action.payload},

        // Create Card
        cardCreateRequest: (state) => { state.cardCreateLoading = true },
        cardCreateSuccess: (state, action) => { state.cardCreateLoading = false; state.cardCreateSuccess = true; state.cards = [...state.cards, action.payload] },
        cardCreateFail: (state, action) => { state.cardCreateLoading = false; state.cardCreateError = action.payload},

        // Reset Actions
        cardListReset: (state) => { state.loading = false; state.success = false; state.error = null },
        cardUpdateReset: (state) => { state.cardUpdateLoading = false; state.cardUpdateSuccess = false; state.cardUpdateError = null },
        cardDeleteReset: (state) => { state.cardDeleteLoading = false; state.cardDeleteSuccess = false; state.cardDeleteError = null },
        cardCreateReset: (state) => { state.cardCreateLoading = false; state.cardCreateSuccess = false; state.cardCreateError = null },

        // Reset Slice
        cardSliceReset: (state) => {
            state.loading = false; state.success = false; state.error = null; state.card = null; state.cards = null;
            state.cardUpdateLoading = false; state.cardUpdateSuccess = false; state.cardUpdateError = null;
            state.cardDeleteLoading = false; state.cardDeleteSuccess = false; state.cardDeleteError = null;
            state.cardCreateLoading = false; state.cardCreateSuccess = false; state.cardCreateError = null
        },
    }
});

export const {
    cardListRequest,
    cardListSuccess,
    cardListFail,
    cardListReset,

    cardUpdateRequest,
    cardUpdateSuccess,
    cardUpdateFail,
    cardUpdateReset,

    cardDeleteRequest,
    cardDeleteSuccess,
    cardDeleteFail,
    cardDeleteReset,

    cardCreateRequest,
    cardCreateSuccess,
    cardCreateFail,
    cardCreateReset,

    cardSliceReset,
} = cardSlice.actions;
