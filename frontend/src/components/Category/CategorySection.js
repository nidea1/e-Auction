import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CategorySection({ topLevelCategory, searchMode }) {
  const [activeCategories, setActiveCategories] = useState([]);

  const toggleCategories = (category) => {
    if (activeCategories.includes(category._id)) {
      setActiveCategories(activeCategories.filter(id => id !== category._id));
    } else {
      setActiveCategories([...activeCategories, category._id]);
    }
  };

  const renderCategories = (category, isTopLevel = true) => {
    if (!category) return null;

    return (
      <ul className='list-unstyled m-0' style={isTopLevel ? { width: '100%' } : { }}>
        {isTopLevel && (
          <li className='text-center'>
            <Col className='border-bottom border-top py-2 fs-6 fw-semibold'>
              <span className='d-flex justify-content-center'>{searchMode ? 'All Categories' : category.name}</span>
            </Col>
          </li>
        )}
        {(isTopLevel && !searchMode ? category.subCategory : category).map((subCategory) => (
          <li key={subCategory._id} className="mt-3 mt-md-2 mt-xl-0 mx-2 mx-md-0">
            <Row className='d-flex flex-row justify-content-center align-items-center category-item rounded'>
              <Link to={`/categories/${subCategory.slug}-c-${subCategory._id}`} className='link-dark text-decoration-none col-9'>{subCategory.name}</Link>
              {subCategory.subCategory && (
                <Col className='col-3 d-flex align-items-center justify-content-center arrow' onClick={() => toggleCategories(subCategory)}>
                  {activeCategories.includes(subCategory._id) ? (<i className="fa-solid fa-angle-up"/>)
                  : (<i className="fa-solid fa-angle-down"/>)
                  }                    
                </Col>
              )}
            </Row>
            {activeCategories.includes(subCategory._id) && (
              subCategory.subCategory &&
              subCategory.subCategory.length > 0 &&
              renderCategories(subCategory.subCategory, false)
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='category-section my-2 justify-content-center'>
      {renderCategories(topLevelCategory)}
    </div>
  );
}

export default CategorySection;
