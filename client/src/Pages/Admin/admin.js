import "./admin.scss";
import MainDash from "../../Components/admin/MainDash/MainDash";
import Sidebar from "../../Components/admin/Sidebar";

function AdminPage() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <MainDash />
      </div>
    </div>
  );
}

export default AdminPage;
