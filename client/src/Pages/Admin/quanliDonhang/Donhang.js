import Sidebar from "../../../Components/admin/Sidebar";
import "../admin.scss";
import OrderManagement from "./OrderManagement";

function Quanlidonhangg() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <OrderManagement />
      </div>
    </div>
  );
}

export default Quanlidonhangg;
