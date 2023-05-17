import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import ProductByCategory from '../components/Category/ProductByCategory'

function SellingScreen() {
    
    const dispatch = useDispatch()
    
    const {
        userReducers: { user },
        productReducers: { products }
    } = useSelector((state) => state)

    const statuses = [
        {
            'name': 'Ongoing',
            'value': true,
            'id': 1
        },
        {
            'name': 'Finished',
            'value': false,
            'id': 2
        },
        {
            'name': 'All Products',
            'value': '',
            'id': 3
        }
    ]

    const [selectedStatus, setSelectedStatus] = useState('')

    useEffect(() => {
        if (selectedStatus){
            dispatch(listProducts(undefined, undefined, undefined, user._id, selectedStatus))
        } else {
            dispatch(listProducts(undefined, undefined, undefined, user._id))
        }
    }, [dispatch, user, selectedStatus])

    return (
        <>
            <Row className='mx-3'>
                <Col md={4} className='fw-semibold'>
                    You listing {products.length} {products.length === 1 ? 'product:': 'products:'}
                </Col>
                <Col md={8} className='d-flex flex-column justify-content-end'>
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
            {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4}>
                    <ProductByCategory product={product} />
                </Col>
            ))}
            </Row>
        </>
    )
}

export default SellingScreen
