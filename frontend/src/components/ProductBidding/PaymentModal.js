import React from 'react'
import { Modal } from 'react-bootstrap'

function PaymentModal({show, onHide}) {
    return (
        <Modal show={show}>
            <Modal.Header style={{margin :'0 auto'}} closeButton onHide={onHide}>
                <Modal.Title>Payment Method</Modal.Title>
            </Modal.Header>
        </Modal>
    )
}

export default PaymentModal
