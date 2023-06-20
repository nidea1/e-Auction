import { createSlice } from '@reduxjs/toolkit';


export const addressSlice = createSlice({
    name: 'addressReducers',
    initialState: {
        loading: false,
        success: false,
        error: null,
        address: null,
        addresses: null
    },
    reducers: {

        // Addresses
        addressListRequest: (state) => { state.loading = true },
        addressListSuccess: (state, action) => { state.loading = false; state.success = true; state.addresses = action.payload },
        addressListFail: (state, action) => { state.loading = false; state.error = action.payload },

        // Address
        addressDetailRequest: (state) => { state.addressDetailLoading = true },
        addressDetailSuccess: (state, action) => { state.addressDetailLoading = false; state.addressDetailSuccess = true; state.address = action.payload },
        addressDetailFail: (state, action) => { state.addressDetailLoading = false; state.addressDetailError = action.payload },

        // Update Address
        addressUpdateRequest: (state) => { state.addressUpdateLoading = true },
        addressUpdateSuccess: (state, action) => { state.addressUpdateLoading = false; state.addressUpdateSuccess = true; state.address = action.payload},
        addressUpdateFail: (state, action) => { state.addressUpdateLoading = false; state.addressUpdateError = action.payload},

        // Delete Address
        addressDeleteRequest: (state) => { state.addressDeleteLoading = true },
        addressDeleteSuccess: (state, action) => { state.addressDeleteLoading = false; state.addressDeleteSuccess = true; state.addresses = state.addresses.filter((address) => address._id !== action.payload._id) },
        addressDeleteFail: (state, action) => { state.addressDeleteLoading = false; state.addressDeleteError = action.payload},

        // Create Address
        addressCreateRequest: (state) => { state.addressCreateLoading = true },
        addressCreateSuccess: (state, action) => { state.addressCreateLoading = false; state.addressCreateSuccess = true; state.addresses = [...state.addresses, action.payload] },
        addressCreateFail: (state, action) => { state.addressCreateLoading = false; state.addressCreateError = action.payload},

        // Reset Actions
        addressListReset: (state) => { state.loading = false; state.success = false; state.error = null },
        addressDetailReset: (state) => { state.addressDetailLoading = false; state.addressDetailSuccess = false; state.addressDetailError = null },
        addressUpdateReset: (state) => { state.addressUpdateLoading = false; state.addressUpdateSuccess = false; state.addressUpdateError = null },
        addressDeleteReset: (state) => { state.addressDeleteLoading = false; state.addressDeleteSuccess = false; state.addressDeleteError = null },
        addressCreateReset: (state) => { state.addressCreateLoading = false; state.addressCreateSuccess = false; state.addressCreateError = null },

        // Reset Slice
        addressSliceReset: (state) => {
            state.loading = false; state.success = false; state.error = null; state.address = null; state.addresses = null;
            state.addressDetailLoading = false; state.addressDetailSuccess = false; state.addressDetailError = null;
            state.addressUpdateLoading = false; state.addressUpdateSuccess = false; state.addressUpdateError = null;
            state.addressDeleteLoading = false; state.addressDeleteSuccess = false; state.addressDeleteError = null;
            state.addressCreateLoading = false; state.addressCreateSuccess = false; state.addressCreateError = null
        },
    }
})

export const {
    addressListRequest,
    addressListSuccess,
    addressListFail,
    addressListReset,

    addressDetailRequest,
    addressDetailSuccess,
    addressDetailFail,
    addressDetailReset,

    addressUpdateRequest,
    addressUpdateSuccess,
    addressUpdateFail,
    addressUpdateReset,

    addressDeleteRequest,
    addressDeleteSuccess,
    addressDeleteFail,
    addressDeleteReset,

    addressCreateRequest,
    addressCreateSuccess,
    addressCreateFail,
    addressCreateReset,

    addressSliceReset,
} = addressSlice.actions;

