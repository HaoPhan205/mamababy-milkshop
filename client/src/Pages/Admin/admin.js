import "./admin.scss";
import MainDash from "../../Components/admin/MainDash/MainDash";
import RightSide from "../../Components/admin/RigtSide/RightSide";
import Sidebar from "../../Components/admin/Sidebar";

function AdminPage() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <MainDash />
        <RightSide />
      </div>
    </div>
  );
}

export default AdminPage;
