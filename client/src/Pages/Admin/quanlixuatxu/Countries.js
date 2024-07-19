import Sidebar from "../../../Components/admin/Sidebar";
import Country from "./CountryManagement";
import "./sanpham.scss";

function Countries() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <Country />
      </div>
    </div>
  );
}

export default Countries;
