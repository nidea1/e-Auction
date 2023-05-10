import React, { useEffect } from "react";
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

function CategoryScreen() {
  const { categoryParams } = useParams();
  const [slug, id] = categoryParams.split("-c-");

  const dispatch = useDispatch();
  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { error, loading, category } = categoryDetails;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('search')

  const {
    productReducers: { products }
  } = useSelector((state) => state)

  useEffect(() => {
    if (keyword) {
      dispatch(listProducts(keyword, undefined));
    } else {
      dispatch(listProducts(undefined, id));
      dispatch(detailCategories(id))
    }
  }, [dispatch, id, keyword]);

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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                <FilterByBrand category_id={id} searchParams={keyword} />
              </Col>
            </Col>
            <Col xs={12} md={9} className="ms-md-4">
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <ProductByCategory product={product} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default CategoryScreen;
