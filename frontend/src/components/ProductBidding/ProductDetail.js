import React from 'react'
import { Carousel, Col, Image, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function ProductDetail() {

  const {
    productReducers : { product },
  } = useSelector((state) => state)

    const renderImages = () => {
        return product.images && product.images.map((image) => (
            <Carousel.Item key={image.id}>
            <Image className="d-block w-100" src={image.image} alt="Product Image" height={200} fluid />
            </Carousel.Item>
        ))
    }
    
    return (
      product &&
        <>
            <Col md={6}>
              {product.images && product.images.length === 1 ?
                <Image className="d-block w-100" src={product.images[0].image} alt="Product Image" height={200} fluid />
              :
                <Carousel className='carousel-custom' variant='dark' interval={null}>
                  {renderImages()}
                </Carousel>
              }
            </Col>

            <Col md={6} xl={3}>
              <ListGroup variant='flush' className='text-center text-md-start mb-3 mb-md-0'>
                <ListGroup.Item>
                  <Col className='h4'>{product.name}</Col>
                  <small className='opacity-50'>
                    <span className='fw-semibold'>Brand: </span>{product.brandName.toUpperCase()} <br />
                    <span className='fw-semibold'>Seller: </span>{product.seller} <br />
                    <span className='fw-semibold'>Status: </span>{product.useStatus}
                  </small>
                </ListGroup.Item>
                { product.videoURL &&
                <ListGroup.Item>
                  <Col className='embed-responsive'>
                    <iframe className="embed-responsive-item w-100 h-100" src={product.videoURL} title={product.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                  </Col>
                </ListGroup.Item>
                }
                <ListGroup.Item>
                  {product.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Location</strong> <br />
                  {product.district} / {product.province}
                </ListGroup.Item>
                <ListGroup.Item>
                  Starting bid: <strong>${product.price}</strong>
                </ListGroup.Item>
              </ListGroup>
            </Col>
        </>
    )
}

export default ProductDetail
