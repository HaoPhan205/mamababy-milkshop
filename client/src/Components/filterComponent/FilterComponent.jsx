import React from "react";
import { Checkbox, ConfigProvider } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./FilterComponent.scss";

const FilterComponent = ({
  title,
  options,
  activeFilter,
  handleActiveFilter,
  onChange,
}) => {
  return (
    <div className="filter">
      <div className="filter-items">
        <div className="item-filter">
          <h3 className="filter-name">{title}</h3>
          <button className="filter-btn" onClick={handleActiveFilter}>
            {activeFilter ? <FaMinus /> : <FaPlus />}
          </button>
        </div>
      </div>
      <div className={`item-checkbox ${activeFilter ? "active" : ""}`}>
        <ConfigProvider
          theme={{
            token: {
              borderRadiusSM: 10,
              paddingXS: 15,
              fontSize: 18,
            },
          }}
        >
          <Checkbox.Group
            options={options}
            onChange={onChange}
            className="checkbox-group"
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default FilterComponent;
