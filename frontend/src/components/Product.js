import React from 'react'
import { Card, Button, Image, Col, Row, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Product({ product }) {

  const endDate = new Date(product.endDate)
  const formattedEndDate = endDate.toLocaleDateString()

  const renderImages = () => {
    return product.images.map((image) => (
      <Carousel.Item key={image.id}>
        <Image className="d-block w-100" src={image.image} alt="Product Image" height={200} fluid />
      </Carousel.Item>
    ))
  }

  return (
    <>
        <Card className='p-4 my-3 shadow border-0 h-100' style={{ minHeight: '650px', maxHeight: '650px' }}>
            <Link to={`/product/${product.slug}-p-${product._id}`}>
              {product.images.length === 1 ?
                <Image className="d-block w-100" src={product.images[0].image} alt="Product Image" height={200} fluid />
              :
                <Carousel className='carousel-custom' variant='dark' interval={null}>
                  {renderImages()}
                </Carousel>
              }
            </Link>
            <Card.Body className="d-flex flex-column">
                <Link className='link-dark text-decoration-none border-bottom pb-2' to={`/product/${product.slug}-p-${product._id}`}>
                  <Card.Title>{product.name.substring(0,55)}{product.name.length > 55 ? '...' : ''}</Card.Title>
                </Link>
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
                  <Button variant="dark" className="mt-auto">Detail</Button>
                </Link>
                
            </Card.Body>
        </Card>
    </>
  )
}

export default Product
