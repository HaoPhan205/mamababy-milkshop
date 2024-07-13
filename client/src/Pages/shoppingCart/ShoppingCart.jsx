import { Link } from "react-router-dom";
import "./ShoppingCart.scss";
import { Col, Row } from "antd";
import CartList from "../../Components/cartList/CartList";
import CartTotal from "../../Components/cartTotal/CartTotal";
import { useState } from "react";
const style = {
  background: "#ffff",
  padding: "8px 0",
};

function ShoppingCart() {
  const [selectedItems, setSelectedItems] = useState([]);
  // console.log(selectedItems);
  return (
    <div>
      <div className="shoppingcart">
        <Link
          style={{
            color: "black",
          }}
          to="/"
        >
          Trang chủ
        </Link>
        <h>/</h>
        <Link
          style={{
            color: "black",
          }}
        >
          Giỏ hàng
        </Link>
      </div>
      <Row className="cart__list" gutter={16}>
        <Col className="gutter-row" span={17}>
          <div style={style}>
            <CartList
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={7}>
          <div style={style}>
            <CartTotal selectedItems={selectedItems} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ShoppingCart;
