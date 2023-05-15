import React, { useEffect, useState } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'


function RegisterScreen() {
  
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const {
    userReducers: { userRegisterLoading, userRegisterError, userInfo }
  } = useSelector((state) => state)

  useEffect(() => {
    if(userInfo){
        navigate(redirect)
    }
  },[navigate, userInfo, redirect])

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    
    if(password !== passwordConfirm){
      setMessage('Password does not match!')
    }else{
      dispatch(register(name,email,password))
    }
  }

  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>

        {message && <Message variant='danger'>{message}</Message>}
        {userRegisterError && <Message variant='danger'>{userRegisterError}</Message>}
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
