import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CategorySection({ topLevelCategory }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategories = (subCategory) => {
    setActiveCategory(activeCategory === subCategory._id ? null : subCategory._id);
  };

  const renderCategories = (category, isTopLevel = false) => {
    if (!category) return null;

    return (
      <ul style={{width:'175px'}}>
        {isTopLevel && (
          <li className='text-center'>
            <span className='fs-6 fw-semibold'>{category.name}</span>
            <hr />
            {category.subCategory && renderCategories(category)}
          </li>
        )}
        {!isTopLevel &&
          category.subCategory &&
          category.subCategory.map((subCategory) => (
            <li key={subCategory._id}>
              <Row className='d-flex flex-row justify-content-center align-items-center category-item rounded'>
                <Link to={`/categories/${subCategory.slug}-c-${subCategory._id}`} className='link-dark text-decoration-none col-9'>{subCategory.name}</Link>
                {subCategory.subCategory && (
                  <Col className='col-3 d-flex align-items-center justify-content-center arrow' onClick={() => toggleCategories(subCategory)}>
                    {activeCategory === subCategory._id ? (<i class="fa-solid fa-angle-up"/>)
                    : (<i class="fa-solid fa-angle-down"/>)
                    }                    
                </Col>
                )}
              </Row>
              {activeCategory === subCategory._id && (
                subCategory.subCategory &&
                subCategory.subCategory.length > 0 &&
                renderCategories(subCategory)
              )}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className='category-section mt-2 justify-content-center'>
      {topLevelCategory && renderCategories(topLevelCategory, true)}
    </div>
  );
}

export default CategorySection;
