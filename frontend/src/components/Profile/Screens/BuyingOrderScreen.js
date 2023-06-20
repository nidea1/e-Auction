import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import React, { useEffect, useState } from 'react'
import { Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { confirmedList } from '../../../actions/orderActions'
import Loader from '../../Loader'
import Message from '../../Message'

function BuyingOrderScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(confirmedList())
    }, [dispatch])

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
            'name': 'Waiting',
            'value': true,
            'id': 1
        },
        {
            'name': 'Delivered',
            'value': false,
            'id': 2
        },
        {
            'name': 'All Orders',
            'value': '',
            'id': 3
        }
    ]

    const [selectedStatus, setSelectedStatus] = useState('')

    const [keyword, setKeyword] = useState('')

    return (
        <>  
            <Row className='mt-5 mt-md-0 mx-3 align-items-center'>
                <Col md={2} className='fw-semibold d-flex justify-content-center justify-content-md-start'>
                    My Orders
                </Col>
                <Col className='my-3 my-md-0'>
                    <Form role={'search'}>
                        <Form.Control
                        type='search'
                        placeholder='Search a product, category or brand'
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
            <Row className='mx-3'>
            {confirmedOrderError && <Message variant={'danger'}>{confirmedOrderError}</Message>}
            {confirmedOrderLoading ? <Loader /> :
                <Col>
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
                </Col>
            }
            </Row>
        </>
    )
}

export default BuyingOrderScreen
