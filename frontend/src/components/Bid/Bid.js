import React from 'react'
import { Col, Image, ListGroup } from 'react-bootstrap'
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { useNavigate } from 'react-router-dom'

function Bid({bid}) {

    const navigate = useNavigate()

    const dateObject = parseISO(bid.createdAt)
    const zonedDate = utcToZonedTime(dateObject, 'Europe/Istanbul')
    const formattedDate = format(zonedDate, 'dd MMMM yyyy, HH:mm:ss')

    return (
        <>
            <ListGroup.Item action href={`#bid${bid._id}`} onClick={() => navigate(`/product/${bid.productSlug}-p-${bid.product}`)} className='d-flex gap-3 py-3'>
                <Image src={bid.productImage} alt={bid.productName} width={32} height={32} className="rounded-circle flex-shrink-0" />
                <Col className="d-flex gap-2 w-100 justify-content-between">
                    <Col>
                        <Col className='mb-0 h6'>{bid.productName}</Col>
                        <Col className='mb-0 opacity-75'>You bidded <span className='fw-semibold'>${bid.bid}</span></Col>
                    </Col>
                    <small className='class="opacity-50 text-nowrap"'>{formattedDate}</small>
                </Col>
            </ListGroup.Item>
        </>
    )
}

export default Bid