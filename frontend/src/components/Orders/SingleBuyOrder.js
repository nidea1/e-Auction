import React, { useContext, useState } from 'react'
import { Col, Form, Image, ListGroup } from 'react-bootstrap';
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import FilterContext from '../../contexts/FilterContext';

function SingleBuyOrder({order}) {
    const dateObject = parseISO(order.createdAt)
    const zonedDate = utcToZonedTime(dateObject, 'Europe/Istanbul')
    const formattedDate = format(zonedDate, 'dd MMMM yyyy, HH:mm:ss')

    const { selectedOrders, setSelectedOrders } = useContext(FilterContext)
    const [isChecked, setChecked] = useState(false)

    const handleCheckboxChange = () => { 
        setChecked(!isChecked)

        if (!isChecked) {
            setSelectedOrders([...selectedOrders, {id: order._id, paidPrice: order.paidPrice}])
        } else {
            setSelectedOrders(selectedOrders.filter(selectedOrder => selectedOrder.id !== order._id))
        }
    }

    return (
        <>
            <ListGroup.Item key={order._id} action className='d-flex gap-3 py-3' onClick={handleCheckboxChange}>
                <Form.Check
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    onChange={handleCheckboxChange}
                />
                <Image 
                    src={order.productImage} 
                    alt={order.productName} 
                    width={32} 
                    height={32} 
                    className="rounded-circle flex-shrink-0" 
                />
                <Col className="d-sm-flex gap-2 w-100 justify-content-between">
                <Col>
                    <Col className='mb-0 h6'>{order.productName}</Col>
                    <Col className='mb-3 mb-md-0 opacity-75'>You paid <span className='fw-semibold'>${order.paidPrice}</span></Col>
                    <Col className='mb-3 mb-md-0 opacity-50 fw-semibold'>You must confirm your order.</Col>
                </Col>
                <small className='opacity-50 text-nowrap'>
                    {formattedDate}
                </small>
                </Col>
            </ListGroup.Item>
        </>
    )
}

export default SingleBuyOrder
