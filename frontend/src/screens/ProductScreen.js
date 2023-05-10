import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, InputGroup, Form, Carousel} from 'react-bootstrap'
import Countdown from '../components/Countdown'
import { useDispatch, useSelector } from 'react-redux';
import { detailProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


function ProductScreen() {
    let { productParams } = useParams();
    let [ slug, id ] = productParams.split('-p-')
    
    const dispatch = useDispatch()
    const {
      productReducers : { productDetailsError, productDetailsLoading, product }
    } = useSelector((state) => state)

    useEffect(() =>{
      dispatch(detailProducts(id))
    }, [dispatch, id])

    const [countdownFinished, setCountdownFinished] = useState(false);

    const handleCountdownUpdate = (countdown) => {
      const isFinished = countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;
      setCountdownFinished(isFinished);
    };

    const renderImages = () => {
      return product.images && product.images.map((image) => (
        <Carousel.Item key={image.id}>
          <Image className="d-block w-100" src={image.image} alt="Product Image" height={200} fluid />
        </Carousel.Item>
      ))
    }

    return (
      <>
        { productDetailsLoading ? <Loader />
          : productDetailsError ? <Message variant='danger'>{productDetailsError}</Message>  
          : 
          <Row className='my-5'>
            <Col md={6}>
              {product.images && product.images.length === 1 ?
                <Image className="d-block w-100" src={product.images[0].image} alt="Product Image" height={200} fluid />
              :
                <Carousel className='carousel-custom' variant='dark' interval={null}>
                  {renderImages()}
                </Carousel>
              }
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>

                <ListGroupItem>
                  {product.description}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>${product.price}</strong>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card className='shadow border-0'>
                <ListGroup>
                  <ListGroupItem>
                    <Row className='d-flex'>
                      <Col md={8}>
                        {
                          countdownFinished ? 'Sold to: '
                          : 'Current highest bid: '                      
                        }
                      </Col>
                      <Col md={4}>
                        <strong>${product.currentHighestBid}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col md={countdownFinished ? 4 : 8}>
                        Closes in:
                      </Col>
                      <Col md={countdownFinished ? 8 : 4}>
                        <strong><Countdown endDate={new Date(product.endDate)} onCountdownUpdate={handleCountdownUpdate} /></strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col md={8}>
                        Bids:
                      </Col>
                      <Col md={4}>
                        <strong>{product.totalBids}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {!countdownFinished ?
                  <ListGroupItem>
                    <Row className='justify-content-center'>
                      <Col md={12}>
                        
                          <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Text>.00</InputGroup.Text>
                          </InputGroup>
                          <Col md={12} className=' d-flex justify-content-center'>
                            <Button className="w-100 my-2 btn-dark">Place a bid</Button>
                          </Col>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  : 
                  <ListGroupItem>
                    <Row className='justify-content-center'>
                    <Col md={12} className='d-flex justify-content-center'>
                    <Link to="/" className="w-100 btn btn-dark my-2">
                      Go back
                    </Link>
                    </Col>
                    </Row>
                  </ListGroupItem>
                  }
                </ListGroup>
              </Card>
            </Col>
          </Row>
        }
      </>
    )
}


export default ProductScreen
