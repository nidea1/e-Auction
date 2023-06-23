import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { detailProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from '../components/ProductBidding/ProductDetail';
import BidSection from '../components/ProductBidding/BidSection';
import { productBids } from '../actions/bidActions';


function ProductScreen() {
    let { productParams } = useParams();
    let [ slug, id ] = productParams.split('-p-')
    
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(detailProducts(id))
    }, [dispatch, id])

    const {
      productReducers : { productDetailsError, productDetailsLoading },
    } = useSelector((state) => state)

    useEffect(() => {
      dispatch(productBids(id))
    }, [id, dispatch])

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
          : 
          <Row className='my-5 justify-content-end'>

            <ProductDetail />

            <BidSection dispatch={dispatch} productID={id} />

          </Row>
        }
      </>
    )
}


export default ProductScreen
