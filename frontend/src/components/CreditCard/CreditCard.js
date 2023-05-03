import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CreditCardDetails from './CreditCardDetails'
import DeleteCCModal from './DeleteCCModal'
import UpdateCCModal from './UpdateCCModal'

function CreditCard({card}) {

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const updateModalShow = () => setShowUpdateModal(true)
    const updateModalClose = () => setShowUpdateModal(false)

    const deleteModalShow = () => {
        updateModalClose()
        setShowDeleteModal(true)
    };
    const deleteModalClose = () => {
        updateModalShow()
        setShowDeleteModal(false)
    };

    const dispatch = useDispatch()

    let cardNumber = card.cardNumber    
    let stars = '*'.repeat(cardNumber.length - 4)
    let maskedCardNumber = stars + cardNumber.slice(-4)

    let customizedCardNumber = maskedCardNumber.replace(/(.{4})/g, '$1 ')

    if(customizedCardNumber.slice(-1) === ' '){
        customizedCardNumber = customizedCardNumber.slice(0, -1)
    }

    return (
        <>
            { card &&
                <CreditCardDetails
                    card={card}
                    pvCardNumber={customizedCardNumber}
                    updateModalShow={updateModalShow}
                />
            }
            { card &&
                <UpdateCCModal
                    card={card}
                    pvCardNumber={customizedCardNumber}
                    show={showUpdateModal}
                    onHide={updateModalClose}
                    deleteModalShow={deleteModalShow}
                    dispatch={dispatch}
                />
            }
            <DeleteCCModal
                show={showDeleteModal}
                onHide={deleteModalClose}
                dispatch={dispatch}
                id={card._id}
            />
        </>
    )
}

export default CreditCard
