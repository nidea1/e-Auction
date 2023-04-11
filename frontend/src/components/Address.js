import React, { useState } from 'react'
import { Card, Button, Row, Col, Modal, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'
import UpdateProfileForm from './UpdateProfileForm'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'


function Address({ address }) {

    const [showUpdateModal, setShowUpdateModal] = useState(false)

    const updateModalClose = () => setShowUpdateModal(false)
    const updateModalShow = () => setShowUpdateModal(true)

    const [addressName, setAddressName] = useState('')
    const [mobile, setMobile] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [addressDetail, setAddressDetail] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addressUpdate = useSelector(state => state.addressUpdate)
    const { error, loading, success } = addressUpdate

    const submitHandler = (e) => {
        e.preventDefault()
        
        dispatch(addressUpdate({
        '_id': address._id,
        'address': addressDetail,
        'city': city,
        'district': district,
        'postalCode': postalCode,
        'mobile': mobile,
        'name': addressName,
        }))

        updateModalClose()
        
    } 

  return (
    <>
        <Card className='p-4 w-75'>
            <Card.Body>
                <Card.Title>{address.name}</Card.Title>
                <hr />
                <Card.Text className='my-3'>
                {address.address}
                </Card.Text>
                <Row>
                    <Col>
                        <Button className="btn-primary edit-address" onClick={updateModalShow}><i class="fa-regular fa-map-location-dot"></i></Button>
                    </Col>
                    <Col>
                        <Button className="btn-danger delete-address"><i class="fa-regular fa-trash-can fa-lg"/></Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Modal show={showUpdateModal} onHide={updateModalClose}>  
            <Modal.Header closeButton className='border-0'></Modal.Header>   
            <Col className='d-flex justify-content-center'><h4>Edit Address</h4></Col>
            <Modal.Body>  
            <UpdateProfileForm>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                <FormGroup controlId='addressName'>
                    <FormLabel className='my-2 fw-semibold'>Address Name</FormLabel>
                    <FormControl
                        required
                        type='addressName'
                        placeholder='Enter Address Name'
                        value={addressName}
                        onChange={(e) => setAddressName(e.target.value)}
                        >
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='mobile'>
                    <FormLabel className='my-2 fw-semibold'>Mobile Phone</FormLabel>
                    <PhoneInput 
                        required
                        value={mobile}
                        onChange={setMobile}
                        country='tr'
                        countryCodeEditable={false}
                        disableDropdown
                        inputClass='w-100'
                        inputStyle={{height: '3rem'}}
                    />
                </FormGroup>

                <FormGroup controlId='city'>
                    <FormLabel className='my-2 fw-semibold'>City</FormLabel>
                    <FormControl
                        required
                        type='city'
                        placeholder='Enter City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        >
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='district'>
                    <FormLabel className='my-2 fw-semibold'>District</FormLabel>
                    <FormControl
                        required
                        type='district'
                        placeholder='Enter District'
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        >
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='postalCode'>
                    <FormLabel className='my-2 fw-semibold'>Postal Code</FormLabel>
                    <FormControl
                        required
                        type='number'
                        placeholder='Enter Postal Code'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        >
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='addressDetail'>
                    <FormLabel className='my-2 fw-semibold'>Address Detail</FormLabel>
                    <FormControl
                        as={'textarea'}
                        required
                        type='addressDetail'
                        placeholder='Enter Address Detail'
                        value={addressDetail}
                        onChange={(e) => setAddressDetail(e.target.value)}
                        >
                    </FormControl>
                </FormGroup>

                <Row className='d-flex flex-column justify-content-center'>
                    <Col className='d-flex justify-content-center'>
                    <Button type='submit' variant='primary' className='my-3 w-50'>
                        Update Address            
                    </Button>
                    </Col>               
                </Row>
                        
                </Form>
            </UpdateProfileForm>
            </Modal.Body>                   
            </Modal>
    </>
  )
}

export default Address
