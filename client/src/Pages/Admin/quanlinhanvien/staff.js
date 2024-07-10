import Sidebar from "../../../Components/admin/Sidebar";
import "../admin.scss";
import Staffs from "./quanlistaff";

function Staff() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <Staffs />
      </div>
    </div>
  );
}

export default Staff;
