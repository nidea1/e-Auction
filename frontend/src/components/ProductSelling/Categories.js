import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Categories() {
    const {
        categoryList: { categories },
    } = useSelector((state) => state);

    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubCategory] = useState(null);

    const navigate = useNavigate()

    const handleCategoryClick = (categoryID) => {
        if (activeCategory === categoryID) {
        setActiveCategory(null);
        setActiveSubCategory(null);
        } else {
        setActiveCategory(categoryID);
        setActiveSubCategory(null);
        }
    };

    const handleSubCategoryClick = (subCategoryID) => {
        if (activeSubCategory === subCategoryID) {
        setActiveSubCategory(null);
        } else {
        setActiveSubCategory(subCategoryID);
        }
    };

    const handleThirdLevelClick = (id, name) => {
        navigate(
            '/product/upload/attr',
            {
                state: {
                    categoryID: id,
                    categoryName: name,
                },
            },
        )
    }

    return (
        <>
        <Row className="justify-content-center border rounded shadow text-center">
                <Row className="justify-content-center mb-2 mt-3">
                    <Col className="border-bottom pb-3 h5">Choose Your Category</Col>            
                </Row>
                <Col className="selling-categories">
                    <Col lg={2} className="mb-2 pe-2 border-end level-one text-center">
                    {categories.map((category) => (
                        <Col
                        className={`my-2 p-2 rounded ${
                            activeCategory === category._id ? "bg-light" : ""
                        }`}
                        key={category._id}
                        onClick={() => handleCategoryClick(category._id)}
                        >
                        {category.name}
                        </Col>
                    ))}
                    </Col>
                    <Col lg={4} className={`level-two px-2 mb-2 ${activeCategory !== null && categories ? 'border-end' : ''}`}>
                    {activeCategory !== null &&
                        categories
                        .find((category) => category._id === activeCategory)
                        .subCategory.map((sub) => (
                            <Col
                            className={`my-2 p-2 rounded ${
                                activeSubCategory === sub._id ? "bg-light" : ""
                            }`}
                            key={sub._id}
                            onClick={() => handleSubCategoryClick(sub._id)}
                            >
                            {sub.name}
                            </Col>
                        ))}
                    </Col>
                    <Col className="mb-2 ms-2 level-three">
                    {activeSubCategory !== null && (() => {
                        const subCategory = categories
                        .find((category) => category._id === activeCategory)
                        .subCategory.find((sub) => sub._id === activeSubCategory)
                        .subCategory;

                        return (
                            subCategory && subCategory.length > 0
                                ? subCategory.map((sub2) => (
                                    <Col
                                        className={`my-2 p-2 rounded`}
                                        key={sub2._id}
                                        onClick={() => handleThirdLevelClick(sub2._id, sub2.name)}
                                    >
                                        {sub2.name}
                                    </Col>
                                ))
                                : (
                                    <Col className={`my-2 p-2 rounded fw-bolder h4`}>
                                        This category is currently unavailable.
                                    </Col>
                                )
                        );
                    })()}
                    </Col>
                </Col>
                </Row>
        </>
    );
}

export default Categories;
