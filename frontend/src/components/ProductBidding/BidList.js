import React from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

function BidList({bid}) {

    const dateObject = parseISO(bid.createdAt)
    const zonedDate = utcToZonedTime(dateObject, 'Europe/Istanbul')
    const formattedDate = format(zonedDate, 'dd MMMM yyyy, HH:mm:ss')

    return (
        <>
            <ListGroup.Item className='d-flex gap-3 py-3'>
                <Col className="d-flex gap-2 w-100 justify-content-between">
                    <Col>
                        <Col className='mb-0 h6'>{bid.productName}</Col>
                        <Col className='mb-0 opacity-75'><span className='fw-semibold'>{bid.userName.slice(0,1)}{bid.userName.length > 1 ? '***' : ''}{bid.userName.slice(-1)}</span> bidded <span className='fw-semibold'>${bid.bid}</span></Col>
                    </Col>
                    <small className='class="opacity-50 text-nowrap"'>{formattedDate}</small>
                </Col>
            </ListGroup.Item>
        </>
    )
}

export default BidList
