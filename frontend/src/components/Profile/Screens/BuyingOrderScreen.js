import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { confirmedList } from '../../../actions/orderActions'
import Loader from '../../Loader'
import Message from '../../Message'

function BuyingOrderScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectedStatus, setSelectedStatus] = useState(undefined)
    const [keyword, setKeyword] = useState(undefined)

    useEffect(() => {
        dispatch(confirmedList(selectedStatus, keyword))
    }, [dispatch, selectedStatus, keyword])

    const {
        orderReducers : {orders, confirmedOrderLoading, confirmedOrderError}
    } = useSelector((state) => state)

    const calculateDate = (date) => {
        const dateObject = parseISO(date)
        const zonedDate = utcToZonedTime(dateObject, 'Europe/Istanbul')
        return format(zonedDate, 'dd MMMM yyyy, HH:mm:ss')
    }

    const detailRouter = (ID) => {
        navigate(`./${ID}`)
    }

    
    const statuses = [
        {
            'name': 'Delivered',
            'value': true,
            'id': 1
        },
        {
            'name': 'Waiting',
            'value': false,
            'id': 2
        },
        {
            'name': 'All Orders',
            'value': '',
            'id': 3
        }
    ]

    return (
        orders &&
        <>  
            <Row className='mt-5 mt-md-0 mx-3 align-items-center'>
                <Col md={2} className='fw-semibold text-center text-xl-start'>
                    My Orders
                </Col>
                <Col className='my-3 my-md-0'>
                    <Form role={'search'}>
                        <Form.Control
                        type='search'
                        placeholder='Search a product or seller'
                        aria-label='Search'
                        onChange={(e) => setKeyword(e.target.value)}
                        />
                    </Form>
                </Col>
                <Col md={4} className='d-flex flex-column justify-content-end'>
                    <Row>
                        {statuses.map((status) => (
                            <Col>
                                {status.id !== 3 ?                                        
                                    <Form.Check
                                        type='radio'
                                        id={status.id.toString()}
                                        value={status.value.toString()}
                                        label={status.name}
                                        name='statusGroup'
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    />                                        
                                :                                       
                                    <Form.Check
                                        defaultChecked
                                        type='radio'
                                        id={status.id.toString()}
                                        value={status.value.toString()}
                                        label={status.name}
                                        name='statusGroup'
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className='text-nowrap'
                                    />
                                }
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <Col className='d-flex justify-content-center'>
                <hr className='divider'/>
            </Col>
            {confirmedOrderError && <Message variant={'danger'}>{confirmedOrderError}</Message>}
            {confirmedOrderLoading ? <Loader /> :
                orders.length > 0 ?
                <Row className='mx-3'>
                    <ListGroup variant={'flush'} className='rounded'>
                        {orders && orders.map((order) => (
                            <ListGroup.Item key={order._id} action onClick={() => detailRouter(order._id)} className='d-flex gap-3 py-3'>
                                <Image
                                    src={order.productImage} 
                                    alt={order.productName} 
                                    width={32} 
                                    height={32} 
                                    className="rounded-circle flex-shrink-0" 
                                />
                                <Col className="d-sm-flex gap-2 w-100">
                                    <Col>
                                        <Col className='mb-0 h6'>{order.productName}</Col>
                                        <Col className='mb-0 h6'><small className='opacity-50 text-nowrap'>Seller: <span className='opacity-50'>{order.seller}</span></small></Col>
                                        <Col className='mb-3 mb-md-0 opacity-75'>You paid <span className='fw-semibold'>${order.paidPrice}</span></Col>
                                        <Col className='mb-3 mb-md-0 opacity-50 fw-semibold mt-auto'>
                                            {order.isDelivered ? 'Your order is delivered.' : 'Your order is received.'}
                                        </Col>
                                    </Col>
                                    <Col className='d-flex flex-column text-md-end'>
                                    {order.isDelivered ?
                                        <>
                                            <Col className='opacity-50'>
                                                <small className='fw-semibold'>Order date: </small>
                                                <small className='text-nowrap'>{calculateDate(order.confirmedAt)}</small>
                                            </Col>
                                            <Col className='opacity-50 mt-auto'>
                                                <small className='fw-semibold'>Delivered date: </small>
                                                <small className='text-nowrap'>{calculateDate(order.deliveredAt)}</small>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col className='opacity-50'>
                                                <small className='fw-semibold'>Order date: </small>
                                                <small className='text-nowrap'>{calculateDate(order.confirmedAt)}</small>
                                            </Col>
                                        </>
                                    }
                                    </Col>
                                </Col>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Row> :
                <Row className='mx-3 border rounded p-3 flex-column flex-lg-row align-items-center justify-content-center'>
                    <Col className='bg-light rounded-circle d-flex justify-content-center align-items-center shadow-sm col-1' style={{height: '75px', width: '75px'}}>
                        <i class="fa-solid fa-cart-circle-exclamation fa-lg"></i>
                    </Col>
                    <Col className='my-3 my-lg-0 col-10 col-lg-7'>
                        <Col className='ms-md-3 fs-6 fw-bold text-center'>
                            You don't have any item in your shopping cart.
                        </Col>
                    </Col>
                    <Link to={'/'} className='d-flex justify-content-center justify-content-lg-end col-lg h-75 link-dark text-decoration-none'>
                        <Button variant='dark' size='sm' className='w-75 fs-6 fw-semibold rounded-3 shadow-sm'>
                            Start Bidding
                        </Button>
                    </Link>
                </Row>
            }
        </>
    )
}

export default BuyingOrderScreen
