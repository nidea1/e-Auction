import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'

function CreditCardDetails({card, pvCardNumber, updateModalShow}) {

    return (
        <Card className='d-flex flex-column my-2 border-0'>
            <Col>
                <Button className="edit-card" variant='outline-light' active onClick={updateModalShow}><i className="fa-solid fa-money-check-pen" style={{position: 'absolute', right:'20%', top:'10%'}}></i></Button>
            </Col>
            <Col className='ms-1'>
                <Col className='my-2 fw-semibold'>
                    { pvCardNumber }
                </Col>
                <Col>
                    {card.cardOwner}
                </Col>
            </Col>
        </Card>
    )
}

export default CreditCardDetails
