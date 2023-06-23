import React, { useEffect } from 'react'
import { Button, Col, Modal, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../Loader'
import Message from '../../Message'
import UpdateProfileForm from '../../UpdateProfileForm'
import 'react-phone-input-2/lib/bootstrap.css'
import { deleteAddress } from '../../../actions/addressActions'
import { addressDeleteReset } from '../../../reducers/addressReducers'

function DeleteAddressModal({id, show, onHide, dispatch}) {

    const {
        addressReducers: { addressDeleteError, addressDeleteLoading, addressDeleteSuccess }
    } = useSelector((state) => state)

    useEffect(() => {
        if(addressDeleteSuccess){
            dispatch(addressDeleteReset())
        }
    },[dispatch, addressDeleteSuccess])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(deleteAddress(id))
    }
    return (
        <Modal show={show} onHide={onHide} size='sm'>  
            <Modal.Header closeButton className='border-0' />   
            <Col className='d-flex justify-content-center'><h5>Delete Address</h5></Col>
            <Modal.Body>  
            <UpdateProfileForm>
                {addressDeleteError && <Message variant='danger'>{addressDeleteError}</Message>}
                {addressDeleteLoading && <Loader />}
                <Form onSubmit={submitHandler}>
                    
                <Col className='d-flex justify-content-center'>
                    <Button type='submit' variant='danger' className='mb-2 fw-semibold'>
                    <i className="fa-regular fa-triangle-exclamation" /> Are you sure?            
                    </Button>
                </Col>        

                </Form>
            </UpdateProfileForm>
            </Modal.Body>                   
        </Modal>  
    )
}

export default DeleteAddressModal
