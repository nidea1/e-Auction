import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { detailCategories } from "../actions/categoryActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CategorySection from "../components/Category/CategorySection";
import ProductByCategory from "../components/Category/ProductByCategory";

function CategoryScreen() {
  const { categoryParams } = useParams();
  const [slug, id] = categoryParams.split("-c-");

  const dispatch = useDispatch();
  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { error, loading, category } = categoryDetails;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    dispatch(detailCategories(id));
  }, [dispatch, id]);

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

  const topLevelCategory = findTopLevelCategory(categories, parseInt(id));

  const collectSubcategoryProducts = (category) => {
    let allProducts = category.products || [];
    if (category.subCategory && category.subCategory.length > 0) {
      category.subCategory.forEach((subCategory) => {
        allProducts = allProducts.concat(collectSubcategoryProducts(subCategory));
      });
    }
    return allProducts;
  };

  const productsToShow = collectSubcategoryProducts(category);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <div className="search-info">
            You search for <strong>{category.name}</strong> lists {productsToShow.length} results
          </div>
          <Row>
            <Col xs={12} md={2} className="p-3 my-3 shadow rounded">
              <CategorySection topLevelCategory={topLevelCategory} />
            </Col>
            <Col xs={12} md={9} className="ms-md-4">
              <Row>
                {productsToShow.map((product) => (
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
