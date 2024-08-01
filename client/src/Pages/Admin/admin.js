import "./admin.scss";

import Sidebar from "../../Components/admin/Sidebar";
import MonthlyRevenueChart from "./DashboardAdmin/RevenueChart";

function AdminPage() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <MonthlyRevenueChart />
      </div>
    </div>
  );
}

export default AdminPage;
