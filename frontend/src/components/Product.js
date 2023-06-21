import React from 'react'
import { Card, Button, Image, Col, Row, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Product({ product }) {

  const endDate = new Date(product.endDate)
  const formattedEndDate = endDate.toLocaleDateString()
  const today = new Date()

  const renderImages = () => {
    return product.images.map((image) => (
      <Carousel.Item key={image.id}>
        <Image className="d-block w-100" src={image.image} alt="Product Image" height={200} fluid />
      </Carousel.Item>
    ))
  }

  return (
    <>
        <Card className='p-4 my-3 shadow border-0 h-100'>
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
                <Col className='mt-3 fw-semibold'>
                { product.currentHighestBid !== 0 ? 
                  <Row>
                    <Col className='text-nowrap'>
                      Current max bid:
                    </Col>
                    <Col className='d-flex justify-content-end'>
                      ${product.currentHighestBid}
                    </Col>
                  </Row>
                :
                  <Row>
                    <Col className='text-nowrap'>
                      Starting bid:
                    </Col>
                    <Col className='d-flex justify-content-end'>
                      ${product.price}
                    </Col>
                  </Row>
                }
                { endDate < today ? 
                  <Row className='my-3'>
                    <Col className='card-text text-nowrap'>
                      Ended at:
                    </Col>
                    <Col className='card-text d-flex justify-content-end'>
                      {formattedEndDate}
                    </Col>
                  </Row>
                :
                  <Row className='my-3'>
                    <Col className='card-text text-nowrap'>
                      End date:
                    </Col>
                    <Col className='card-text d-flex justify-content-end'>
                      {formattedEndDate}
                    </Col>
                  </Row>
                }
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
