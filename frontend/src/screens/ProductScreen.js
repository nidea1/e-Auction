import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, InputGroup, Form, Carousel} from 'react-bootstrap'
import Countdown from '../components/Countdown'
import { useDispatch, useSelector } from 'react-redux';
import { detailProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { placeBid } from '../actions/bidActions';
import { bidPlaceReset } from '../reducers/bidReducers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductScreen() {
    let { productParams } = useParams();
    let [ slug, id ] = productParams.split('-p-')
    
    const dispatch = useDispatch()
    const {
      productReducers : { productDetailsError, productDetailsLoading, product },
      bidReducers: { bidPlaceError, bidPlaceLoading, bidPlaceSuccess, bid },
      userReducers: { userInfo }
    } = useSelector((state) => state)

    const [highestBid, setHighestBid] = useState('')
    const [bidCount, setBidCount] = useState('')
    const [closeTime, setCloseTime] = useState('')

    useEffect(() =>{
      dispatch(detailProducts(id))
    }, [dispatch, id])

    useEffect(() => {
      setHighestBid(product.currentHighestBid)
      setBidCount(product.totalBids)
      setCloseTime(product.endDate)
    },[product])

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

    const [offer, setOffer] = useState('')

    const submitHandler = (e) => {
      e.preventDefault()
      
      let bid = {
        'product': id,
        'bid': offer,
      }

      dispatch(placeBid(bid))
    }

    const loadingToast = () =>{
      toast.info("Response is pending...", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      })
    }
    

    useEffect(() => {
      if (bidPlaceLoading) {
        loadingToast()
      }
    
      if (!bidPlaceLoading) {
        toast.dismiss()
        if (bidPlaceSuccess){

          let success = async () => {
            await dispatch(bidPlaceReset())
            toast.success(`You bidded $${bid.bid} to this product.`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            })
          }

          success();
        }

        if (bidPlaceError) {
          toast.error(bidPlaceError, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          })
        }
      }


    }, [bidPlaceLoading, bidPlaceSuccess, dispatch, id, bidPlaceError, bid])

    useEffect(() => {
      const socket = new WebSocket(`ws://127.0.0.1:8000/ws/auctions/${id}/`)

      socket.onmessage = (e) => {
        const wsData = JSON.parse(e.data)
        const wsDataMessage = JSON.parse(wsData.message)
        if (wsDataMessage) {
          setHighestBid(wsDataMessage.amount)
          setBidCount(wsDataMessage.bid_count)
          console.log(wsDataMessage.closes_in)
          if(wsDataMessage.closes_in) {
            setCloseTime(wsDataMessage.closes_in)
          }
        }
      }

      return() => {
        socket.close()
      }
    }, [id])

    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        { productDetailsLoading ? <Loader />
          : productDetailsError ? <Message variant='danger'>{productDetailsError}</Message>  
          : closeTime &&
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
                  Starting bid: <strong>${product.price}</strong>
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card className='shadow border-0'>
                <ListGroup>
                  <ListGroupItem>
                    <Row className='d-flex'>
                      <Col md={7}>
                        {
                          countdownFinished ? 'Sold to: '
                          : 'Current highest bid: '                      
                        }
                      </Col>
                      <Col md={5} className='h4 justify-content-end d-flex'>
                        <strong>${highestBid}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row className={countdownFinished ? 'justify-content-center' : ''}>
                      {!countdownFinished ?
                      <Col md={4}>
                        Closes in:
                      </Col>:
                      ''
                      }
                      <Col md={!countdownFinished ? 8 : ''} className={!countdownFinished ? 'justify-content-end d-flex' : 'h5 text-center mt-2'}>
                        <Row>
                          <Countdown endDate={new Date(closeTime)} onCountdownUpdate={handleCountdownUpdate} />
                        </Row>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col md={8}>
                        Bids:
                      </Col>
                      <Col md={4} className='justify-content-end d-flex'>
                        <strong>{bidCount}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row className='justify-content-center'>
                      {userInfo ?
                        (!countdownFinished ?
                          <Col md={12}>
                            <Form onSubmit={submitHandler}>
                              <InputGroup className='mb-1'>
                                <InputGroup.Text style={{cursor:'default'}}>$</InputGroup.Text>
                                <Form.Control
                                  placeholder='Enter your bid'
                                  value={offer}
                                  onChange={(e) => setOffer(e.target.value)}
                                />
                              </InputGroup>
                              <Col md={12} className='d-flex justify-content-center'>
                                <Button type='submit' className="w-100 rounded my-2 btn-dark">Place a bid</Button>
                              </Col>
                            </Form>
                          </Col>
                        : 
                          <Col md={12} className='d-flex justify-content-center'>
                            <Link to="/" className="w-100 btn btn-dark my-2">
                              Go back
                            </Link>
                          </Col>
                        )
                      :
                      <Col md={12} className='d-flex justify-content-center'>
                        <Link to="/login" className="w-100 btn btn-warning my-2">
                          You must be logged in.
                        </Link>
                      </Col>
                      }
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        }
      </>
    )
}


export default ProductScreen
