import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Input,
  Modal,
  message,
} from "antd";
import Slider from "react-slick";
import api from "../../config/axios";
import "./ProductInfo.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
} from "../../store/reduxReducer/cartSlice";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

const { Title, Paragraph, Text } = Typography;

const ProductInfo = () => {
  const { productItemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const carts = useSelector((state) => state.cart).products;
  const [newQuantity, setNewQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/productitems/${productItemId}`);
        setProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productItemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAddToCart = () => {
    const quantity = newQuantity === "" ? 0 : parseInt(newQuantity, 10);
    dispatch(addToCart({ ...product, quantity }));
    message.success("Đã thêm sản phẩm vào giỏ hàng.");
  };

  // const item = carts.find(
  //   (cartItem) => cartItem.productItemId === productItemId
  // ) || { quantity: 1, price: 0, discount: 0, total: 0 };

  const handleBuyNow = () => {
    const token = Cookies.get("token");

    if (!token) {
      showModal();
    } else {
      dispatch(addToCart({ ...product, quantity: newQuantity }));

      navigate("/shoppingCart");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/sign-in");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleIncreaseQuantity = (productItemId) => {
    if (newQuantity < product.stockQuantity) {
      setNewQuantity(newQuantity + 1);
      dispatch(increaseQuantity({ productItemId }));
    } else {
      message.warning("Số lượng không thể vượt quá hàng tồn kho.");
    }
  };

  const handleDecreaseQuantity = (productItemId) => {
    if (newQuantity > 1) {
      setNewQuantity(newQuantity - 1);
      dispatch(decreaseQuantity({ productItemId }));
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    if (value <= product.stockQuantity && value > 0) {
      setNewQuantity(value);
      dispatch(updateQuantity({ productItemId, quantity: value }));
    } else if (value > product.stockQuantity) {
      message.warning("Số lượng không thể vượt quá hàng tồn kho.");
    } else if (value <= 0) {
      message.warning("Số lượng phải lớn hơn 0.");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Card className="product-detail">
      <Row gutter={[16, 16]} className="product-header">
        <Col xs={24} md={6} className="product-media">
          {product && (
            <Slider {...settings}>
              {product.image1 && (
                <div>
                  <img src={product.image1} alt={product.itemName} />
                </div>
              )}
              {product.image2 && (
                <div>
                  <img src={product.image2} alt={product.itemName} />
                </div>
              )}
              {product.image3 && (
                <div>
                  <img src={product.image3} alt={product.itemName} />
                </div>
              )}
            </Slider>
          )}
        </Col>
        <Col xs={24} md={16} className="product-info">
          <Title level={2} className="product-title">
            {product?.itemName}
          </Title>
          <Paragraph style={{ color: "black" }}>{product?.benefit}</Paragraph>
          <div className="info-container">
            <Text className="total-textinfo">
              {formatCurrency(product.total)}
            </Text>
            <br />
            <Text className="price-textinfo" delete>
              {formatCurrency(product.price)}
            </Text>
            {product.discount > 0 && (
              <Text type="danger" className="discount-textinfo">
                {" "}
                -{product.discount}%
              </Text>
            )}
          </div>

          <div className="product-stats">
            Số lượng{"  "}
            <Button
              type="text"
              icon={<MinusOutlined />}
              onClick={() => handleDecreaseQuantity(productItemId)}
              className="quantity"
            />
            <Input
              className="quantity-input"
              type="text"
              min="0"
              value={newQuantity}
              onChange={handleQuantityChange}
            />
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={() => handleIncreaseQuantity(productItemId)}
              className="quantity"
            />
          </div>

          <div className="product-stats">
            Còn {product?.stockQuantity} sản phẩm
          </div>

          <div className="product-actions">
            <Button
              type="primary"
              className="add-to-cart"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button type="default" className="buy-now" onClick={handleBuyNow}>
              Mua ngay
            </Button>
          </div>

          <div className="guarantee">Đã bán {product?.soldQuantity}</div>
        </Col>
      </Row>
      <Modal
        title="Đăng nhập"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn cần đăng nhập để mua hàng</p>
      </Modal>
    </Card>
  );
};

export default ProductInfo;
