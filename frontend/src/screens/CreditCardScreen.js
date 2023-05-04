import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCards } from '../actions/cardActions'
import CreditCard from '../components/CreditCard/CreditCard'
import Loader from '../components/Loader'
import Message from '../components/Message'
import CreateCCModal from '../components/CreditCard/CreateCCModal'

function CreditCardScreen() {

    const dispatch = useDispatch()

    const cardReducers = useSelector((state) => state.cardReducers)
    const { error, loading, success, cards } = cardReducers

    const [showCreateModal, setShowCreateModal] = useState(false)

    const createModalShow = () => setShowCreateModal(true)
    const createModalClose = () => setShowCreateModal(false)

    useEffect(() => {
        dispatch(listCards())
    }, [ dispatch ])

    return (
        <>
            { loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            :
                <Row className='mx-3'>
                    <Col sm="12" md="4" lg="3" onClick={createModalShow} className='border rounded mb-4 mx-3' style={{cursor: 'pointer'}}>
                        <Card className='border-0 my-2'>
                            <Col className='text-center fw-semibold' style={{marginTop:'20px'}}>
                                <i class="fa-solid fa-plus"></i> Add a new card
                            </Col>
                        </Card>
                    </Col>
                    <CreateCCModal 
                        show={showCreateModal}
                        onHide={createModalClose}
                        dispatch={dispatch}
                        loading={loading}
                    />
                    {cards.map(card => (
                        <Col sm="12" md="4" lg="3" className='border rounded mb-4 mx-3'>
                            <CreditCard card={card} loading={loading} success={success} />
                        </Col>
                    ))}
                </Row>
            }            
        </>
    )
}

export default CreditCardScreen
