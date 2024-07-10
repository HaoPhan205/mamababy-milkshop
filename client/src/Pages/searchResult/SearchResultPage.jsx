import React, { useState, useEffect } from "react";
import "./SearchResultPage.scss";
import { Row, Col, message, Pagination } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../config/axios";
import icon1 from "../../Assets/ticker-cute-1.png";
import icon2 from "../../Assets/ticker-cute-2.png";

import ProductCard from "../../Components/productCard/ProductCard";

const SearchResultPage = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of products per page
  const columns = { xs: 24, sm: 12, md: 8, lg: 8, xl: 4 }; // Number of columns in a row

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/productitems", {
          params: {
            page: currentPage,
            pageSize: itemsPerPage,
            query: location.search,
          },
        });
        setProducts(response.data); // Set products to fetched data
      } catch (err) {
        setError(err);
        message.error("Đã có lỗi xảy ra khi tìm kiếm sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, location.search]);

  const handleItemClick = (productItemId) => {
    navigate(`/chi-tiet-san-pham/${productItemId}`);
  };

  const handleAddToCart = (productId) => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    console.log("Product added to cart:", productId);
    // Add logic here to add product to cart
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="productsall">
      <div className="productsall__title">
        <img src={icon1} alt="" className="icon1" />
        <h1 style={{ padding: "20px" }}>Dành cho bạn</h1>
        <img src={icon2} alt="" className="icon2" />
      </div>

      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.productItemId} {...columns}>
            <ProductCard
              product={product}
              onClick={() => handleItemClick(product.productItemId)}
              onAddToCart={() => handleAddToCart(product.productItemId)}
            />
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={products.length}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default SearchResultPage;
