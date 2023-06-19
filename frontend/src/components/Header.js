import React, { useCallback, useEffect, useState } from 'react'
import { Col, Container, Form, FormControl, ListGroupItem, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detail, logout } from '../actions/userActions';
import CategoryMenu from './Category/CategoryMenu';
import { listCategories } from '../actions/categoryActions';
import { userDetailsReset, userLogoutReset } from '../reducers/userReducers';
import { buyList } from '../actions/orderActions';
import { buyOrderListReset } from '../reducers/orderReducers';


function Header() {

    const {
        categoryReducers: { categories },
        userReducers: { user, userLogoutSuccess, userInfo, userDetailsSuccess, userLogoutError },
        orderReducers : { buyOrders, buyOrderError },
    } = useSelector((state) => state)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutAndClean = useCallback(() => {
        localStorage.removeItem('user')
        dispatch(logout())
    }, [dispatch])

    const logoutHandler = () => {
        localStorage.removeItem('user')
        dispatch(logout())
    }

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])

    useEffect(() => {
        if(!user && userInfo){
            dispatch(detail())
        }

        if(user){
            dispatch(buyList())
        }
    },[dispatch, user, userInfo, navigate])

    useEffect(() => {
        if(buyOrderError){
            logoutAndClean()
            dispatch(buyOrderListReset())
        }
    }, [dispatch, buyOrderError, logoutAndClean])

    useEffect(() => {
        if(userDetailsSuccess){
            dispatch(userDetailsReset())
        }
    }, [dispatch, userDetailsSuccess])

    useEffect(() => {
        if(userLogoutSuccess){
            navigate('/')
            dispatch(userLogoutReset())
        }else if(userLogoutError){
            window.location.reload(true)
        }
    }, [navigate, userLogoutSuccess, userLogoutError, dispatch])

    useEffect(() => {
        if(user && !user.isSocialRegisterCompleted){
            navigate('register/social')
        }
    }, [navigate, user])

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        if(keyword.trim()){
            navigate(`/categories/all-c-all?search=${keyword}`)
        }else{
            navigate('/')
        }
    }

    const navLinkClass = "nav-link px-2"

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
                            <ListGroupItem>
                                <NavLink to={'/'} className={({isActive, isPending}) => isPending ? "" : isActive? `${navLinkClass} link-secondary` : `${navLinkClass} link-dark` }>Home</NavLink>
                            </ListGroupItem>
                            <ListGroupItem>
                                <NavLink to={'/cs'} className={({isActive, isPending}) => isPending ? "" : isActive ? `${navLinkClass} link-secondary` : `${navLinkClass} link-dark` }>Help & Contact</NavLink>
                            </ListGroupItem>
                            <ListGroupItem>
                                <NavLink to={'/sss'} className={({isActive, isPending}) => isPending ? "" : isActive ? `${navLinkClass} link-secondary` : `${navLinkClass} link-dark` }>FAQs</NavLink>
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
                        {user ?
                        <>
                            <ListGroupItem className='me-2'>
                                <NavLink to={'/shopping-cart'}
                                    className={({isActive, isPending}) =>
                                        isPending ? "" : isActive ? `${navLinkClass} d-flex link-secondary` : `${navLinkClass} d-flex link-dark`
                                    }
                                >
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    {buyOrders && buyOrders.length > 0 ?
                                        <Col
                                            className='cart-item-count ms-1'
                                        >
                                            {buyOrders.length}
                                        </Col>
                                        :
                                        ''
                                    }
                                </NavLink>
                            </ListGroupItem>
                            <NavDropdown className='text-end' title={user && user.isSocialRegisterCompleted ? (
                                <>
                                    <i class="fa-solid fa-user"></i> {user.name}
                                </>
                            ) : 'Please set your account.'}>
                                <NavDropdown.Item href='/profile'>
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item href='/product/upload'>
                                    Sell a product
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </>
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
