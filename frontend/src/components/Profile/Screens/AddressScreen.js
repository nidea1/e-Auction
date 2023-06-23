import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAddresses } from '../../../actions/addressActions'
import Address from '../Address/Address'
import CreateAddressModal from '../Address/CreateAddressModal'
import Loader from '../../Loader'
import Message from '../../Message'

function AddressScreen() {

    const [showCreateModal, setShowCreateModal] = useState(false)

    const createModalShow = () => setShowCreateModal(true)
    const createModalClose = () => setShowCreateModal(false)

    const dispatch = useDispatch()

    const {
        addressReducers: { error, addresses, loading }
    } = useSelector((state) => state)

    useEffect(() => {
        dispatch(listAddresses())
    },[dispatch])

    return (
        addresses &&
        <>
            <Row className='mx-3'>
                <Col md={4} className='h5' style={{cursor: 'pointer'}} onClick={createModalShow}>
                    <i className="fa-solid fa-location-plus" /> &nbsp; <span className='h5'>Add an address</span>
                </Col>

                <CreateAddressModal 
                    show={showCreateModal}
                    onHide={createModalClose}
                    dispatch={dispatch}
                />
            </Row>
            <Col className='d-flex justify-content-center mb-4'>
                <hr className='divider'/>
            </Col>
            {error && <Message variant={'danger'}>{error}</Message>}
            {loading ? <Loader /> :
            <Row className='mx-3'>
                {addresses.map((address) => (
                    <Col sm="12" md="6" lg="4" xl="3" className='d-flex justify-content-center text-center mb-5'>
                        <Address address={address} />
                    </Col>
                ))}
            </Row>
            }
        </>
    )
}

export default AddressScreen
