import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Button, Card, InputGroup, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Countdown from './Countdown'
import { toast } from 'react-toastify';
import { placeBid } from '../../actions/bidActions';
import { bidPlaceReset } from '../../reducers/bidReducers';
import { Link } from 'react-router-dom'

function BidSection({dispatch, productID}) {

    const {
        productReducers : { product },
        bidReducers: { bidPlaceError, bidPlaceLoading, bidPlaceSuccess, bid },
        userReducers: { userInfo }
    } = useSelector((state) => state)

    const [highestBid, setHighestBid] = useState('')
    const [bidCount, setBidCount] = useState('')
    const [closeTime, setCloseTime] = useState('')

    useEffect(() => {
        setHighestBid(product.currentHighestBid)
        setBidCount(product.totalBids)
        setCloseTime(product.endDate)
    },[product])

    const [countdownFinished, setCountdownFinished] = useState(false);

    const handleCountdownUpdate = (countdown) => {
        const isFinished = countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;
        setCountdownFinished(isFinished);
    }

    const [offer, setOffer] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        
        let bid = {
            'product': productID,
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
    }, [bidPlaceLoading, bidPlaceSuccess, dispatch, productID, bidPlaceError, bid])

    useEffect(() => {
        const socket = new WebSocket(`ws://127.0.0.1:8000/ws/auctions/${productID}/`)

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
    }, [productID])


    return (
        <>
            {closeTime &&
            <Col md={3}>
                <Card className='shadow border-0'>
                    <ListGroup>
                        <ListGroup.Item>
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
                        </ListGroup.Item>
                        <ListGroup.Item>
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
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col md={8}>
                                Bids:
                            </Col>
                            <Col md={4} className='justify-content-end d-flex'>
                                <strong>{bidCount}</strong>
                            </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row className='justify-content-center'>
                            {userInfo ?
                                (!countdownFinished ?
                                <Col md={12}>
                                    <Form onSubmit={submitHandler}>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text style={{cursor:'default'}}>$</InputGroup.Text>
                                        <Form.Control
                                            required
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
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            }
        </>
    )
}

export default BidSection
