import Sidebar from "../../../Components/admin/Sidebar";
import "./brandMilk.scss";
import BrandMilksPage from "./thuonghieu";

function BrandMilks() {
  return (
    <div className="Admin">
      <div className="AppGlass">
        <Sidebar />
        <BrandMilksPage />
      </div>
    </div>
  );
}

export default BrandMilks;
