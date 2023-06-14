import React, { useState } from 'react'
import { Col, Container } from 'react-bootstrap';
import styles from './CategoryMenu.module.css'
import SubCategoryMenu from './SubCategoryMenu';

function CategoryMenu({categories}) {

    const [activeCategory, setActiveCategory] = useState(null);
  
    return (
        <Container className={styles.categoryMenuNav}>
            <Col className='d-flex flex-wrap align-items-center justify-content-center'>
                <ul className='nav col-lg-auto mb-2 justify-content-center mb-md-0'>
                    {categories.map((category) => (
                        <li
                            key={category._id}
                            onMouseEnter={() => setActiveCategory(category._id)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            <Col className='fs-6'>{category.name}</Col>
                            {activeCategory === category._id && (
                                <SubCategoryMenu subCategories={category.subCategory}/>
                            )}
                        </li>
                    ))}
                </ul>
            </Col>
        </Container>
    );
}

export default CategoryMenu;
