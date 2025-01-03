import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "./singleProduct.css";

import searchProductService from '../../appWrite/searchProduct.js';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import SingleProductSearchBar from './singleProductSearchBar.jsx';
import LoadingSingleProduct from "../loading/loadingSingleProduct.jsx";

import { fetchShopById } from '../../redux/features/singleShopSlice.jsx';


const ProductDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.searchproducts);
    const { shops } = useSelector((state) => state.searchshops);
    const { singleShops } = useSelector((state) => state.singleshops);

        
    
    const { productId } = useParams();

    const [loading, setLoading] = useState(true);
    const [productDetail, setProductDetails] = useState(null);
    const [shopDetail, setShopDetail] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            let product = products.find((product) => product.$id === productId);
           
            if (product) {
                setProductDetails(product);
                setSelectedImage(product.images[0] || 'http://res.cloudinary.com/dthelgixr/image/upload/v1727870088/hd7kcjuz8jfjajnzmqkp.webp');
                fetchShopDetails(product.shop); // Fetch shop details if the shopId is available
            } else {
                try {
                    const response = await searchProductService.getProductById(productId);
                    if (response) {
                        setProductDetails(response);
                        setSelectedImage(response.images[0] || 'http://res.cloudinary.com/dthelgixr/image/upload/v1727870088/hd7kcjuz8jfjajnzmqkp.webp');
                        fetchShopDetails(response.shop); // Fetch shop details based on product's shopId
                    }
                } catch (error) {
                    console.error("Error fetching product details: ", error);
                    navigate('/404');
                }
            }
            setLoading(false);
        };

        const fetchShopDetails = async (shopId) => {
            if (!shopId) return;
            const combinedShops = [...shops, ...singleShops];
            const shop = combinedShops.find((shop) => shop.$id === shopId);

            if (shop) {
                setShopDetail(shop);
            } else {
                try {
                    const response = await dispatch(fetchShopById(shopId));
                    if (response) {
                        setShopDetail(response.payload);
                    }
                } catch (error) {
                    console.error("Error fetching shop details: ", error);
                }
            }
        };

        fetchProductDetails();
    }, []);

  

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    const handleImageClick = (index) => {
        setSelectedImage(productDetail.images[index]);
    };

    const handleShopClick = () => {
        if (shopDetail) {
            navigate(`/shop/${shopDetail.$id}`);
        }
    };

    return (
        <Fragment>
            <div id='product-details-search-container-top'>
                <SingleProductSearchBar/>
            </div>

            {loading ? (
                <LoadingSingleProduct />
            ) : (
                <Fragment>
                    {productDetail && (
                        <>
                            <div id="product-details-container">
                                <div id="product-details-img">
                                    <img src={selectedImage} alt="Selected Product" id="product-details-img-selected" />
                                </div>
                                <div id="shop-details-thumbnails">
                                    {productDetail.images?.map((image, index) => (
                                        <div
                                            id="shop-details-thumbnail"
                                            key={index}
                                            onClick={() => handleImageClick(index)}
                                            className={selectedImage === image ? "image-select" : "image-unselect"}
                                        >
                                            <div id="shop-details-thumbnail-item"></div>
                                        </div>
                                    ))}
                                </div>

                                <div id="product-details-info">
                                    <span id="product-details-trending-deals">Trending deal</span>
                                    <p id="product-details-pid">Product # {productDetail.$id}</p>
                                    <div id="product-details-title">{productDetail.title}</div>
                                </div>
                                <div id="product-detail-about" onClick={toggleDescription}>
                                    <p>About Product</p>
                                    {showDescription ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
                                </div>

                                <div
                                    id="product-details-see-all-brand-product"
                                    onClick={() => navigate(`/search?query=${productDetail.brand}`)}
                                >
                                    See All {productDetail.brand} Products <MdOutlineKeyboardArrowRight size={11} />
                                </div>

                                <div
                                    id="product-details-shop"
                                    onClick={handleShopClick}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Shop: {shopDetail ? shopDetail?.shopName : 'Loading...'}
                                    <HiOutlineArrowRightStartOnRectangle />
                                </div>

                                <div id="product-details-price-button">
                                    <p>₹{productDetail.price}</p>
                                    <div id={`product-details-price-${productDetail.isInStock ? 'instock' : 'outofstock'}`}>
                                        {productDetail.isInStock ? 'IN STOCK' : 'OUT OF STOCK'}
                                    </div>
                                </div>

                                {showDescription && (
                                    <div id="product-details-description">
                                        Description: {productDetail.description}
                                    </div>
                                )}
                            </div>
                            <div id="product-details-bottom-text">@Bharat Linker 2025</div>
                        </>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;
