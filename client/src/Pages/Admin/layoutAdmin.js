import "./admin.scss";

import Sidebar from "../../Components/admin/Sidebar";

function LayoutAdmin() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
      </div>
    </div>
  );
}

export default LayoutAdmin;
