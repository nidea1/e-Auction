import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Modal, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../Loader'
import Message from '../../Message'
import UpdateProfileForm from '../../UpdateProfileForm'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import { updateAddress } from '../../../actions/addressActions'
import { addressUpdateReset } from '../../../reducers/addressReducers'

function UpdateAddressModal({address, show, onHide, dispatch}) {

    const [addressName, setAddressName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobile, setMobile] = useState('')
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [addressDetail, setAddressDetail] = useState('')

    const {
        addressReducers: { addressUpdateError, addressUpdateLoading, addressUpdateSuccess }
    } = useSelector((state) => state)

    useEffect(() => {
        if(addressUpdateSuccess){
            dispatch(addressUpdateReset())
            onHide()
        }
    },[dispatch, addressUpdateSuccess, onHide])

    const submitHandler = (e) => {
        e.preventDefault()

        const newAddress = {
            '_id': address._id,
            'description': addressDetail,
            'province': province,
            'district': district,
            'postalCode': postalCode,
            'mobile': mobile,
            'addressName': addressName,
            'firstName': firstName,
            'lastName': lastName,
        }
        
        dispatch(updateAddress(newAddress))
    } 

    return (
        <Modal show={show} onHide={onHide}>  
            <Modal.Header closeButton className='border-0'></Modal.Header>   
            <Col className='d-flex justify-content-center'><h4>Edit Address</h4></Col>
            <Modal.Body>  
                <UpdateProfileForm>
                    {addressUpdateError && <Message variant='danger'>{addressUpdateError}</Message>}
                    {addressUpdateLoading && <Loader />}
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

                        <FormGroup controlId='firstName'>
                            <FormLabel className='my-2 fw-semibold'>First Name</FormLabel>
                            <FormControl
                                type='firstName'
                                placeholder='Enter First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='lastName'>
                            <FormLabel className='my-2 fw-semibold'>Last Name</FormLabel>
                            <FormControl
                                type='lastName'
                                placeholder='Enter Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
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

                        <FormGroup controlId='district'>
                            <FormLabel className='my-2 fw-semibold'>District</FormLabel>
                            <FormControl
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
    )
}

export default UpdateAddressModal
