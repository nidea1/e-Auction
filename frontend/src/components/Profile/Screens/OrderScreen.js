import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { confirmedList, sellList } from '../../../actions/orderActions'
import Loader from '../../Loader'
import Message from '../../Message'

function OrderScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const seller = location.pathname === '/profile/orders/buying' ? false : true

    const [selectedStatus, setSelectedStatus] = useState(undefined)
    const [shippingStatus, setShippingStatus] = useState(undefined)
    const [keyword, setKeyword] = useState(undefined)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        if(!seller){
            dispatch(confirmedList(selectedStatus, keyword))
        }else{
            dispatch(sellList(selectedStatus, keyword, shippingStatus))
        }
    }, [dispatch, selectedStatus, keyword, seller, shippingStatus])

    const orderReducers = useSelector((state) => state.orderReducers)

    useEffect(() => {    
        if(orderReducers){
            if(!seller){
                setError(orderReducers.confirmedOrderError)
                setLoading(orderReducers.confirmedOrderLoading)
                setOrders(orderReducers.orders)
            }else{
                setError(orderReducers.sellerOrderError)
                setLoading(orderReducers.sellerOrderLoading)
                setOrders(orderReducers.sellerOrders)
            }
        }
    }, [dispatch, selectedStatus, keyword, location, orderReducers, seller])

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
            'name': 'Shipped',
            'value': true,
            'id': 3
        },
        {
            'name': 'Waiting',
            'value': false,
            'id': 2
        },
        {
            'name': 'All Orders',
            'value': '',
            'id': 4
        }
    ]

    return (
        orders &&
        <>  
            <Row className='mx-3 align-items-center'>
                <Col md={2} className='fw-semibold text-center text-xl-start'>
                    {seller ? 'My Selling Orders' : 'My Orders'}
                </Col>
                <Col className='my-3 my-md-0'>
                    <Form role={'search'}>
                        <Form.Control
                        type='search'
                        placeholder={seller ? 'Search a product or buyer' : 'Search a product or seller'}
                        aria-label='Search'
                        onChange={(e) => setKeyword(e.target.value)}
                        />
                    </Form>
                </Col>
                <Col md={4} xl={5} className='d-flex flex-column justify-content-end'>
                    <Row>
                        {statuses.map((status) => (
                            <Col>
                                {status.id !== 4 ?                                        
                                    <Form.Check
                                        type='radio'
                                        id={status.id.toString()}
                                        value={status.value.toString()}
                                        label={status.name}
                                        name='statusGroup'
                                        onChange={(e) =>{
                                            if(status.id === 3){
                                                setSelectedStatus(undefined)
                                                setShippingStatus(e.target.value)
                                            }else{
                                                setSelectedStatus(e.target.value)
                                                setShippingStatus(undefined)
                                            }
                                        }}
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
            {error && <Message variant={'danger'}>{error}</Message>}
            {loading ? <Loader /> :
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
                                        <Col className='mb-0 h6'><small className='opacity-50 text-nowrap'>{seller ? 'Buyer' : 'Seller'}: <span className='opacity-50'>{seller ? order.buyer : order.seller}</span></small></Col>
                                        <Col className='mb-3 mb-md-0 opacity-75'>{seller ? 'You earn' : 'You paid'} <span className='fw-semibold'>${order.paidPrice}</span></Col>
                                        <Col className='mb-3 mb-md-0 opacity-50 fw-semibold mt-auto'>
                                            {seller ? 
                                                order.isDelivered ? 'Your product is delivered to customer.'
                                                : order.inShipping ? 'Your product in shipping.' : 'You must to ship the product.'
                                            :
                                                order.isDelivered ? 'Your order is delivered.'
                                                :
                                                order.inShipping ? 'Waiting for deliver.' : 'Your order is received.'
                                            }
                                        </Col>
                                    </Col>
                                    <Col className='d-flex flex-column text-md-end'>
                                    <Col className='opacity-50'>
                                        <small className='fw-semibold'>Order at: </small>
                                        <small className='text-nowrap'>{calculateDate(order.confirmedAt)}</small>
                                    </Col>
                                    {order.inShipping ?
                                        order.isDelivered ?
                                            <Col className='opacity-50 mt-auto'>
                                                <small className='fw-semibold'>Delivered at: </small>
                                                <small className='text-nowrap'>{calculateDate(order.deliveredAt)}</small>
                                            </Col>
                                        :
                                            <Col className='opacity-50'>
                                                <small className='fw-semibold'>Shipping at: </small>
                                                <small className='text-nowrap'>{calculateDate(order.shippingAt)}</small>
                                            </Col>
                                    : ''
                                    }
                                    </Col>
                                </Col>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Row> :
                <Row className='mx-3 border rounded p-3 flex-column flex-lg-row align-items-center justify-content-center'>
                    <Col className='bg-light rounded-circle d-flex justify-content-center align-items-center shadow-sm col-1' style={{height: '75px', width: '75px'}}>
                        <i className="fa-solid fa-cart-circle-exclamation fa-lg"></i>
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

export default OrderScreen
