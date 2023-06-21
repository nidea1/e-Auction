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

            <Col md={6} lg={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                { product.videoURL &&
                <ListGroup.Item>
                  <Col className='embed-responsive'>
                    <iframe class="embed-responsive-item w-100 h-100" src={product.videoURL} title={product.name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                  </Col>
                </ListGroup.Item>
                }
                <ListGroup.Item>
                  {product.description}
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
