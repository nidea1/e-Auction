import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { deleteCard, listCards } from '../../actions/cardActions'

function DeleteCCModal({show, onHide, dispatch, id}) {
    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(deleteCard(id))
        dispatch(listCards())
    }
    return (
        <Modal show={show} onHide={onHide} size={'sm'}>
            <Form onSubmit={submitHandler} className='my-4 mx-2 d-flex justify-content-center'>
                <Button type='submit' variant='danger' className='fw-semibold mx-auto'>
                <i class="fa-regular fa-triangle-exclamation" /> Delete CC            
                </Button>
                <Button onClick={onHide} variant='primary' className='fw-semibold mx-auto'>
                Go Back           
                </Button>
            </Form>
        </Modal>
    )
}

export default DeleteCCModal
