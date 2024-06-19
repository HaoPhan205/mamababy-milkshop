import "./CartTotal.scss";

function CartTotal() {
  return (
    <div className="cart-total">
      <h2>Total</h2>
      <hr />
      <div className="cart-total__detail">
        <div className="cart-total__item">
          <span>Orignal Price</span>
          <span>$15</span>
        </div>
        <div className="cart-total__item">
          <span>Discount Price</span>
          <span>$5</span>
        </div>
        <hr />
        <div className="cart-total__item cart-total__total">
          <span>Total</span>
          <span>$10</span>
        </div>

        <button className="cart-total__checkout">Checkout Now</button>
      </div>
    </div>
  );
}

export default CartTotal;
