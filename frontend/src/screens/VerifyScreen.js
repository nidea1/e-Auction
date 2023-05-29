import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { resendEmail, verifyUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { userSendVerifyEmailReset } from '../reducers/userReducers'

function VerifyScreen() {
    const {uidb64, token} = useParams()

    const {
        userReducers : { userVerifyLoading, userVerifySuccess, userVerifyError, userSendVerifyEmailLoading, userSendVerifyEmailSuccess, userSendVerifyEmailError }
    } = useSelector((state) => state)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        dispatch(verifyUser(uidb64,token))
    }, [dispatch, uidb64, token])

    useEffect(() => {
        if (userVerifySuccess) {
            const timer = setTimeout(() => {
                    navigate('/login');
                }, 3000);
            return () => clearTimeout(timer);
        }
    }, [navigate, userVerifySuccess])

    const [email, setEmail] = useState(null)

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(resendEmail(email))
    }

    useEffect(() => {
        if (userSendVerifyEmailLoading) {
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
        
        if (!userSendVerifyEmailLoading) {
            if (userSendVerifyEmailSuccess){
                toast.dismiss()
                let success = async () => {
                    dispatch(userSendVerifyEmailReset())
                    toast.success(`Please go to you email: ${email} inbox and click on received activation link to confirm and complete the registration. Note: Check your spam folder.`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                    })
                }
                success();
            }
  
            if (userSendVerifyEmailError) {
                toast.dismiss()
                toast.error(userSendVerifyEmailError, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                })
            }
        }
    }, [userSendVerifyEmailLoading, userSendVerifyEmailSuccess, dispatch, userSendVerifyEmailError, email])

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
            {userVerifyLoading ? <Loader />
            : userVerifySuccess ?
            <Message variant={'success'}>
                <Col className='text-center'>
                    Account activated successfully. You will redirect login page in 3 seconds. If redirect won't work correctly click <Link className='fw-bold text-decoration-none link-white' to={'/login'}>here!</Link>
                </Col>
            </Message>
            : userVerifyError && 
            <>
                <Message variant={'danger'}>{userVerifyError}</Message>
                <FormContainer>
                    <Col className='h4 text-center mt-4 mb-3 border-bottom pb-4'>Do you want to send activation mail again?</Col>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label className='my-2 fw-semibold'>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                >
                            </Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='dark' className='my-2'>
                            Submit
                        </Button>
                    </Form>

                    <Row className='py-3'>
                        <Col>
                            New at here? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='link fw-semibold'>
                                Register
                            </Link>
                        </Col>
                    </Row>
                </FormContainer>
            </>
            }
        </>
    )
}

export default VerifyScreen
