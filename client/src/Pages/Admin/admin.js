import "./admin.scss";

import Sidebar from "../../Components/admin/Sidebar";
import MainDash from "../../Components/admin/MainDash/MainDash";

function AdminPage() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <MainDash />
      </div>
    </div>
  );
}

export default AdminPage;
