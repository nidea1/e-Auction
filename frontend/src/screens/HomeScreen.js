import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from "../actions/productActions";


function HomeScreen() {
  const dispatch = useDispatch()
  
  const {
    productReducers : { error, loading, products }
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
      dispatch(listProducts(undefined,undefined,undefined,undefined,selectedStatus))
    }else{
      dispatch(listProducts())
    }
  },[dispatch,selectedStatus])

  return (
    <>
        <Row className='justify-content-end'>
          <Col md={4}>
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
        { loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>  
        : <Row>
            {products.map(product => (
                <Col sm="12" md="6" lg="4">
                    <Product product={product} />
                </Col>
            ))}
          </Row>
      }
    </>
  )
}

export default HomeScreen
