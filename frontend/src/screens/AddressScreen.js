import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from 'react-bootstrap';
import { listAddresses } from "../actions/addressActions";
import Loader from '../components/Loader';
import Message from '../components/Message';
import Address from '../components/Address';

function AddressScreen() {
  const dispatch = useDispatch()
  const addressList = useSelector(state => state.addressList)
  const { error, loading, addresses} = addressList

  useEffect(() =>{
    dispatch(listAddresses())
  },[dispatch])

  return (
    <>
        { loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>  
        : <Row className='ms-4'>
            {addresses.map(address => (
                <Col sm="12" md="6" lg="4">
                    <Address address={address} />
                </Col>
            ))}
          </Row>
    }
    </>
  )
}

export default AddressScreen
