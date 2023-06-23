import React, { useContext } from 'react'
import { Col, Form } from 'react-bootstrap'
import FilterContext from '../../contexts/FilterContext'

function FilterByStatus() {

    const statuses = [
        {
            'name': 'Ongoing',
            'value': 1,
            'id': 's-1'
        },
        {
            'name': 'Finished',
            'value': 2,
            'id': 's-2'
        },
        {
            'name': 'All Products',
            'value': 'all',
            'id': 's-3'
        }
    ]

    const { setSelectedStatus } = useContext(FilterContext);

    return (
        <>
        <Col className="text-center border-top border-bottom py-2 fw-bold">
            Filter by Status
        </Col>
        <Col className='ms-xl-3'  style={{fontSize:'smaller'}}>
            {statuses.map((status) => (
                <Col className='my-2'>
                    {status.id !== 's-3' ?                                        
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
