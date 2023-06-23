import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../actions/userActions';
import { Modal, Button, Form, FormControl, FormGroup, FormLabel, Col, Row } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import UpdateProfileForm from '../UpdateProfileForm'
import { userUpdateProfileReset } from '../../reducers/userReducers';

function UpdateProfileModal({show, onHide, user, deleteModalShow}) {
        
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const {
        userReducers: { userUpdateProfileLoading, userUpdateProfileError, userUpdateProfileSuccess }
    } = useSelector((state) => state)

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setMessage('Password does not match!');
        } else {

            const newProfile = {
                'id': user._id,
                'name': name,
                'password': password,
            }

            const sameEmail = email === user.email

            if(!sameEmail){
                newProfile.email = email
            }

            dispatch(update(newProfile));
        }
    }

    useEffect(() => {
        if(userUpdateProfileSuccess){
            dispatch(userUpdateProfileReset())
            onHide()
        }
    }, [dispatch, onHide, userUpdateProfileSuccess])

    return (
        <Modal show={show} onHide={onHide}>  
            <Modal.Header
                className='border-0'
                closeButton
            />   
            <Col className='text-center fw-bold fs-4'>Edit Profile</Col>
            <Modal.Body>  
                <UpdateProfileForm>
                    {message && <Message variant='danger'>{message}</Message>}
                    {userUpdateProfileError && <Message variant='danger'>{userUpdateProfileError}</Message>}
                    {userUpdateProfileLoading && <Loader />}
                    <Form onSubmit={submitHandler}>
                    <FormGroup controlId='name'>
                        <FormLabel className='my-2 fw-semibold'>Name</FormLabel>
                        <FormControl
                            type='name'
                            placeholder='Enter Full Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            >
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId='email'>
                        <FormLabel className='my-2 fw-semibold'>Email Address</FormLabel>
                        <FormControl
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            >
                        </FormControl>
                    </FormGroup>

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

                    <Row className='d-flex flex-column justify-content-center'>
                        <Col className='d-flex justify-content-center'>
                        <Button type='submit' variant='primary' className='my-3 w-50'>
                            Update Profile            
                        </Button>
                        </Col>  
                        <Col className='d-flex justify-content-center'>
                        <Button variant='danger' className='mb-2 fw-semibold' onClick={deleteModalShow}>
                            <i className="fa-regular fa-triangle-exclamation" /> Delete Profile            
                        </Button>
                        </Col>                  
                    </Row>
                            
                    </Form>
                </UpdateProfileForm>
            </Modal.Body>                   
        </Modal> 
    )
}

export default UpdateProfileModal
