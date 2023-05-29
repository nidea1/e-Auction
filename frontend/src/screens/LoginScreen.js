import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from "../actions/userActions";



function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const {
        userReducers: { loading, error, userInfo }
    } = useSelector((state) => state)

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <>
        {loading ? <Loader />:
        <FormContainer>
            <Col className='h1'>Sign In</Col>

            {error && <Message variant='danger'>{error}</Message>}
                <Form onSubmit={submitHandler}>
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
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            >
                        </FormControl>
                    </FormGroup>

                    <Button type='submit' variant='dark' className='my-2'>
                        Sign In
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
        }
    </>
  )
}

export default LoginScreen
