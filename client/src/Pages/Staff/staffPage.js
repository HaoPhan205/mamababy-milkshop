import "../Admin/admin.scss";

import Sidebar from "../../Components/admin/Sidebar";

function StaffPage() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <p>Hello Staff</p>
      </div>
    </div>
  );
}

export default StaffPage;
