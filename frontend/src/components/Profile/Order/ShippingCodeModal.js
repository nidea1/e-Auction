import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateOrder } from '../../../actions/orderActions'
import UpdateProfileForm from '../../UpdateProfileForm'

function ShippingCodeModal({show,onHide, ID}) {

    const [shippingCode, setShippingCode] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateOrder(ID, {
            'shippingCode': shippingCode,
            'shippingCompany': selectedCompany,
            'inShipping': true,
        }))
    }

    const companies = [
        {
            'id': 1,
            'name': 'Test Company 1',
            'link': 'https://testcompany1.com'
        },
        {
            'id': 2,
            'name': 'Test Company 2',
            'link': 'https://testcompany2.com'
        },
    ]


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton className='border-0'/>
            <Col className='d-flex justify-content-center h4 border-bottom pb-3 mx-4 mb-3'>Shipping Details</Col>
            <UpdateProfileForm>
                <Row className='mx-3'>
                    <Form onSubmit={submitHandler} className='mb-3'>
                        <Form.Group controlId='shippingCode' className='mb-3'>
                            <Form.Select
                                required
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                            >
                                <option>Select a Company</option>
                                {companies.map((company) => 
                                    <option id={company.id} value={company.name}>{company.name}</option>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='shippingCode'>
                            <Form.Control
                                required
                                type='shippingCode'
                                placeholder='Enter Track Code'
                                value={shippingCode}
                                onChange={(e) => setShippingCode(e.target.value)}
                            />
                        </Form.Group>

                        <Row className='justify-content-center'>
                            <Button type='submit' variant='dark' className='my-3 w-75 fw-semibold'>
                                Submit Shipping Details
                            </Button>
                        </Row>
                    </Form>
                </Row>
            </UpdateProfileForm>
        </Modal>
    )
}

export default ShippingCodeModal
