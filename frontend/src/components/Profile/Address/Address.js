import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AddressDetails from './AddressDetails'
import DeleteAddressModal from './DeleteAddressModal'
import UpdateAddressModal from './UpdateAddressModal'

function Address({address}) {

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const updateModalClose = () => setShowUpdateModal(false)
    const updateModalShow = () => setShowUpdateModal(true)

    const deleteModalShow = () => setShowDeleteModal(true)
    const deleteModalClose = () => setShowDeleteModal(false)

    const dispatch = useDispatch()
    return (
        <>
            <AddressDetails
                address={address}
                updateModalShow={updateModalShow}
                deleteModalShow={deleteModalShow}
            />
            <UpdateAddressModal
                address={address}
                show={showUpdateModal}
                onHide={updateModalClose}
                dispatch={dispatch}
            />
            <DeleteAddressModal
                id={address._id}
                show={showDeleteModal}
                onHide={deleteModalClose}
                dispatch={dispatch}
            />
        </>
    )
}

export default Address
