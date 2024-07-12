import Sidebar from "../../../Components/admin/Sidebar";
import "./sanpham.scss";
import ProductQuanli from "./quanlisanpham";

function Sanpham() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <ProductQuanli />
      </div>
    </div>
  );
}

export default Sanpham;
