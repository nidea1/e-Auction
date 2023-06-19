import React from 'react'
import { Link } from 'react-router-dom';


function SubCategoryMenu({ subCategories }) {
    if (!subCategories || subCategories.length === 0) return null;

    return (
      <ul>
        {subCategories.map((subCategory) => (
          <li key={subCategory._id}>
            <Link to={`/categories/${subCategory.slug}-c-${subCategory._id}`}>{subCategory.name}</Link>
            <SubCategoryMenu subCategories={subCategory.subCategory} />
          </li>
        ))}
      </ul>
    );
}

export default SubCategoryMenu
