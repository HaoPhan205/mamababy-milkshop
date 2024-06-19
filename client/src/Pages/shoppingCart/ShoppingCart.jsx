import { Link } from "react-router-dom";
import "./ShoppingCart.scss";
import { Col, Row } from "antd";
import CartList from "../../Components/cartList/CartList";
import CartTotal from "../../Components/cartTotal/CartTotal";
const style = {
  background: "#ffff",
  padding: "8px 0",
};

function ShoppingCart() {
  return (
    <div>
      <div className="shoppingcart">
        <Link
          style={{
            color: "black",
          }}
          to="/"
        >
          Home
        </Link>
        <h>/</h>
        <Link
          style={{
            color: "black",
          }}
        >
          Shopping Cart
        </Link>
      </div>
      <Row className="cart__list" gutter={16}>
        <Col className="gutter-row" span={17}>
          <div style={style}>
            <CartList />
          </div>
        </Col>
        <Col className="gutter-row" span={7}>
          <div style={style}>
            <CartTotal />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ShoppingCart;
