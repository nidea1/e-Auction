import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FilterContext from '../../contexts/FilterContext'

function ShoppingSummary({orders}) {

    const { selectedOrders } = useContext(FilterContext)

    const totalPaidPrice = selectedOrders.reduce((total, order) => total + order.paidPrice, 0)

    return (
        <>
            <Container className='border rounded-3'>
                <Row className='p-3 mx-1 justify-content-center'>
                    <Col className='col-10 h5 mb-3 mt-1 text-center border-bottom pb-3'>Shopping Summary</Col>
                    <Row className='border-bottom mb-3 pb-3 fw-semibold'>
                        <Col className='col-lg-8 mb-3 mb-lg-0'>Products are waiting to confirm:</Col>
                        <Col className='col-md-4 align-self-center text-end fs-4'>{orders.length}</Col>
                    </Row>
                    <Row>
                        <Col className='col-lg-8 mb-3 mb-lg-0'>Total price of selected products:</Col>
                        <Col className='col-md-4 align-self-center text-end fs-4 fw-semibold'>${totalPaidPrice}</Col>
                    </Row>
                </Row>
                <Row className='mb-4 mt-2'>
                    <Link to={'/'} className='d-flex align-items-center justify-content-center col link-dark text-decoration-none'>
                        <Button variant='dark' className='w-100 shadow-sm mx-4'>
                            <Col className='fs-6 fw-semibold'>
                                Confirm the Orders
                            </Col>
                        </Button>
                    </Link>
                </Row>
            </Container>
        </>
    )
}

export default ShoppingSummary
