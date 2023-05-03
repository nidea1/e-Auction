import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col, Modal, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import UpdateProfileForm from './UpdateProfileForm'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import { deleteAddress, listAddresses, updateAddress } from '../actions/addressActions'
import { addressUpdateReset } from '../reducers/addressReducers'


function Address({ address }) {

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const updateModalClose = () => setShowUpdateModal(false)
    const updateModalShow = () => setShowUpdateModal(true)

    const deleteModalShow = () => setShowDeleteModal(true)
    const deleteModalClose = () => setShowDeleteModal(false)

    const [addressName, setAddressName] = useState('')
    const [mobile, setMobile] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [addressDetail, setAddressDetail] = useState('')

    const dispatch = useDispatch()

    const addressUpdate = useSelector(state => state.addressUpdate)
    const { error, loading, success } = addressUpdate



    useEffect(() => {
        if(success){
            dispatch(addressUpdateReset())
        }
    }, [success, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        
        dispatch(updateAddress({
        '_id': address._id,
        'description': addressDetail,
        'province': province,
        'city': city,
        'postalCode': postalCode,
        'mobile': mobile,
        'addressName': addressName,
        }))

        updateModalClose()
        
    } 

    const deleteSubmit = (e) => {
        e.preventDefault()

        dispatch(deleteAddress(address._id))
        dispatch(listAddresses())
        }

  return (
    <>
        <Card className='w-100'>
            <Card.Body>
                <Card.Title className='mt-3'>{address.name}</Card.Title>
                <hr />
                {address.description.length > 50
                ? `${address.description.substring(0, 50)}...`
                : address.description }
                <Row>
                    <Col>
                        <Button className="btn-primary edit-address" onClick={updateModalShow}><i class="fa-regular fa-map-location-dot"></i></Button>
                    </Col>
                    <Col>
                        <Button className="btn-danger delete-address" onClick={deleteModalShow}><i class="fa-regular fa-trash-can fa-lg"/></Button>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Card.Text className='lead' style={{fontSize: '14px'}}>
                    {address.city} / {address.province.toUpperCase()}
                </Card.Text>
            </Card.Footer>
        </Card>

        <Modal show={showUpdateModal} onHide={updateModalClose}>  
            <Modal.Header closeButton className='border-0'></Modal.Header>   
            <Col className='d-flex justify-content-center'><h4>Edit Address</h4></Col>
            <Modal.Body>  
                <UpdateProfileForm>
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                    <FormGroup controlId='addressName'>
                        <FormLabel className='my-2 fw-semibold'>Address Name</FormLabel>
                        <FormControl
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
                            value={mobile}
                            onChange={setMobile}
                            country='tr'
                            countryCodeEditable={false}
                            disableDropdown
                            inputClass='w-100'
                            inputStyle={{height: '3rem'}}
                        />
                    </FormGroup>

                    <FormGroup controlId='province'>
                        <FormLabel className='my-2 fw-semibold'>Province</FormLabel>
                        <FormControl
                            type='province'
                            placeholder='Enter Province'
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            >
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId='city'>
                        <FormLabel className='my-2 fw-semibold'>City</FormLabel>
                        <FormControl
                            type='city'
                            placeholder='Enter City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            >
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId='postalCode'>
                        <FormLabel className='my-2 fw-semibold'>Postal Code</FormLabel>
                        <FormControl
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

        <Modal show={showDeleteModal} onHide={deleteModalClose} size='sm'>  
            <Modal.Header closeButton className='border-0' />   
            <Col className='d-flex justify-content-center'><h5>Delete Address</h5></Col>
            <Modal.Body>  
            <UpdateProfileForm>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={deleteSubmit}>
                    
                <Col className='d-flex justify-content-center'>
                    <Button type='submit' variant='danger' className='mb-2 fw-semibold'>
                    <i class="fa-regular fa-triangle-exclamation" /> Are you sure?            
                    </Button>
                </Col>        

                </Form>
            </UpdateProfileForm>
            </Modal.Body>                   
        </Modal>  
    </>
  )
}

export default Address
