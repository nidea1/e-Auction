import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { createCard } from '../../../actions/cardActions'
import { cardCreateReset } from '../../../reducers/cardReducers'
import Loader from '../../Loader'
import Message from '../../Message'
import UpdateProfileForm from '../../UpdateProfileForm'

function CreateCCModal({show, onHide, dispatch}) {
    
    const [cardNumber, setCardNumber] = useState('');
    const [cardOwner, setCardOwner] = useState('');
    const [expDate, setExpDate] = useState('');
    const [ccv, setCcv] = useState('');

    const {
        cardReducers: { cardCreateSuccess, cardCreateError, cardCreateLoading }
    } = useSelector((state) => state);

    useEffect(() => {
        if(cardCreateSuccess){
            dispatch(cardCreateReset())
            onHide()
        }
    }, [cardCreateSuccess, dispatch, onHide]);

    const submitHandler = (e) => {
        e.preventDefault()

        const clearCardNumber = cardNumber.replaceAll(' ', '')

        dispatch(createCard({
            'cardOwner': cardOwner,
            'cardNumber': clearCardNumber,
            'expDate': expDate,
            'ccv': ccv
        }))
    };

    return (
        <>
        <Modal show={show} onHide={onHide}>
            <Modal.Header className='border-0' closeButton />
            <Col className='fs-4 fw-bold text-center'>Add a CC</Col>
            <Modal.Body>
                <UpdateProfileForm> 
                    {cardCreateError && <Message variant='danger'>{cardCreateError}</Message>}
                    {cardCreateLoading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='CC Number'>
                            <Form.Label className='my-2 fw-semibold'>CC Number</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter CC Number'
                                maxLength={19}
                                minLength={19}
                                value={cardNumber}
                                onChange={
                                    (e) => {
                                        let val = e.target.value.replaceAll(' ', '')
                                        if (/^[0-9\b]/.test(val) || val === '') {
                                            const matches = val.match(/.{1,4}/g)
                                            val = matches ? matches.join(' ') : ''
                                            setCardNumber(val)
                                        }
                                }}
                                inputMode='numeric'
                            />
                        </Form.Group>

                        <Form.Group controlId='CC Owner'>
                            <Form.Label className='my-2 fw-semibold'>CC Owner</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter CC Owner'
                                value={cardOwner}
                                onChange={(e) => setCardOwner(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className='my-2 fw-semibold'>CC Exp. Date</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Enter CC Exp. Date'
                            minLength={5}
                            maxLength={5}
                            value={expDate}
                            onChange={(e) => {
                                let val = e.target.value.replace('/', '')
                                if (/^[0-9]/.test(val) || val === '') {
                                    if(val.length === 2){
                                        const month = parseInt(val.substring(0,2), 10)
                                        if(month > 12){
                                            val = '12'
                                        }
                                    }
                                    const matches = val.match(/.{1,2}/g)
                                    val = matches ? matches.join('/') : ''
                                    setExpDate(val)
                                }
                            }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className='my-2 fw-semibold'>CCV</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Enter CCV'
                            minLength={3}
                            maxLength={3}
                            value={ccv}
                            onChange={(e) => {
                                let val = e.target.value
                                if (/^[0-9]/.test(val) || val === '') {
                                    setCcv(val)
                                }
                            }}
                            />
                        </Form.Group>

                        <Row className='d-flex flex-column justify-content-center'>
                            <Col className='d-flex justify-content-center'>
                                <Button type='submit' variant='primary' className='my-3 w-50'>
                                    Save a credit card
                                </Button>
                            </Col>               
                        </Row>
                    </Form>
                </UpdateProfileForm>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default CreateCCModal
