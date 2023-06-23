import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { updateCard } from '../../../actions/cardActions'
import { cardUpdateReset } from '../../../reducers/cardReducers'
import Loader from '../../Loader'
import Message from '../../Message'
import UpdateProfileForm from '../../UpdateProfileForm'

function UpdateCCModal({card, pvCardNumber, show, onHide, deleteModalShow, dispatch}) {

    const [cardNumber, setCardNumber] = useState(pvCardNumber);
    const [cardOwner, setCardOwner] = useState(card.cardOwner);
    const [expDate, setExpDate] = useState(card.expDate);
    const [ccv, setCcv] = useState(card.ccv);
    const [message, setMessage] = useState('');

    const {
        cardReducers: { cardUpdateError, cardUpdateSuccess, createUpdateLoading }
    } = useSelector((state) => state);

    useEffect(() => {
        if(cardUpdateSuccess){
            dispatch(cardUpdateReset())
            onHide()
        }
    },[dispatch, cardUpdateSuccess, onHide]);

    useEffect(() => {
        if(cardUpdateError){
            setMessage('')
        }
    }, [cardUpdateError])

    useEffect(() => {
        if(message){
            dispatch(cardUpdateReset())
        }
    },[message, dispatch])

    const submitHandler = (e) =>{
        e.preventDefault();

        let clearCardNumber = cardNumber.replaceAll(' ', '');

        const updatedCardInfo = {
            "_id": card._id,
            "cardOwner": cardOwner,
            "expDate": expDate,
            "ccv": ccv,
        };

        if(cardNumber !== pvCardNumber && clearCardNumber !== card.cardNumber){
            updatedCardInfo.cardNumber = clearCardNumber
        };

        dispatch(updateCard(updatedCardInfo))
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton className='border-0' />            
            <Col className='fw-bold fs-4 text-center'>Update CC</Col>
            <Modal.Body>
                <UpdateProfileForm>
                    {cardUpdateError ? (<Message variant='danger'>{cardUpdateError}</Message>)
                    : message ? (<Message variant='danger'>{message}</Message>)
                    : null }
                    {createUpdateLoading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='CC Number'>
                            <Form.Label className='my-2 fw-semibold'>CC Number</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter CC Number'
                                maxLength={19}
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
                                    Update CC            
                                </Button>
                            </Col>  
                            <Col className='d-flex justify-content-center'>
                                <Button variant='danger' className='mb-2 fw-semibold' style={{width:'130px'}} onClick={deleteModalShow}>
                                    <i className="fa-regular fa-triangle-exclamation" /> Delete CC            
                                </Button>
                            </Col>                  
                        </Row>
                    </Form>
                </UpdateProfileForm>
            </Modal.Body>          
        </Modal>
    )
};

export default UpdateCCModal
