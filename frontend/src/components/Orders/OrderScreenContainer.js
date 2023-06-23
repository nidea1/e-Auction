import React from 'react'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ShoppingSummary from './ShoppingSummary'
import SingleBuyOrder from './SingleBuyOrder'

function OrderScreenContainer() {

    const {
        orderReducers : {orders}
    } = useSelector((state) => state)

    return (
        <>
        {
            orders && orders.length > 0 ?
            <>
                <Col>
                    <ListGroup variant={'flush'} className='rounded'>
                        {orders.map((order) => (
                            <SingleBuyOrder order={order} />
                        ))}
                    </ListGroup>
                </Col>
                <div className='vr mx-3 p-0 d-none d-md-block' style={{width: '0.25px'}} />
                <Col className='col-md-4 align-self-start sticky-top' style={{top :'1rem'}}>
                    <ShoppingSummary orders={orders} />
                </Col>
            </>
            :
                <Row className='mx-3 mx-md-0 border rounded p-3 p-md-4 flex-column flex-md-row align-items-center justify-content-center'>
                    <Col className='bg-light rounded-circle d-flex justify-content-center align-items-center shadow-sm col-1' style={{height: '75px', width: '75px'}}>
                        <i className="fa-solid fa-cart-circle-exclamation fa-lg"></i>
                    </Col>
                    <Col className='my-3 my-md-0 col-10 col-md-6 col-lg-4'>
                        <Col className='ms-md-3 fs-6 fw-bold text-center text-md-start'>
                            You don't have any item in your shopping cart.
                        </Col>
                    </Col>
                    <Link to={'/'} className='d-flex justify-content-center col h-75 justify-content-md-end link-dark text-decoration-none'>
                        <Button variant='dark' className='w-50 fs-6 fw-semibold rounded-3 shadow-sm'>
                            Start Bidding
                        </Button>
                    </Link>
                </Row>
        }
        </>
    )
}

export default OrderScreenContainer
