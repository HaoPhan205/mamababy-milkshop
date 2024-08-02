import Sidebar from "../../../Components/admin/Sidebar";
import "../admin.scss";

import CompanyManagement from "./CompanyManagement";

function Company() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <CompanyManagement />
      </div>
    </div>
  );
}

export default Company;
