import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCategories } from '../actions/categoryActions'
import Loader from './Loader'
import MenuItems from './MenuItems'
import Message from './Message'

function CategoryMenu() {

    const dispatch = useDispatch()
    const categoryList = useSelector(state => state.categoryList)
    const { error, loading, categories } = categoryList

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])

  return (
    <Container>
    { loading ? <Loader />
    : error ? <Message variant='danger'>{error}</Message>
    : <Row className='border-bottom'>
        <ul className='d-flex flex-wrap align-items-center justify-content-center me-lg-auto mb-2'>
            {
                categories.map((category, index) =>{
                    const depthLevel = 0
                    return <MenuItems item={category} key={index} depthLevel={depthLevel} />
                })
            }
        </ul>
       </Row>
    }
    </Container>
  )
}

export default CategoryMenu
