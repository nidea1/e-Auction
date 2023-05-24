import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCards } from '../../actions/cardActions'
import CreateCCModal from '../CreditCard/CreateCCModal'
import CreditCard from '../CreditCard/CreditCard'

function PaymentModal({show, onHide}) {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(listCards())
    }, [dispatch])

    const [showCreateModal, setShowCreateModal] = useState(false)

    const createModalShow = () => setShowCreateModal(true)
    const createModalClose = () => setShowCreateModal(false)

    const [selectedCard, setSelectedCard] = useState(null)

    const {
        cardReducers : { cards, loading, error, success }
    } = useSelector((state) => state)

    return (
        <Modal show={show}>
            <Modal.Header className='border-0' closeButton />
            <Col className='fs-4 fw-bold text-center'>Payment Method</Col>
            <Row className='justify-content-center mt-2'>
                <Col className='border-bottom pb-2 col-10'/>
            </Row>
            <Row className='mx-4 my-3'>
                <Col className='fw-semibold text-center text-md-start'>
                    Please choose a payment method.
                </Col>
            </Row>
            <Row className='justify-content-center justify-content-md-between mx-3'>
                {cards.map(card => (
                    <Col md="5" className='col-10 border rounded mb-4 mx-3'>
                        <CreditCard card={card} loading={loading} success={success} />
                        <Row className='justify-content-center'>
                        <Button className='mb-2 btn-dark col-6' onClick={() => setSelectedCard(card._id)}>
                            {selectedCard && card._id === selectedCard ?
                                'Selected'
                            :
                                'Select'    
                            }
                        </Button>
                        </Row>
                    </Col>
                ))}
            </Row>
            <Row className='mx-4 justify-content-center mb-3'>
                <Button className='col-4 col-md-6 btn btn-dark text-center'>
                    Confirm
                </Button>
            </Row>
            <Row className='justify-content-center'>
                <Col className='col-10 border-bottom pb-2'/>
            </Row>
            {cards.length > 0 ?
            <Row className='mx-4 my-3'>
                <Col className='fw-semibold text-center text-md-start'>
                    Do you want use a new method?
                </Col>
            </Row>
            :
            <Row className='mx-4 my-3'>
                <Col className='fw-semibold text-center text-md-start'>
                    You don't have any payment method, do you want add a new method?.
                </Col>
            </Row>
            }
            <Row className='mx-3 justify-content-center justify-content-md-start'>
                <Col md='6' onClick={createModalShow} className='border rounded mb-4 mx-3 col-10' style={{cursor: 'pointer'}}>
                    <Card className='border-0 my-2 d-flex'>
                        <Col className='text-center fw-semibold my-3'>
                            <i class="fa-solid fa-plus" /> Add a new card
                        </Col>
                    </Card>
                </Col>
                <CreateCCModal 
                    show={showCreateModal}
                    onHide={createModalClose}
                    dispatch={dispatch}
                    loading={loading}
                />
            </Row>
        </Modal>
    )
}

export default PaymentModal
