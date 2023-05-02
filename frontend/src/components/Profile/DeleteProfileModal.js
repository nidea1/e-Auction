import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, FormControl, FormGroup, FormLabel, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import UpdateProfileForm from '../UpdateProfileForm'

function DeleteProfileModal({ show, onHide }) {

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading } = userDetails;

    const deleteSubmit = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setMessage('Password does not match!');
        } else {
            dispatch(deleteUser());
            navigate('/');
        }
    }
    return (
        <Modal show={show} onHide={onHide} size='sm'>  
            <Modal.Header closeButton className='border-0' />   
            <Col className='d-flex justify-content-center'><h5>Delete Profile</h5></Col>
            <Modal.Body>  
                <UpdateProfileForm>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={deleteSubmit}>
                    
                    <FormGroup controlId='password'>
                        <FormLabel className='my-2 fw-semibold'>Password</FormLabel>
                        <FormControl
                            required
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            >
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId='passwordConfirm'>
                        <FormLabel className='my-2 fw-semibold'>Confirm Password</FormLabel>
                        <FormControl
                            required
                            type='password'
                            placeholder='Confirm Password'
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            >
                        </FormControl>
                    </FormGroup>
                        
                    <Col className='mt-3 d-flex justify-content-center'>
                        <Button type='submit' variant='danger' className='mb-2 fw-semibold'>
                        <i class="fa-regular fa-triangle-exclamation" /> Are you sure?            
                        </Button>
                    </Col>        

                    </Form>
                </UpdateProfileForm>
            </Modal.Body>                   
        </Modal>  
    )
}

export default DeleteProfileModal
