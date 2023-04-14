import React from 'react'
import { Col, Container, Form, FormControl, ListGroupItem, Navbar, NavDropdown, Row } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';


function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <>
            <header class='p-3 mb-3 border-bottom shadow-sm'>
                <Container>
                    <Col className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
                        <NavLink to='/' className={'nav-link link-dark d-flex align-items-center mb-2 mb-lg-0 fs-5'}>
                            <Navbar.Brand className='fw-semibold'>
                            <i class="fa-sharp fa-solid fa-gavel fa-shake"/> &nbsp;e-Auction
                            </Navbar.Brand>
                        </NavLink>
                        &nbsp;&nbsp;
                        <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
                            <ListGroupItem className='border-0'>
                                <NavLink to={'/'} className={({isActive, isPending}) => isPending ? "" : isActive ? "nav-link px-2 link-secondary" : "nav-link px-2 link-dark" }>Home</NavLink>
                            </ListGroupItem>
                            <ListGroupItem className='border-0'>
                                <NavLink to={'/cs'} className={({isActive, isPending}) => isPending ? "" : isActive ? "nav-link px-2 link-secondary" : "nav-link px-2 link-dark" }>Help & Contact</NavLink>
                            </ListGroupItem>
                            <ListGroupItem className='border-0'>
                                <NavLink to={'/sss'} className={({isActive, isPending}) => isPending ? "" : isActive ? "nav-link px-2 link-secondary" : "nav-link px-2 link-dark" }>FAQs</NavLink>
                            </ListGroupItem>
                        </ul>
                        <Form className='col-12 col-lg-4 mb-3 mb-lg-0 me-lg-3' role={'search'}>
                            <FormControl
                            type='search'
                            placeholder='Search a product, category or brand'
                            aria-label='Search'
                            />
                        </Form>
                        { userInfo ? 
                        <NavDropdown className='text-end' title={userInfo.name}>
                            <NavDropdown.Item href='/profile'>
                                    Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        :   <NavLink to="/login" className={'link fw-semibold'}>
                                <i className='fa-regular fa-user' /> Login
                            </NavLink>
                        }
                    </Col>
                </Container>
            </header>
            <Container>
                <Row className='border-bottom'>
                    <ul className='d-flex flex-wrap align-items-center justify-content-center me-lg-auto mb-2'>
                        <ListGroupItem className='px-2'>
                            Electronics
                        </ListGroupItem>
                        <ListGroupItem className='px-2'>
                            Electronics
                        </ListGroupItem>
                    </ul>
                </Row>
            </Container>
        </>
    )
}

export default Header
