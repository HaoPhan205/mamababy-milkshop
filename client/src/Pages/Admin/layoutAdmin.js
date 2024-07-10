import { Outlet } from "react-router-dom";
import "./adminLayout.scss";
import Sidebar from "../../Components/admin/Sidebar";

function LayoutAdmin() {
  return (
    <div className="Admin" style={{ zIndex: 1 }}>
      <div className="AppGlass">
        <Sidebar />
        <div className="ContentArea">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin;
