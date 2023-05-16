import React, { useContext } from 'react'
import { Col, Form } from 'react-bootstrap'
import FilterContext from '../../contexts/FilterContext'

function FilterByStatus() {

    const statuses = [
        {
            'name': 'Ongoing',
            'value': true,
            'id': 's-1'
        },
        {
            'name': 'Finished',
            'value': false,
            'id': 's-2'
        },
        {
            'name': 'All Products',
            'value': '',
            'id': 's-3'
        }
    ]

    const { setSelectedStatus } = useContext(FilterContext);

    return (
        <>
        <Col className="text-center border-top border-bottom py-2 fw-bold">
            Filter by Brand
        </Col>
        <Col className='ms-xl-4'>
            {statuses.map((status) => (
                <Col className='my-2'>
                    {status.id !== 3 ?                                        
                        <Form.Check
                            type='radio'
                            id={status.id.toString()}
                            value={status.value.toString()}
                            label={status.name}
                            name='statusGroup'
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        />                                        
                    :                                       
                        <Form.Check
                            defaultChecked
                            type='radio'
                            id={status.id.toString()}
                            value={status.value.toString()}
                            label={status.name}
                            name='statusGroup'
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        />
                    }
                </Col>
            ))}
        </Col>
        </>
    )
}

export default FilterByStatus
