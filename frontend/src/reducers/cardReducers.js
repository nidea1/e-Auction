import { createSlice } from "@reduxjs/toolkit";

export const cardListSlice = createSlice({
    name: 'cardList',
    initialState: {
        cards: []
    },
    reducers: {
        cardListRequest: (state) => {
            state.loading = true
            state.cards = []
        },
        cardListSuccess: (state, action) => {
            state.loading = false
            state.cards = action.payload
        },
        cardListFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(cardUpdateSlice.actions.cardUpdateSuccess, (state, action) => {
            const index = state.cards.findIndex((card) => card._id === action.payload._id)
            if (index !== -1) {
                state.cards[index] = action.payload
            }
        })
    }
})

export const { cardListRequest, cardListSuccess, cardListFail } = cardListSlice.actions

export const cardUpdateSlice = createSlice({
    name: 'cardUpdate',
    initialState: {
        card: null
    },
    reducers: {
        cardUpdateRequest: (state) => {
            state.loading = true
        },
        cardUpdateSuccess: (state, action) => {
            state.loading = false
            state.success = true
            state.card = action.payload
        },
        cardUpdateFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        cardUpdateReset: (state) => {
            state.success = false
            state.error = null
        }
    }
})

export const { cardUpdateRequest, cardUpdateSuccess, cardUpdateFail, cardUpdateReset } = cardUpdateSlice.actions

export const cardDeleteSlice = createSlice({
    name: 'cardDelete',
    initialState: {
        card: null
    },
    reducers: {
        cardDeleteRequest: (state) => {
            state.loading = true
        },
        cardDeleteSuccess: (state, action) => {
            state.loading = false
            state.card = action.payload
        },
        cardDeleteFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { cardDeleteRequest, cardDeleteSuccess, cardDeleteFail } = cardDeleteSlice.actions
