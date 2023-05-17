import React, { useEffect } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listBids } from '../actions/bidActions'
import Bid from '../components/Bid/Bid'

function BidScreen() {

  const dispatch = useDispatch()

  const {
    bidReducers: { bids }
  } = useSelector((state) => state)

  useEffect(() => {
    dispatch(listBids())
  }, [dispatch])

  return (
    <>
    <Row className='mx-3'>
        <Col className='h4 text-center'>
            My Bid List
        </Col>
    </Row>
    <Col className='d-flex justify-content-center mb-2'>
        <hr className='divider'/>
    </Col>   
    <Row className='mx-3'>     
        <ListGroup variant='flush' className='rounded'>
            {[...bids].reverse().map((bid) => (
                <Bid bid={bid} />
            ))}
        </ListGroup>
    </Row>
    </>
  )
}

export default BidScreen
