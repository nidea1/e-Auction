import React, { useEffect } from 'react';
import {Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProfileCard from '../components/Profile/ProfileCard';
import { productSliceReset } from '../reducers/productReducers';


function ProfileScreen() {
  
  const {
    userReducers: { user, userDetailsLoading, userDetailsError }
  } = useSelector((state) => state)

  const dispatch = useDispatch()

  useEffect(() => {
      if(user){
        dispatch(productSliceReset())
        dispatch(listProducts(undefined,undefined,undefined,user._id))
      }
  },[dispatch,user])

  return (
    <>
        {userDetailsLoading ? <Loader />
        : userDetailsError ? <Message variant={'danger'}>{userDetailsError}</Message>
        :
        <Row className='justify-content-center my-3 py-3'>
            <Col md={4}>
              <ProfileCard />
            </Col>
            <Col md={8}>
              <Outlet />
            </Col>
        </Row>
        }
    </>
  )
}

export default ProfileScreen
