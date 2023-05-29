import React, { useEffect, useState } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { userRegisterReset } from '../reducers/userReducers'


function RegisterScreen() {
  
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')

  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const {
    userReducers: { userRegisterLoading, userRegisterError, userRegisterSuccess }
  } = useSelector((state) => state)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    
    if(password !== passwordConfirm){
      setMessage('Password does not match!')
    }else if (password === ''){
      setMessage('You must enter a password!')
    }else{
      dispatch(register(name,email,password))
    }
  }

  useEffect(() => {
      if (userRegisterLoading) {
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
      
      if (!userRegisterLoading) {
          if (userRegisterSuccess){
              toast.dismiss()
              let success = async () => {
                  dispatch(userRegisterReset())
                  toast.success(`Dear ${name}, please go to you email: ${email} inbox and click on received activation link to confirm and complete the registration. Note: Check your spam folder.`, {
                      position: "top-center",
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

          if (userRegisterError) {
              toast.dismiss()
              toast.error(userRegisterError, {
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
  }, [userRegisterLoading, userRegisterSuccess, dispatch, userRegisterError, name, email])

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
        <h1>Sign Up</h1>

        {message && <Message variant='danger'>{message}</Message>}
        {userRegisterLoading && <Loader />}
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
                required
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

          <Button type='submit' variant='dark' className='my-2'>
            Register            
          </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='link fw-semibold'>
                    Sign in
                </Link>
            </Col>
        </Row>

      </FormContainer>
    </>
  )
}

export default RegisterScreen
