import Sidebar from "../../../Components/admin/Sidebar";
import "../admin.scss";
import Quanlidonhang from "./Quanlidonhang";

function Quanlidonhangg() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <Quanlidonhang />
      </div>
    </div>
  );
}

export default Quanlidonhangg;
