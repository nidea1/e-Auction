import React, { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { deleteCard } from '../../../actions/cardActions'
import { cardDeleteReset } from '../../../reducers/cardReducers'
import Loader from '../../Loader'
import Message from '../../Message'

function DeleteCCModal({show, onHide, dispatch, id}) {

    const {
        cardReducers : { cardDeleteError, cardDeleteSuccess, cardDeleteLoading }
    } = useSelector((state) => state)

    useEffect(() => {
        if(cardDeleteSuccess){
            dispatch(cardDeleteReset())
        }
    },[dispatch, cardDeleteSuccess])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(deleteCard(id))
    }

    return (
        <Modal show={show} onHide={onHide} size={'sm'}>
            {cardDeleteLoading && <Loader />}
            {cardDeleteError && <Message>{cardDeleteError}</Message>}
            <Form onSubmit={submitHandler} className='my-4 mx-2 d-flex justify-content-center'>
                <Button type='submit' variant='danger' className='fw-semibold mx-auto'>
                <i className="fa-regular fa-triangle-exclamation" /> Delete CC            
                </Button>
                <Button onClick={onHide} variant='primary' className='fw-semibold mx-auto'>
                Go Back           
                </Button>
            </Form>
        </Modal>
    )
}

export default DeleteCCModal
