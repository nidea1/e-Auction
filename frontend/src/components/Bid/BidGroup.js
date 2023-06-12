import React from 'react'
import { Col, Image, ListGroup } from 'react-bootstrap'
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import SingleBid from './SingleBid'

function BidGroup({bids, productId, activeProductId, onToggleProduct}) {

    const maxBid = bids[bids.length - 1]

    const slicedBids = bids.slice(0,-1)

    const dateObject = parseISO(maxBid.createdAt)
    const zonedDate = utcToZonedTime(dateObject, 'Europe/Istanbul')
    const formattedDate = format(zonedDate, 'dd MMMM yyyy, HH:mm:ss')
    return (
        <>
            <ListGroup.Item 
                action 
                onClick={() => onToggleProduct(productId)} 
                className='d-flex gap-3 py-3'
            >
            <Image 
                src={maxBid.productImage} 
                alt={maxBid.productName} 
                width={32} 
                height={32} 
                className="rounded-circle flex-shrink-0" 
            />
            <Col className="d-flex gap-2 w-100 justify-content-between">
                <Col>
                <Col className='mb-0 h6'>{maxBid.productName}</Col>
                <Col className='mb-0 opacity-75'>You bidded <span className='fw-semibold'>${maxBid.bid}</span></Col>
                </Col>
                <small className='opacity-50 text-nowrap'>
                {formattedDate} <br />
                <span className='fw-semibold float-end'>{maxBid.isMaxBid ? 'Max bid' : 'Lower than max bid'}</span> <br/>
                <span className='fw-bold float-end'>
                    {maxBid.isFinish ?
                        maxBid.isMaxBid ? 'You won' : 'You lost'
                    : 'Auction continues'}
                </span>
                </small>
            </Col>
            </ListGroup.Item>
            {activeProductId === productId && (
                [...slicedBids].reverse().map((bid) => (
                <SingleBid bid={bid} />
                ))
            )}
        </>
    )
}
  

export default BidGroup
