import React from 'react'
import { Col, Image, ListGroup } from 'react-bootstrap';
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { useNavigate } from 'react-router-dom';

function SingleBid({bid, isSingle}) {
    const dateObject = parseISO(bid.createdAt)
    const zonedDate = utcToZonedTime(dateObject, 'Europe/Istanbul')
    const formattedDate = format(zonedDate, 'dd MMMM yyyy, HH:mm:ss')

    const navigate = useNavigate()
    return (
        <ListGroup.Item 
                action  
                onClick={() => navigate(`/product/${bid.productSlug}-p-${bid.product}`)} 
                className='d-flex gap-3 py-3'>
                <Image 
                src={bid.productImage} 
                alt={bid.productName} 
                width={32} 
                height={32} 
                className="rounded-circle flex-shrink-0" 
            />
            <Col className="d-sm-flex gap-2 w-100 justify-content-between">
            <Col>
                <Col className='mb-0 h6'>{bid.productName}</Col>
                <Col className='mb-3 mb-md-0 opacity-75'>You bidded <span className='fw-semibold'>${bid.bid}</span></Col>
            </Col>
            <small className='opacity-50 text-nowrap'>
                {formattedDate} <br />
                { isSingle &&
                <>
                    <span className='fw-semibold float-end'>{bid.isMaxBid ? 'Max bid' : 'Lower than max bid'}</span> <br/>
                    <span className='fw-bold float-end'>
                    {bid.isFinish ?
                        bid.isMaxBid ? 'You won' : 'You lost'
                        : 'Auction continues'}
                    </span>
                </>
                }
            </small>
            </Col>
        </ListGroup.Item>
    );
}

export default SingleBid
