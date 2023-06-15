import React, { useState } from 'react'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ShoppingSummary from '../components/Orders/ShoppingSummary'
import SingleBuyOrder from '../components/Orders/SingleBuyOrder'
import FilterContext from '../contexts/FilterContext'


function ShoppingCartScreen() {

    const {
        orderReducers : {buyOrders}
    } = useSelector((state) => state)

    const [selectedOrders, setSelectedOrders] = useState([])

    return (
        <>
            <Row className='mx-3'>
                {
                    buyOrders && buyOrders.length >= 1 ?
                    <>
                    <FilterContext.Provider value={{selectedOrders, setSelectedOrders}}>
                        <Col>
                            <ListGroup variant={'flush'} className='rounded'>
                                {buyOrders.map((order) => (
                                    <SingleBuyOrder order={order} />
                                ))}
                            </ListGroup>
                        </Col>
                        <div className='vr mx-3 p-0 d-none d-md-block' style={{width: '0.25px'}} />
                        <Col className='col-md-4 align-self-start sticky-top' style={{top :'1rem'}}>
                            <ShoppingSummary orders={buyOrders} />
                        </Col>
                    </FilterContext.Provider>
                    </>
                    :
                    <Row className='mx-3 border rounded shadow-sm p-4'>
                        <Row className='mx-2'>
                            <Col className='bg-light rounded-circle d-flex justify-content-center align-items-center shadow-sm col-1' style={{height: '75px', width: '75px'}}>
                                <i class="fa-solid fa-cart-circle-exclamation fa-lg"></i>
                            </Col>
                            <Col className='col-6 d-flex align-items-center'>
                                <Col className='ms-3 fs-5 fw-bold'>
                                    You don't have any item in your shopping cart.
                                </Col>
                            </Col>
                            <Link to={'/'} className='d-flex align-items-center justify-content-end float-end col link-dark text-decoration-none'>
                                <Button variant='dark' size='sm' className='w-50 h-75 shadow-sm'>
                                    <Col className='fs-5 fw-semibold'>
                                        Start Bidding
                                    </Col>
                                </Button>
                            </Link>
                        </Row>
                    </Row>
                }
            </Row>
        </>
    )
}

export default ShoppingCartScreen
