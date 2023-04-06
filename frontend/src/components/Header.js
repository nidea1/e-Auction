import React from 'react'
import logo from '../logo.svg'
import { Container, Navbar, NavDropdown } from "react-bootstrap";
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
            <header>
                <Navbar bg="light" expand="lg" className='shadow-sm'>
                    <Container>
                        <NavLink to='/' className={'link'}>
                            <Navbar.Brand className='fw-semibold'>
                            <i class="fa-sharp fa-solid fa-gavel fa-shake" /> E-Auction
                            </Navbar.Brand>
                        </NavLink>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end fw-semibold">
                            { userInfo ? 
                            <NavDropdown title={userInfo.name} id='username'>
                                <NavDropdown.Item href='/profile'>
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            :
                            <NavLink to="/login" className={'link fw-semibold'}>
                                <i className='fa-regular fa-user' /> Login
                                </NavLink>
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default Header