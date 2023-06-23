import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingSummary from './ShoppingSummary'
import { listAddresses } from '../../actions/addressActions'
import Address from '../Profile/Address/Address'
import CreateAddressModal from '../Profile/Address/CreateAddressModal'
import Message from '../Message'
import Loader from '../Loader'
import FilterContext from '../../contexts/FilterContext'
import { useNavigate } from 'react-router-dom'
import { updateOrderReset } from '../../reducers/orderReducers'


function CompleteOrders() {

    
    const [showCreateModal, setShowCreateModal] = useState(false)

    const createModalShow = () => setShowCreateModal(true)
    const createModalClose = () => setShowCreateModal(false)

    const [selectedAddress, setSelectedAddress] = useState(null)
    const { selectedOrders } = useContext(FilterContext)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(listAddresses())
    }, [dispatch])

    const {
        orderReducers : {orders, updateOrderLoading, updateOrderError, updateOrderSuccess},
        addressReducers : {error, addresses, loading}
    } = useSelector((state) => state)

    const handleClick = (id) => {
        if(selectedAddress === id){
            setSelectedAddress(null)
        }else{
            setSelectedAddress(id)
        }
    }

    useEffect(() => {
        if(updateOrderSuccess){
            dispatch(updateOrderReset())
            navigate('/profile/orders')
        }
    },[navigate,updateOrderSuccess, dispatch])

    useEffect(() => {
        if(selectedOrders.length === 0){
            navigate('/shopping-cart')
        }
    }, [navigate, selectedOrders])

    return (
        <>  
            {updateOrderError && <Message variant={'danger'}>{updateOrderError}</Message>}
            <Row className='mx-3'>
                <Col>
                    <Row className='border rounded p-3 justify-content-center'>
                        <Row>
                            <Col className='h4 border-bottom pb-3 text-center mt-3'>Choose your address</Col>
                        </Row>
                        {error && <Message variant={'danger'}>{error}</Message>}
                        {loading ? <Loader /> :
                                addresses.length > 0 &&
                                    <Row className='pt-4 border-bottom mt-3'>
                                        {addresses.map((address) => (
                                            <Col className='col-lg-6 mb-5 d-flex flex-column justify-content-center text-center p-4 rounded'>
                                                <Address address={address} />
                                                <Card className='justify-content-center border-0'>
                                                    <Button onClick={() =>handleClick(address._id)} className='d-flex justify-content-center shadow-sm' style={{position: 'absolute', width:'75px', top: '-20px', left:'10px'}}>
                                                        {selectedAddress === address._id ?
                                                            <span className='fw-semibold'>Selected</span>
                                                        : 'Select'
                                                        }
                                                    </Button>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                        }
                        <Row className='mx-3 pt-4 mt-1'>
                            <Col className='h5' style={{cursor: 'pointer'}} onClick={createModalShow}>
                                <i className="fa-solid fa-location-plus" /> &nbsp; <span className='h5'>Add an address</span>
                            </Col>

                            <CreateAddressModal 
                                show={showCreateModal}
                                onHide={createModalClose}
                                dispatch={dispatch}
                            />
                        </Row>
                    </Row>
                </Col>
                <div className='vr mx-3 p-0 d-none d-md-block' style={{width: '0.25px'}} />
                {updateOrderLoading ? <Loader /> :
                <Col className='col-md-4 align-self-start sticky-top' style={{top :'1rem'}}>
                    <ShoppingSummary orders={orders} addressID={selectedAddress} />
                </Col>
                }
            </Row>
        </>
    )
}

export default CompleteOrders
