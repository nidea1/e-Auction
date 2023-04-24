import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { detailCategories } from "../actions/categoryActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CategorySection from "../components/Category/CategorySection";

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row style={{maxHeight:'75vh'}}>
          <span className="text-center">{category.name}</span>
          <Col className="category-container d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Col className="col-2 flex-shrink-0 p-3 shadow rounded">
              <CategorySection topLevelCategory={topLevelCategory} />
            </Col>
            <Col className="col-9 ms-4">
              Products by Category
            </Col>
          </Col>
        </Row>
      )}
    </>
  );
}

export default CategoryScreen;
