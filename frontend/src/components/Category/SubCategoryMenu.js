import React from 'react'

function SubCategoryMenu({ subCategories }) {
    if (!subCategories || subCategories.length === 0) return null;

    return (
      <ul>
        {subCategories.map((subCategory) => (
          <li key={subCategory._id}>
            <a href="/#">{subCategory.name}</a>
            <SubCategoryMenu subCategories={subCategory.subCategory} />
          </li>
        ))}
      </ul>
    );
}

export default SubCategoryMenu
