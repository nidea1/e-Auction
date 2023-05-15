import React from 'react';
import {Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProfileCard from '../components/Profile/ProfileCard';


function ProfileScreen() {
  
  const {
    userReducers: { userDetailsLoading, userDetailsError }
  } = useSelector((state) => state)

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
