import React from 'react'
import { Card, Button, Image, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Product({ product }) {
  const endDate = new Date(product.endDate)
  const formattedEndDate = endDate.toLocaleDateString()
  return (
    <>
        <Card className='p-4 my-3 shadow border-0'>
            <Link to={`/product/${product.slug}-p-${product._id}`}>
              <Image variant="top" src={product.image} height={300} fluid/>
            </Link>
            <Card.Body>
                <Link className='link-dark text-decoration-none' to={`/product/${product.slug}-p-${product._id}`}>
                  <Card.Title>{product.name}</Card.Title>
                </Link>
                <hr />
                <Col className='my-3 fw-semibold'>
                  <Row>
                    <Col md={8}>
                      Current max bid:
                    </Col>
                    <Col md={4}>
                      ${product.currentHighestBid}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      End date:
                    </Col>
                    <Col md={4}>
                      {formattedEndDate}
                    </Col>
                  </Row>
                </Col>
                <Link to={`/product/${product.slug}-p-${product._id}`}>
                  <Button variant="dark">Detail</Button>
                </Link>
                
            </Card.Body>
        </Card>
    </>
  )
}

export default Product
