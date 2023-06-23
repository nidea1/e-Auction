import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

function AddressDetails({address, updateModalShow, deleteModalShow}) {
    return (
        <>
        <Card className='w-100'>
            <Card.Body>
                <Card.Title className='mt-3'>{address.name}</Card.Title>
                <hr />
                {address.description.length > 50
                ? `${address.description.substring(0, 50)}...`
                : address.description }
                <Row>
                    <Col>
                        <Button className="btn-primary edit-address" onClick={updateModalShow}><i className="fa-regular fa-map-location-dot"></i></Button>
                    </Col>
                    <Col>
                        <Button className="btn-danger delete-address" onClick={deleteModalShow}><i className="fa-regular fa-trash-can fa-lg"/></Button>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Card.Text className='lead' style={{fontSize: '14px'}}>
                    {address.district} / {address.province.toUpperCase()}
                </Card.Text>
            </Card.Footer>
        </Card>
        </>
    )
}

export default AddressDetails
