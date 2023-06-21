import React from 'react'
import { Button, Card, Col, Row, Image, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductByCategory({product}) {
  const endDate = new Date(product.endDate)
  const formattedEndDate = endDate.toLocaleDateString()
  const today = new Date()

  const renderImages = () =>{
    return product.images.map((image) => (
      <Carousel.Item key={image.id}>
        <Image className="d-block w-100" src={image.image} alt="Product Image" height={200} fluid />
      </Carousel.Item>
    ))
  }
  return (
    <>
      <Card className='product-card p-3 my-3 shadow border-0'>
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
                  {product.name.substring(0,30)}{product.name.length > 30 ? '...' : ''}
                </Col>
              </Link>
              <hr />
              <Col className='mb-3'>
              { product.currentHighestBid !== 0 ? 
                <Row>
                  <Col className='card-text feature text-start text-md-center fw-semibold col-4 col-md-12'>
                    Current max bid:
                  </Col>
                  <Col className='card-text text-end text-md-center'>
                    ${product.currentHighestBid}
                  </Col>
                </Row>
              :
                <Row>
                  <Col className='card-text feature text-start text-md-center fw-semibold col-4 col-md-12'>
                    Starting bid:
                  </Col>
                  <Col className='card-text text-end text-md-center'>
                    ${product.price}
                  </Col>
                </Row>
              }
              { endDate < today ? 
                <Row>
                  <Col className='card-text feature text-start text-md-center fw-semibold col-4 col-md-12'>
                    Ended at:
                  </Col>
                  <Col className='card-text text-end text-md-center'>
                    {formattedEndDate}
                  </Col>
                </Row>
                :
                <Row>
                  <Col md={6} className='card-text feature text-start text-md-center text-xl-start fw-semibold col-4 col-md-12 col-xl-4'>
                    End date:
                  </Col>
                  <Col md={6} className='card-text text-end text-md-center text-xl-end'>
                    {formattedEndDate}
                  </Col>
                </Row>
              }
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
