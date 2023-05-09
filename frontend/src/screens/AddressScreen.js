import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Modal, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { createAddress, listAddresses } from "../actions/addressActions";
import Loader from '../components/Loader';
import Message from '../components/Message';
import Address from '../components/Address';
import UpdateProfileForm from '../components/UpdateProfileForm';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css'

function AddressScreen() {

  const dispatch = useDispatch()

  const addressList = useSelector(state => state.addressList)
  const { error, loading, addresses} = addressList

  const [showCreateModal, setShowCreateModal] = useState(false)

  const createModalClose = () => setShowCreateModal(false)
  const createModalShow = () => setShowCreateModal(true)

  const [addressName, setAddressName] = useState('')
  const [mobile, setMobile] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
 
  useEffect(() =>{
    dispatch(listAddresses())
  },[dispatch])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createAddress({
      'description': addressDetail,
      'province': province,
      'district': district,
      'postalCode': postalCode,
      'mobile': mobile,
      'addressName': addressName,
    }))

    createModalClose()
  }

  return (
    <>
        <Row className='mx-3'>
          <Col md={4} className='h5' style={{cursor: 'pointer'}} onClick={createModalShow}><i class="fa-solid fa-location-plus" /> &nbsp; <span className='h5'>Add an address</span></Col>
          <Modal show={showCreateModal} onHide={createModalClose}>  
            <Modal.Header closeButton className='border-0'></Modal.Header>   
              <Col className='d-flex justify-content-center'><h4>Create Address</h4></Col>
              <Modal.Body>  
                <UpdateProfileForm>
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

                    <FormGroup controlId='province'>
                        <FormLabel className='my-2 fw-semibold'>Province</FormLabel>
                        <FormControl
                            required
                            type='province'
                            placeholder='Enter Province'
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
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
                            required
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
                            Create Address            
                        </Button>
                        </Col>               
                    </Row>
                            
                    </Form>
                </UpdateProfileForm>
              </Modal.Body>                   
            </Modal>
            
        </Row>
        <Col className='d-flex justify-content-center mb-4'>
          <hr className='divider'/>
        </Col>
        { loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>  
        : <Row className='mx-3'>
            {addresses.map(address => (
                <Col sm="12" md="6" lg="3" className='d-flex justify-content-center text-center mb-5'>
                    <Address address={address} />
                </Col>
            ))}
          </Row>
    }
    </>
  )
}

export default AddressScreen
