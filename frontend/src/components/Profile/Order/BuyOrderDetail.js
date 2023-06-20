import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import React, { useEffect } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addressDetail } from '../../../actions/addressActions'
import { orderDetail } from '../../../actions/orderActions'
import Loader from '../../Loader'
import Message from '../../Message'

function BuyOrderDetail() {

    const { orderID : id}  = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(orderDetail(id))
    }, [id, dispatch])

    const {
        orderReducers: {order, orderDetailLoading, orderDetailError},
        addressReducers: {address, addressDetailLoading, addressDetailError},
    } = useSelector((state) => state)

    useEffect(() => {
        if(order && order.address){
            dispatch(addressDetail(order.address))
        }
    }, [order, dispatch])

 
    const calculateDate = (date) => {
        const dateObject = parseISO(date)
        const zonedDate = utcToZonedTime(dateObject, 'Europe/Istanbul')
        return format(zonedDate, 'dd MMMM yyyy, HH:mm:ss')
    }

    return (
        <>
        {orderDetailLoading ? <Loader /> :
            orderDetailError ? <Message variant={'danger'}>{orderDetailError}</Message> :
            order && address &&
            <>
                <Row className='border shadow-sm rounded p-3 mx-3 mt-5 mt-md-0'>
                    <Col className='h5 mt-2 align-self-center'>
                        Order Detail
                    </Col>
                    <Col className='d-flex flex-column text-center'>
                        <small className='fw-semibold'>
                            Order Date
                        </small>
                        <small>
                            {calculateDate(order.confirmedAt)}
                        </small>
                    </Col>
                    <Col className='d-flex flex-column text-center'>
                        <small className='fw-semibold'>
                            Order No
                        </small>
                        <small>
                            {order._id}
                        </small>
                    </Col>
                </Row>
                <Row className='border rounded p-3 mx-3 my-3 justify-content-center'>
                    <Row className='rounded mx-4 bg-light p-2 mb-3'>
                        <Col>
                        <span className='fw-semibold'>Seller: </span>&nbsp;{order.seller}
                        </Col>
                    </Row>
                    <Row className='border rounded justify-content-center align-items-center text-md-center text-lg-start flex-column flex-lg-row py-4'>
                        <Col className='col-md-3 d-flex justify-content-center d-lg-block justify-content-lg-start'>
                            <Image src={order.productImage} fluid height={150} width={150}/>
                        </Col>
                        <Col>
                            <Row className='flex-column'>
                                <Col className='fw-bold'>
                                    {order.productName}
                                </Col>
                                <Col>
                                    $ {order.paidPrice}
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col-lg-5 col-xl-3'>
                            <Row className='justify-content-center'>
                                <small className='opacity-50 text-nowrap fw-semibold'>Created at: </small>
                                <small className='opacity-50 text-nowrap'>{calculateDate(order.createdAt)}</small>
                                <small className='opacity-50 text-nowrap fw-semibold'>Confirmed at: </small>
                                <small className='opacity-50 text-nowrap'>{calculateDate(order.confirmedAt)}</small>
                                {order.isDelivered ?
                                <>
                                    <small className='opacity-50 text-nowrap fw-semibold'>Delivered at: </small>
                                    <small className='opacity-50 text-nowrap'>{calculateDate(order.deliveredAt)}</small>
                                </>
                                :
                                <>
                                    <small className='opacity-50 text-nowrap fw-semibold mt-4'>Waiting for deliver.</small>
                                </>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Row>
                <Row className='border rounded p-3 mx-3 justify-content-center'>
                    <Row className='border-bottom pb-3 justify-content-center flex-column flex-lg-row'>
                        <Col className='h5 mt-2 align-self-center text-center text-nowrap text-lg-start'>
                            Address Detail
                        </Col>
                        <Col className='d-flex flex-column text-center'>
                        {order.isDelivered ?
                            <>
                                <small className='fw-semibold'>Delivered at: </small>
                                <small>{calculateDate(order.deliveredAt)}</small>
                            </>
                            :
                            <>
                                <small className='fw-semibold'>Waiting for deliver.</small>
                            </>
                        }
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row className='mt-4 mb-2'>
                        {addressDetailLoading ? <Loader />:
                            addressDetailError ? <Message variant={'danger'}>{addressDetailError}</Message> :
                            <>
                                <Row>
                                    <Col className='col-md-3 fw-semibold text-nowrap'>Address Title: </Col>
                                    <Col className='text-md-end opacity-75'>{address.name.toUpperCase()}</Col>
                                </Row>

                                <Row className='mt-3'>
                                    <Col className='col-md-3 fw-semibold'>Name: </Col>
                                    <Col className='text-md-end opacity-75 text-nowrap'>{address.firstName} {address.lastName.toUpperCase()}</Col>
                                </Row>

                                <Row className='mt-3'>
                                    <Col className='col-md-2 fw-semibold'>Mobile: </Col>
                                    <Col className='text-md-end opacity-75'>{address.mobile.substring(2)}</Col>
                                </Row>

                                <Row className='mt-3'>
                                    <Col className='col-md-2 fw-semibold'>Address: </Col>
                                    <Col className='text-md-end opacity-75'>
                                        <Col>{address.description}</Col>
                                        <Col>{address.postalCode}</Col>
                                        <Col>{address.district}/{address.province.toUpperCase()}</Col>
                                    </Col>
                                </Row>
                            </>
                        }
                    </Row>
                </Row>
            </>
        }
        </>
    )
}

export default BuyOrderDetail
