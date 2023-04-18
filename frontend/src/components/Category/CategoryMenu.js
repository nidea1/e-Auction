import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import styles from './CategoryMenu.module.css'
import SubCategoryMenu from './SubCategoryMenu';

function CategoryMenu({categories}) {

    const [activeCategory, setActiveCategory] = useState(null);
  
    return (
        <Container className={styles.categoryMenuNav}>
            <ul>
                {categories.map((category) => (
                    <li
                        key={category._id}
                        onMouseEnter={() => setActiveCategory(category._id)}
                        onMouseLeave={() => setActiveCategory(null)}
                    >
                        <a href='/#'>{category.name}</a>
                        {activeCategory === category._id && (
                            <SubCategoryMenu subCategories={category.subCategory}/>
                        )}
                    </li>
                ))}
            </ul>
        </Container>
    );
}

export default CategoryMenu;
