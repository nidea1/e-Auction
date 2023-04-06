import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { detail, update } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import UpdateProfileForm from '../components/UpdateProfileForm';
import { userUpdateProfileReset } from '../reducers/userReducers';


function ProfileScreen() {

  const [show, setShow] = useState(false);  
  
  const modalClose = () => setShow(false);  
  const modalShow = () => setShow(true);  

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user} = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if(!userInfo){
        navigate('/login')
    }else{
      if(!user || !user.name || success){
        dispatch(userUpdateProfileReset())
        dispatch(detail('profile'))
      }else{
        setName(user.name)
        setEmail(user.email)
      }
    }
  },[dispatch, navigate, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    
    if(password !== passwordConfirm){
      setMessage('Password does not match!')
    }else{
      dispatch(update({
        'id': user._id,
        'name': name,
        'email': email,
        'password':password,
      }))
      modalClose()
    }
  }

  return (
    <>
        <Row className='justify-content-center'>
            <Col md={4} className='text-center'>
              <h3>User Profile</h3>
            </Col>
            <Col md={8} className='text-center'>
              <h3>My Bids</h3>
            </Col>
            <Row className='justify-content-center my-3 py-3'>
              
              <Col md={4}>                
                <Card className='border-0 shadow'>
                  <Row className='mt-3'>
                    <Col md={4} className='text-center'>
                    <i class="fa-solid fa-user"></i>
                    </Col>
                    <Col md={8} className='text-muted'>
                      <Card.Text>{user.name}</Card.Text>
                    </Col>
                  </Row>   

                  <Col className='d-flex justify-content-center'>
                    <hr className='divider'/>
                  </Col>
                  
                  <Row className='mb-3'>
                    <Col md={4} className='text-center'>
                    <i class="fa-sharp fa-solid fa-envelope"></i>
                    </Col>
                    <Col md={8} className='text-muted'>
                      <Card.Text>{user.email}</Card.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className="btn-dark edit-profile" onClick={modalShow}><i class="fa-regular fa-pen-to-square"></i></Button>
                    </Col>
                    <Modal show={show} onHide={modalClose}>  
                      <Modal.Header closeButton className='border-0'>  
                        <Modal.Title>Edit Profile</Modal.Title>  
                      </Modal.Header>  
                      
                      <Modal.Body>  
                      <UpdateProfileForm>
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}
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

                          <Col className='d-flex justify-content-center'>
                            <Button type='submit' variant='dark' className='mt-3 mb-2 w-50'>
                              Update Profile            
                            </Button>
                          </Col>                          
                        </Form>
                      </UpdateProfileForm>
                      </Modal.Body>                   
                    </Modal>  
                  </Row>
                </Card>
              </Col>
              <Col md={8}>
              </Col>
            </Row>
        </Row>
    </>
  )
}

export default ProfileScreen