import React, { useContext, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateOrder } from '../../actions/orderActions'
import FilterContext from '../../contexts/FilterContext'
import Message from '../Message'

function ShoppingSummary({orders, addressID}) {

    const { selectedOrders } = useContext(FilterContext)

    const totalPaidPrice = selectedOrders.reduce((total, order) => total + order.paidPrice, 0)

    const [message, setMessage] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        if(selectedOrders.length > 0){
            setMessage(null)
            navigate('./complete')
        }else{
            setMessage('You must select least 1 product.')
        }
    }

    const submitHandler = (orderArray, address) => {
        
        if(address){
            orderArray.map((order) => dispatch(updateOrder(order.id, {
                'address': address,
                'isConfirmed': true,
            })))
        }else{
            setMessage('You must select an address.')
        }
    }

    const completePath = '/shopping-cart/complete'

    return (
        <>
            <Container className='border rounded-3'>
                <Row className='p-3 mx-1 justify-content-center'>
                    <Col className='col-10 h5 mb-3 mt-1 text-center border-bottom pb-3'>Shopping Summary</Col>
                    {location.pathname !== completePath ?
                    <Row className='border-bottom mb-3 pb-3 fw-semibold'>
                        <Col className='col-lg-8 mb-3 mb-lg-0'>Products are waiting to confirm:</Col>
                        <Col className='col-md-4 align-self-center text-end fs-4'>{orders.length}</Col>
                    </Row>
                    :
                    <Row className='border-bottom mb-3 pb-3 fw-semibold'>
                        <Col className='col-lg-8 mb-3 mb-lg-0'>Completing orders of products:</Col>
                        <Col className='col-md-4 align-self-center text-end fs-4'>{selectedOrders.length}</Col>
                    </Row>
                    }
                    <Row>
                        <Col className='col-lg-8 mb-3 mb-lg-0'>Total price of selected products:</Col>
                        <Col className='col-md-4 align-self-center text-end fs-4 fw-semibold'>${totalPaidPrice}</Col>
                    </Row>
                </Row>
                <Row className='mb-4 mt-2 justify-content-center'>
                    {message && <Col className='col-11 text-center'><Message variant={'danger'}>{message}</Message></Col>}
                    {location.pathname !== completePath ?
                    <Button variant='dark' onClick={handleClick} className='w-100 shadow-sm mx-4 col'>
                        <Col className='fs-6 fw-semibold'>
                            Confirm the Orders
                        </Col>
                    </Button>
                    :
                    <Button onClick={() => submitHandler(selectedOrders, addressID)} variant='dark' className='w-100 shadow-sm mx-4 col'>
                        <Col className='fs-6 fw-semibold'>
                            Complete the Orders
                        </Col>
                    </Button>
                    }
                </Row>
            </Container>
        </>
    )
}

export default ShoppingSummary
