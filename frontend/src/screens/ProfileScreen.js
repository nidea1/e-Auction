import React from 'react';
import {Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import ProfileCard from '../components/Profile/ProfileCard';


function ProfileScreen() {
  return (
    <>
        <Row className='justify-content-center my-3 py-3'>
            <Col md={4}>
              <ProfileCard />
            </Col>
            <Col md={8}>
              <Outlet />
            </Col>
        </Row>
    </>
  )
}

export default ProfileScreen
