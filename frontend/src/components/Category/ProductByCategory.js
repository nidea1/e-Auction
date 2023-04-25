import React from 'react'
import { Button, Card, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductByCategory({product}) {
  const endDate = new Date(product.endDate)
  const formattedEndDate = endDate.toLocaleDateString()
  return (
    <>
      <Card className='product-card p-4 my-3 shadow border-0'>
          <div className="card-image">
            <Link to={`/product/${product.slug}-p-${product._id}`}>
              <Image src={product.image} fluid />
            </Link>
          </div>
          <Card.Body>
              <Link className='link-dark text-decoration-none' to={`/product/${product.slug}-p-${product._id}`}>
                <Col className='card-title fw-bold text-center'>{product.name}</Col>
              </Link>
              <hr />
              <Col className='my-3'>
                <Row>
                  <Col md={6} className='card-text'>
                    Current max bid:
                  </Col>
                  <Col md={6} className='card-text'>
                    ${product.currentHighestBid}
                  </Col>
                </Row>
                <Row className='my-3'>
                  <Col md={6} className='card-text'>
                    End date:
                  </Col>
                  <Col md={6} className='card-text d-flex align-items-center'>
                    {formattedEndDate}
                  </Col>
                </Row>
              </Col>
              <Col className='d-flex justify-content-center'>
                <Link to={`/product/${product.slug}-p-${product._id}`}>
                  <Button variant="dark">Detail</Button>
                </Link>
              </Col>
          </Card.Body>
      </Card>
    </>
  )
}

export default ProductByCategory
