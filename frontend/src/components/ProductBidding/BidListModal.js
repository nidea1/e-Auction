import React from 'react'
import { Col, ListGroup, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import BidList from './BidList'

function BidListModal({show, onHide}) {

    const {
        bidReducers: { bids }
    } = useSelector((state) => state)

    return (
        <Modal show={show}>
            <Modal.Header className='border-0' closeButton onHide={onHide} />
            <Col className='fs-4 fw-bold text-center'>Users Who Have Bid</Col>
            <Row className='justify-content-center mt-2 mx-0'>
                <Col className='border-bottom pb-2 mx-4'/>
            </Row>
            <Modal.Body style={{ maxHeight: '495px', overflowY: 'auto' }}>
                <ListGroup className='ms-0 p-3'>
                    {[...bids].reverse().map((bid) => (
                        <BidList bid={bid} />
                    ))}
                </ListGroup>
            </Modal.Body>
        </Modal>
    )
}

export default BidListModal
