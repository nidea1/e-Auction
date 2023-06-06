import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../actions/userActions';
import { Button, Form, FormControl, FormGroup, FormLabel, Col, Row } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function SocialRegisterScreen() {

    const {
        userReducers: { userUpdateProfileLoading, userUpdateProfileError, user, userUpdateProfileSuccess, userDetailsLoading, userDetailsError }
    } = useSelector((state) => state)

    const navigate = useNavigate()

    useEffect(() => {
        if (!user){
            navigate('/login')
        }
    }, [navigate, user])
        
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if(userUpdateProfileLoading){
            toast.info("Response is pending...", {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
            })
        }
        if(!userUpdateProfileLoading){
            toast.dismiss()
            if(userUpdateProfileSuccess){
                navigate('/')
            }
            }else if(userUpdateProfileError){
                toast.error(userUpdateProfileError, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                })
            }
    }, [name, navigate, userUpdateProfileLoading, userUpdateProfileError, userUpdateProfileSuccess])

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

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <FormContainer>
                <h1> Set Your Account </h1>
                {message && <Message variant='danger'>{message}</Message>}
                {userDetailsError && <Message variant='danger'>{userDetailsError}</Message>}
                {userDetailsLoading && <Loader />}
                <Form onSubmit={submitHandler}>
                <FormGroup controlId='name'>
                    <FormLabel className='my-2 fw-semibold'>Name</FormLabel>
                    <FormControl
                        required
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
                        disabled
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
                    <Button type='submit' variant='primary' className='my-3 w-100'>
                        Save
                    </Button>
                    </Col>              
                </Row>
                        
                </Form>
            </FormContainer>
        </>
    )
}

export default SocialRegisterScreen
