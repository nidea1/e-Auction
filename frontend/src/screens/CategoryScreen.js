import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { detailCategories } from "../actions/categoryActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CategorySection from "../components/Category/CategorySection";
import ProductByCategory from "../components/Category/ProductByCategory";
import { listProducts } from "../actions/productActions";
import FilterByBrand from "../components/Category/FilterByBrand";
import FilterByStatus from "../components/Category/FilterByStatus";
import FilterContext from "../contexts/FilterContext";

function CategoryScreen() {
  const { categoryParams } = useParams();
  const [slug, id] = categoryParams.split("-c-");

  const dispatch = useDispatch();

  const {
    categoryReducers: { categoryDetailsLoading, categoryDetailsError, category, categories }
  } = useSelector((state) => state)

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('search')

  const [selectedBrands, setSelectedBrands] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrdering, setSelectedOrdering] = useState('endDate')

  const {
    productReducers: { products }
  } = useSelector((state) => state)

  useEffect(() => {
    if (keyword) {
      dispatch(listProducts({
        keyword: keyword,
        brands: selectedBrands,
        status: selectedStatus,
        ordering: selectedOrdering
      }));
    } else {
      dispatch(listProducts({
        category: id,
        brands: selectedBrands,
        status: selectedStatus,
        ordering: selectedOrdering
      }));
      dispatch(detailCategories(id))
    }
  }, [dispatch, id, keyword, selectedBrands, selectedStatus, selectedOrdering]);

  const findTopLevelCategory = (categories, categoryId) => {
    for (const category of categories) {
      if (category._id === categoryId) {
        return category;
      } else if (category.subCategory) {
        const result = findTopLevelCategory(category.subCategory, categoryId);
        if (result) {
          return category;
        }
      }
    }
    return null;
  };

  let topLevelCategory;

  if (keyword) {
    topLevelCategory = categories;
  } else {
    topLevelCategory = findTopLevelCategory(categories, parseInt(id));
  }
  const orderings = [
    {
        'name': 'Time: Ending soonest',
        'value': 'endDate',
        'id': 'o-1'
    },
    {
        'name': 'Time: Newly listed',
        'value': '-endDate',
        'id': 'o-2'
    },
    {
        'name': 'Bid: Lowest first',
        'value': 'price',
        'id': 'o-3'
    },
    {
        'name': 'Bid: Highest first',
        'value': '-price',
        'id': 'o-4'
    },
    {
        'name': 'Name: A -> Z',
        'value': 'name',
        'id': 'o-5'
    },
    {
        'name': 'Name: Z -> A',
        'value': '-name',
        'id': 'o-6'
    }
]

  return (
    products &&
    <>
      <FilterContext.Provider value={{ selectedBrands, setSelectedBrands, selectedStatus, setSelectedStatus }}>
      { categoryDetailsError ? 
        <Message variant="danger">{categoryDetailsError}</Message>
       : 
        <Container>
          <Row>
            <Col xs={12} md={3} xl={2}>
              <Row className="p-3 my-3 shadow rounded sticky-top" style={{top :'1rem'}}>
                <Col className="col-12 mb-4 mb-md-0">
                  <CategorySection
                    topLevelCategory={topLevelCategory}
                    searchMode={keyword}
                  />
                </Col>
                <Col>
                  <FilterByBrand searchParams={keyword} />
                </Col>
                <div className='vr mx-3 p-0 d-block d-md-none' style={{width: '0.25px'}} />
                <Col>
                  <FilterByStatus />
                </Col>
              </Row>
            </Col>
            <Col className="ms-md-4 my-3">
              <Row className="flex-column flex-lg-row justify-content-end">
                {categoryDetailsLoading ? '' : <Col>You search for <strong>{keyword ? keyword : category.name}</strong> lists {products.length} results</Col>}
                <Col className="align-self-md-end col-md-6 col-lg-4 col-xl-3">
                  <Form.Select value={selectedOrdering} size="sm" aria-label="ordering" className="shadow-sm fw-semibold my-3 my-md-0" onChange={(e) => setSelectedOrdering(e.target.value)}>
                    {orderings.map((ordering) => (
                      <option
                        id={ordering.id}
                        value={ordering.value}
                      >
                        {ordering.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              {categoryDetailsLoading ?
                <Loader />
              :
                <>
                  <Row>
                    {products.map((product) => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <ProductByCategory product={product} />
                      </Col>
                    ))}
                  </Row>
                </>
              }
            </Col>
          </Row>
        </Container>
      }
      </FilterContext.Provider>
    </>
  );
}

export default CategoryScreen;
