import Sidebar from "../../../Components/admin/Sidebar";
import "./RevenuePage.scss";

import RevenuePage from "./doanhthu";

function Revenue() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <RevenuePage />
      </div>
    </div>
  );
}

export default Revenue;
