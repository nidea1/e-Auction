import React from 'react'
import { Button, Card, Col, Row, Image, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductByCategory({product}) {
  const endDate = new Date(product.endDate)
  const formattedEndDate = endDate.toLocaleDateString()

  const renderImages = () =>{
    return product.images.map((image) => (
      <Carousel.Item key={image.id}>
        <Image className="d-block w-100" src={image.image} alt="Product Image" height={200} fluid />
      </Carousel.Item>
    ))
  }
  return (
    <>
      <Card className='product-card p-4 my-3 shadow border-0'>
          <Col className="card-image">
            <Link to={`/product/${product.slug}-p-${product._id}`}>
              {product.images.length === 1 ?
                <Image className="d-block w-100" src={product.images[0].image} alt="Product Image" height={200} fluid />
              :
                <Carousel className='carousel-custom' variant='dark' interval={null}>
                  {renderImages()}
                </Carousel>
              }
            </Link>
          </Col>
          <Card.Body>
              <Link className='link-dark text-decoration-none' to={`/product/${product.slug}-p-${product._id}`}>
                <Col className='card-title fw-bold text-center'>
                  {product.name.substring(0,35)}{product.name.length > 35 ? '...' : ''}
                </Col>
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
                  <Col md={6} className='card-text d-flex'>
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
