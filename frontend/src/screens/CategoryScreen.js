import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { detailCategories } from '../actions/categoryActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

function CategoryScreen() {
    const { categoryParams } = useParams()
    const  [slug, id]  = categoryParams.split('-c-')

    const dispatch = useDispatch()
    const categoryDetails = useSelector(state => state.categoryDetails)
    const { error, loading, category } = categoryDetails

    useEffect(() =>{
        dispatch(detailCategories(id))
    },[dispatch, id])
    return (
        <>
            {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : 
            <Row>
                <span className='text-center'>{category.name}</span>
                <Col className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
                    <Col className='flex-shrink-0 p-3 border'>
                        <span className='fs-5 fw-semibold d-flex align-items-center pb-3 mb-3 text-decoration-none border-bottom'>Shop by category</span>
                        <ListGroup className='list-unstyled ps-0'>
                            <ListGroupItem>
                                <Button className='btn btn-toggle d-inline-flex align-items-center rounded border-0'> Home </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col className='col-10'>
                        Product List
                    </Col>
                </Col>
            </Row>
            }
        </>
    )
}

export default CategoryScreen
