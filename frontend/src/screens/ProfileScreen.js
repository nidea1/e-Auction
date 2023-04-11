import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, FormControl, FormGroup, FormLabel, Modal, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { deleteUser, detail, update } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import UpdateProfileForm from '../components/UpdateProfileForm';
import { userUpdateProfileReset } from '../reducers/userReducers';


function ProfileScreen() {

  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const updateModalClose = () => setShowUpdateModal(false)
  const updateModalShow = () => setShowUpdateModal(true)

  const deleteModalClose = () => {
    updateModalShow()
    setShowDeleteModal(false)
  }; 
  const deleteModalShow = () => {
    updateModalClose()
    setShowDeleteModal(true)
  }

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')

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
      updateModalClose()
    }
  }

  const deleteSubmit = (e) => {
    e.preventDefault()
    
    if(password !== passwordConfirm){
      setMessage('Password does not match!')
    }else{
      dispatch(deleteUser(user._id))
      navigate('/')
    }
  }

  return (
    <>
        <Row className='justify-content-center my-3 py-3'>
            <Col md={4}>
              <Card className='border-0 shadow'>
                <CardHeader className='text-center fw-bold h4'>User Profile</CardHeader>
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
                
                <Row>
                  <Col md={4} className='text-center'>
                  <i class="fa-sharp fa-solid fa-envelope" />
                  </Col>
                  <Col md={8} className='text-muted'>
                    <Card.Text>{user.email}</Card.Text>
                  </Col>
                </Row>

                <Col className='d-flex justify-content-center'>
                  <hr className='divider'/>
                </Col>

                <Row>
                  <Col md={4} className='text-center'>
                  <i class="fa-solid fa-location-dot" />
                  </Col>
                  <Col md={8}>
                    <Link to={'/profile/addresses'} className='text-muted link'>Address List</Link>
                  </Col>
                </Row>

                <Col className='d-flex justify-content-center'>
                  <hr className='divider'/>
                </Col>

                <Row className='mb-3'>
                  <Col md={4} className='text-center'>
                  <i class="fa-solid fa-hand-sparkles" />
                  </Col>
                  <Col md={8}>
                    <Link to={'./'} className='text-muted link'>My Bids</Link>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Button className="btn-dark edit-profile" onClick={updateModalShow}><i class="fa-regular fa-pen-to-square"></i></Button>
                  </Col>
                  <Modal show={showUpdateModal} onHide={updateModalClose}>  
                    <Modal.Header closeButton className='border-0'></Modal.Header>   
                    <Col className='d-flex justify-content-center'><h4>Edit Profile</h4></Col>
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

                        <Row className='d-flex flex-column justify-content-center'>
                          <Col className='d-flex justify-content-center'>
                            <Button type='submit' variant='primary' className='my-3 w-50'>
                              Update Profile            
                            </Button>
                          </Col>  
                          <Col className='d-flex justify-content-center'>
                            <Button variant='danger' className='mb-2 fw-semibold' onClick={deleteModalShow}>
                              <i class="fa-regular fa-triangle-exclamation" /> Delete Profile            
                            </Button>
                          </Col>                  
                        </Row>
                              
                      </Form>
                    </UpdateProfileForm>
                    </Modal.Body>                   
                  </Modal>  

                  <Modal show={showDeleteModal} onHide={deleteModalClose} size='sm'>  
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
                </Row>
              </Card>
            </Col>
            <Col md={8} className='text-center'>
              <Outlet />
            </Col>
        </Row>
    </>
  )
}

export default ProfileScreen
