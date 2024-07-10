import Sidebar from "../../../Components/admin/Sidebar";
import "./sanpham.scss";
import ProductQuanli from "./quanlisanpham";

function Sanpham() {
  return (
    <div className="Sanpham">
      <div className="AppGlass-sp">
        <Sidebar />
        <ProductQuanli />
      </div>
    </div>
  );
}

export default Sanpham;
