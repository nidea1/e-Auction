import React, { useEffect, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listBrands, listProducts } from '../../actions/productActions'

function FilterByBrand({category_id, searchParams}) {

    const dispatch = useDispatch()

    const brandList = useSelector(state => state.brandList)
    const {brands} = brandList


    const [selectedBrands, setSelectedBrands] = useState([]);

    useEffect(() => {
        dispatch(listBrands())
    },[dispatch])

    useEffect(() => {
        if(searchParams){
            dispatch(listProducts(searchParams, undefined, selectedBrands))
        }else{
            dispatch(listProducts(undefined, category_id, selectedBrands))
        }
    }, [dispatch, category_id, selectedBrands, searchParams])

    const handleBrandSelect = (e) => {
        const brandId = e.target.id;
        if (e.target.checked) {
            setSelectedBrands([...selectedBrands, brandId]);
        } else {
            setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
        }
    };

  return (
    <>
    <Col className="text-center border-top border-bottom py-2 fw-bold">
        Filter by Brand
    </Col>
    <Col className='ms-xl-4'>
        <Form>
        {brands.map((brand) => (
            <Col key={brand._id} className='my-2'>
            <Form.Check
                type='checkbox'
                id={brand._id.toString()}
                label={brand.name}
                name={brand.name}
                checked={selectedBrands.includes(brand._id.toString())}
                onChange={handleBrandSelect}
            />
            </Col>
        ))}
        </Form>
    </Col>
    </>
  )
}

export default FilterByBrand
