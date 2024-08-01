import "../admin.scss";
import MainDash from "../../../Components/admin/MainDash/MainDash";
import MonthlyRevenueChart from "./RevenueChart";

function AdminDashboard() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <MainDash />
        <MonthlyRevenueChart />
      </div>
    </div>
  );
}

export default AdminDashboard;
