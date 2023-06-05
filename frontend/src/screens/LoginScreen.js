import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import Login from '../components/Login/Login';



function LoginScreen() {

    const location = useLocation()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const {
        userReducers: { loading, error }
    } = useSelector((state) => state)


  return (
    <>
        {loading ? <Loader />:
        <FormContainer>
            <Col className='h1'>Sign In</Col>

            {error && <Message variant='danger'>{error}</Message>}
                
                <Login />

                <Row className='py-3'>
                    <Col>
                        <span className='text-muted'>Don't have an account?</span> &nbsp;
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='link text-decoration-none fw-semibold'>
                            Sign up
                        </Link>
                    </Col>
                </Row>

                <Row className="kpx_loginOr mb-4">
                    <Col>
                        <hr class="kpx_hrOr"/>
                        <span class="kpx_spanOr">or</span>
                    </Col>
                </Row>
                
                <Outlet />
            </FormContainer>
            
        }
    </>
  )
}

export default LoginScreen
