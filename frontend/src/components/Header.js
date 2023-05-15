import React, { useEffect, useState } from 'react'
import { Col, Container, Form, FormControl, ListGroupItem, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import CategoryMenu from './Category/CategoryMenu';
import { listCategories } from '../actions/categoryActions';


function Header() {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    const {
        categoryReducers: { categories },
        userReducers: { userInfo }
    } = useSelector((state) => state)

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])

    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        if(keyword.trim()){
            navigate(`/categories/all-c-all?search=${keyword}`)
        }else{
            navigate('/')
        }
    }

    return (
        <>
            <header class='p-3 mb-3 border-bottom shadow-sm'>
                <Container>
                    <Col className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
                        <NavLink to='/' className={'nav-link link-dark d-flex align-items-center mb-2 mb-lg-0 fs-5'}>
                            <Navbar.Brand className='fw-semibold'>
                            <i class="fa-sharp fa-solid fa-gavel fa-shake"/> &nbsp;eAuction
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
                        <Form className='col-12 col-lg-4 mb-3 mb-lg-0 me-lg-3' role={'search'} onSubmit={submitHandler}>
                            <FormControl
                            type='search'
                            placeholder='Search a product, category or brand'
                            aria-label='Search'
                            onChange={(e) => setKeyword(e.target.value)}
                            />
                        </Form>
                        { userInfo ? 
                        <NavDropdown className='text-end' title={userInfo.name}>
                            <NavDropdown.Item href='/profile'>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/product/upload'>
                                Sell a product
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        :   <NavLink to="/login" className={'link-dark text-decoration-none fw-semibold'}>
                                <i className='fa-regular fa-user' /> Login
                            </NavLink>
                        }
                    </Col>
                </Container>
            </header>
            <CategoryMenu categories={categories}/>
        </>
    )
}

export default Header
