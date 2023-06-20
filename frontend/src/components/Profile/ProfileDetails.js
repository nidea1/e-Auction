import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProfileDetails({ user, updateModalShow }) {
    return (
        <Card className='border-0 shadow fs-6 text-center text-md-start mx-3 mx-md-0'>
            <Card.Header className='text-center fw-bold p-3 h4'>User Profile</Card.Header>
            <Row className='mt-3 mx-3'>
                <Col md={4} className='d-flex justify-content-center align-items-center'>
                    <i className="fa-solid fa-user"></i>
                </Col>
                <Col md={8} className='text-muted'>
                    {user.name}
                </Col>
            </Row>   
            
            <Col className='d-flex justify-content-center'>
                <hr className='divider'/>
            </Col>
            
            <Row className='mx-3'>
                <Col md={4} className='d-flex justify-content-center align-items-center'>
                    <i className="fa-sharp fa-solid fa-envelope" />
                </Col>
                <Col md={8} className='text-muted'>
                    {user.email}
                </Col>
            </Row>

            <Col className='d-flex justify-content-center'>
                <hr className='divider'/>
            </Col>

            <Row className='mx-3'>
                <Col md={4} className='d-flex justify-content-center align-items-center'>
                    <i class="fa-solid fa-credit-card"></i>
                </Col>
                <Col md={8}>
                    <Link to={'/profile/cards'} className='text-muted text-decoration-none'>My Cards</Link>
                </Col>
            </Row>

            <Col className='d-flex justify-content-center'>
                <hr className='divider'/>
            </Col>

            <Row className='mx-3'>
                <Col md={4} className='d-flex justify-content-center align-items-center'>
                    <i className="fa-solid fa-location-dot" />
                </Col>
                <Col md={8}>
                    <Link to={'/profile/addresses'} className='text-muted text-decoration-none'>Address List</Link>
                </Col>
            </Row>

            <Col className='d-flex justify-content-center'>
                <hr className='divider'/>
            </Col>

            <Row className='mx-3'>
                <Col md={4} className='d-flex justify-content-center align-items-center'>
                    <i class="fa-solid fa-badge-dollar"></i>
                </Col>
                <Col md={8}>
                    <Link to={'./selling'} className='text-muted text-decoration-none'>My Products</Link>
                </Col>
            </Row>

            <Col className='d-flex justify-content-center'>
                <hr className='divider'/>
            </Col>

            <Row className='mx-3'>
                <Col md={4} className='d-flex justify-content-center align-items-center'>
                    <i className="fa-solid fa-hand-sparkles" />
                </Col>
                <Col md={8}>
                    <Link to={'./'} className='text-muted text-decoration-none'>My Bids</Link>
                </Col>
            </Row>

            <Col className='d-flex justify-content-center'>
                <hr className='divider'/>
            </Col>

            <Row className='mb-3 mx-3'>
                <Col md={4} className='d-flex justify-content-center align-items-center'>
                <i class="fa-solid fa-box"></i>
                </Col>
                <Col md={8}>
                    <Link to={'./orders'} className='text-muted text-decoration-none'>My Orders</Link>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button className="btn-dark edit-profile" onClick={updateModalShow}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </Button>
                </Col>
            </Row>
        </Card>
    )
}

export default ProfileDetails
