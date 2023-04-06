import React from 'react'
import { Card, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <>
        <Card className='p-4 my-3 shadow border-0'>
            <Link to={`/product/${product._id}`}>
              <Image variant="top" src={product.image} height={300} fluid/>
            </Link>
            <Card.Body>
                <Link className='link' to={`/product/${product._id}`}>
                  <Card.Title>{product.name}</Card.Title>
                </Link>
                <hr />
                <Card.Text className='my-3'>
                {product.description}
                </Card.Text>
                <Link to={`/product/${product._id}`}>
                  <Button variant="dark" className='shadow'>Detail</Button>
                </Link>
            </Card.Body>
        </Card>
    </>
  )
}

export default Product