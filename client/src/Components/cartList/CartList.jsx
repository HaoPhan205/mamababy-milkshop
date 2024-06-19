import "./CartList.scss";

function CartList() {
  return (
    <div className="Cartlist">
      <img
        src="https://th.bing.com/th/id/OIP.ZvxE_Rk4voG0S4iXH6urvwHaFo?rs=1&pid=ImgDetMain"
        alt="Web Development Bootcamp"
        className=""
        style={{ width: "100px" }} // Adjust width to match the image's proportion
      />
      <div className="text">
        <h2 className="cart__name">The Web Developer Bootcamp</h2>
        <h4 className="cart__categories">Web Development | Python</h4>
        <div className="cart__buy">
          <span>By:</span>
          <span>John Doe</span>
          <span className="price">$10</span>
        </div>
      </div>
      <span className="close__button">x</span> {/* Nút đóng "x" */}
    </div>
  );
}

export default CartList;
