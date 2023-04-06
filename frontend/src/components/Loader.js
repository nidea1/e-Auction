import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loader() {
  return (
    <Spinner animation="border" role="status" className='m-auto d-block' style={{height: 100, width: 100}}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}
