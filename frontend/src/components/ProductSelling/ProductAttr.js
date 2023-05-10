import React, { useEffect, useState } from 'react'
import { Form, FormGroup, FormLabel, Button, Row, Col, FormSelect, InputGroup, Figure } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { detailProducts, listBrands, publishProduct } from '../../actions/productActions'
import { productPublishReset } from '../../reducers/productReducers'
import FormContainer from '../FormContainer'
import Loader from '../Loader'
import Message from '../Message'
import data from '../Turkey.json'

function ProductAttr() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const provinces = data

    const {
        brandReducers : { brands, loading, error},
        userLogin: { userInfo },
        productReducers: { product, productPublishLoading, productPublishSuccess}
    } = useSelector((state) => state)

    const [productBrand, setProductBrand] = useState(null)
    const [productStatus, setProductStatus] = useState(null)
    const [productName, setProductName] = useState(null)
    const [productDescription, setProductDescription] = useState(null)
    const [productPrice, setProductPrice] = useState(null)
    const [productProvince, setProductProvince] = useState(null)
    const [productDistrict, setProductDistrict] = useState(null)
    const [productEndDate, setProductEndDate] = useState(null)
    const [productCategory, setProductCategory] = useState(null)
    const [productImages, setProductImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])

    const [categoryName, setCategoryName] = useState(null)
    const [message, setMessage] = useState('')

    const getMinDate = () => {
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() + 5)
        return currentDate.toISOString().slice(0, 16)
    }

    useEffect(() => {
        if (location.state && location.state.categoryID){
            setProductCategory(location.state.categoryID)
            setCategoryName(location.state.categoryName)
            dispatch(listBrands())
        }else{
            navigate('/product/upload')
        }
    }, [location.state, navigate, dispatch])

    const handleFileChange = (e) =>{
        if (e.target.files.length > 12) {
            setMessage('You can only upload up to 12 images.')
            e.target.value = null
            setPreviewImages([])
        }else {

            setMessage(null)

            const imagesArray = Array.from(e.target.files)
            setProductImages(imagesArray)

            const previews = imagesArray.map((file) => {
                return URL.createObjectURL(file)
            })
            setPreviewImages(previews)
        }
    }

    const submitHandler = (e) =>{
        e.preventDefault()

        const formData = new FormData()
        formData.append('brand', productBrand);
        formData.append('useStatus', productStatus);
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('price', productPrice);
        formData.append('province', productProvince);
        formData.append('district', productDistrict);
        formData.append('endDate', productEndDate);
        formData.append('category', productCategory);
        formData.append('userID', userInfo._id);

        for (const image of productImages){
            formData.append('images', image)
        }

        dispatch(publishProduct(formData))
    }

    useEffect(() => {
        if(productPublishSuccess){
            dispatch(productPublishReset())
            navigate(
                `/product/${product.slug}-p-${product._id}`
            )
        }
    }, [productPublishSuccess, dispatch, product, navigate]);

    return (
        <>
            {loading ? loading && <Loader />
            : 
            <Row>
                {error && <Message variant={'danger'}>{error}</Message>}
                <FormContainer>
                    <Row className='rounded shadow p-4'>
                        <Col className='h1 text-center border-bottom pb-3'>Product Publishing</Col>
                        <Form onSubmit={submitHandler}>
                            <Row>
                                <FormGroup className='my-2' controlId='brand'>
                                    <FormLabel className='ms-2 fw-semibold'>Brand</FormLabel>
                                    <FormSelect
                                        required
                                        type='brand'
                                        value={productBrand}
                                        onChange={(e) => setProductBrand(e.target.value)}
                                    >
                                        <option />
                                        {brands.map((brand) => (
                                            <option value={brand._id}>{brand.name}</option>
                                        ))}
                                    </FormSelect>
                                </FormGroup>

                                <FormGroup className='my-2' controlId='brand'>
                                    <FormLabel className='ms-2 fw-semibold'>Category</FormLabel>
                                    <FormSelect
                                        type='category'
                                        disabled
                                    >
                                        <option>{categoryName}</option>
                                    </FormSelect>
                                </FormGroup>

                                <FormGroup className='mt-2' controlId='status'>
                                    <FormLabel className='ms-2 fw-semibold'>Used Year</FormLabel>
                                    <FormSelect
                                        required
                                        type='status'
                                        value={productStatus}
                                        onChange={(e) => setProductStatus(e.target.value)}
                                    >
                                        <option />
                                        <option value={'Not Used'}>Not Used</option>
                                        <option value={'0-1'}>0-1</option>
                                        <option value={'1-3'}>1-3</option>
                                        <option value={'3-5'}>3-5</option>
                                        <option value={'5+'}>5+</option>
                                    </FormSelect>
                                </FormGroup>
                            </Row>
                            
                            <Row className='my-2 border-bottom pb-4'>
                                <FormGroup className='my-2' controlId='name'>
                                    <FormLabel className='ms-2 fw-semibold'>Product Name</FormLabel>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Product Name"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup className='my-2' controlId='description'>
                                    <FormLabel className='ms-2 fw-semibold'>Product Description</FormLabel>
                                    <Form.Control
                                        required
                                        as={'textarea'}
                                        type="textarea"
                                        value={productDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup className='mt-2' controlId='endDate'>
                                    <FormLabel className='ms-2 fw-semibold'>Product End Date</FormLabel>
                                    <Form.Control
                                        required
                                        type="datetime-local"
                                        min={getMinDate()}
                                        value={productEndDate}
                                        onChange={(e) => setProductEndDate(e.target.value)}
                                    />
                                </FormGroup>
                            </Row>

                            <Row className='my-2 border-bottom pb-3'>
                                <FormGroup className='my-2' controlId='price'>
                                    <FormLabel className='ms-2 fw-semibold'>Product Price</FormLabel>
                                    <InputGroup>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control
                                            required
                                            type="number"
                                            maxLength={8}
                                            value={productPrice}
                                            onChange={(e) => setProductPrice(e.target.value)}
                                            inputMode='numeric'
                                            min={1}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Row>

                            
                            <Row className='my-2 border-bottom pb-3 justify-content-center'>
                                <Row>
                                    <FormGroup className='my-2' controlId='file'>
                                        <FormLabel className='ms-2 fw-semibold'>Product Images</FormLabel>
                                        <Form.Control
                                            required
                                            className={message ? 'mb-3 custom-file-input' : 'custom-file-input'}
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            accept="image/jpeg,image/png,image/gif"
                                            htmlSize={100}
                                        />
                                        {message && <Message variant={'danger'}>{message}</Message>}
                                    </FormGroup>
                                </Row>

                                { previewImages ?
                                <Row className="mt-2">
                                    {previewImages.map((preview, index) => (
                                        <Col key={index} md={3} className="my-2">
                                            <Figure.Image
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            width={100}
                                            height={100}
                                            className="img-thumbnail shadow-sm" />
                                            {index === 0 ?
                                            <Figure.Caption>Product Cover</Figure.Caption>
                                            : ''
                                            }
                                        </Col>
                                    ))}
                                </Row>
                                : ''
                                }
                            </Row>

                            <Row className='my-2'>
                                <FormGroup className='my-2' controlId='province'>
                                    <FormLabel className='ms-2 fw-semibold'>Province</FormLabel>
                                    <FormSelect
                                        required
                                        type='province'
                                        value={productProvince}
                                        onChange={(e) => setProductProvince(e.target.value)}
                                    >
                                        <option />
                                        {provinces.map((province) => (
                                            <option value={province.name}>{province.name}</option>
                                        ))}
                                    </FormSelect>
                                </FormGroup>

                                { productProvince && productProvince ?
                                <FormGroup className='my-2' controlId='district'>
                                    <FormLabel className='ms-2 fw-semibold'>District</FormLabel>
                                    <FormSelect
                                        required
                                        type='district'
                                        value={productDistrict}
                                        onChange={(e) => setProductDistrict(e.target.value)}
                                    >
                                        <option />
                                        {provinces.find((province) => province.name === productProvince).districts.map((district) => (
                                            <option value={district.name}>{district.name}</option>
                                        ))}
                                    </FormSelect>
                                </FormGroup>
                                : ''
                                }
                            </Row>
                            
                            <Row className='justify-content-center mt-2'>
                                <Button type='submit' variant='dark' className='my-2 shadow-sm w-25'>
                                    Publish now
                                </Button>
                            </Row>
                        </Form>
                    </Row>
                </FormContainer>
            </Row>
            }
        </>
    )
}

export default ProductAttr
