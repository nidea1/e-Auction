import React, { useCallback, useEffect, useState } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listBids } from '../actions/bidActions'
import Loader from '../components/Loader'
import BidGroup from '../components/Bid/BidGroup'
import SingleBid from '../components/Bid/SingleBid'

function BidScreen() {

  const dispatch = useDispatch()

  const {
    bidReducers: { bids, loading }
  } = useSelector((state) => state)

  const [groupedBids, setGroupedBids] = useState([]);

  useEffect(() => {
      const bidsGroupedByProduct = bids.reduce((grouped, bid) => {
          if (!grouped[bid.product]) grouped[bid.product] = [];
          grouped[bid.product].push(bid);
          return grouped;
      }, {});

      setGroupedBids(bidsGroupedByProduct)

  }, [bids]);

  const [activeProductId, setActiveProductId] = useState(null);

  const toggleProduct = useCallback((productId) => {
      setActiveProductId(currentId => currentId === productId ? null : productId);
  }, []);

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
        {loading ? <Loader /> :
          Object.entries(groupedBids).map(([productId, bids]) => bids.length > 1 
          ? 
          <ListGroup defaultActiveKey={productId} variant={'flush'} className='rounded'>
            <BidGroup
                bids={bids}
                productId={productId}
                activeProductId={activeProductId}
                onToggleProduct={toggleProduct}
            />
          </ListGroup>
          : 
          <ListGroup defaultActiveKey={productId} variant={'flush'} className='rounded'>
            <SingleBid 
                bid={bids[0]}
                isSingle={true}
              />
          </ListGroup>
          )
        }
    </Row>
    </>
  )
}

export default BidScreen
