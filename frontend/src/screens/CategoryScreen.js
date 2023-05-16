import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
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

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const {
    productReducers: { products }
  } = useSelector((state) => state)

  useEffect(() => {
    if (keyword) {
      dispatch(listProducts(keyword, undefined, selectedBrands, undefined, selectedStatus));
    } else {
      dispatch(listProducts(undefined, id, selectedBrands, undefined, selectedStatus));
      dispatch(detailCategories(id))
    }
  }, [dispatch, id, keyword, selectedBrands, selectedStatus]);

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

  return (
    <>
      <FilterContext.Provider value={{ selectedBrands, setSelectedBrands, selectedStatus, setSelectedStatus }}>
      { categoryDetailsError ? 
        <Message variant="danger">{categoryDetailsError}</Message>
       : 
        <Container>
          <Col className="search-info">
            You search for <strong>{keyword ? keyword : category.name}</strong> lists {products.length} results
          </Col>
          <Row>
            <Col xs={12} md={2} className="p-3 my-3 shadow rounded">
              <Col>
                <CategorySection
                  topLevelCategory={topLevelCategory}
                  searchMode={keyword}
                />
              </Col>
              <Col>
                <FilterByBrand searchParams={keyword} />
              </Col>
              <Col>
                <FilterByStatus />
              </Col>
            </Col>
            <Col xs={12} md={9} className="ms-md-4">
              {categoryDetailsLoading ?
                <Loader />
              :
                <Row>
                  {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <ProductByCategory product={product} />
                    </Col>
                  ))}
                </Row>
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
