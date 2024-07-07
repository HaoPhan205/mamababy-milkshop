import React, { useEffect, useState } from "react";
import "./SearchResultPage.scss";
import { Breadcrumb, ConfigProvider, Dropdown, Space } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";
import FilterComponent from "../../Components/filterComponent/FilterComponent";
import ProductCard from "../../Components/productCard/ProductCard";
import api from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";

const sortOptions = [
  { label: "Most Relevant", key: "0" },
  { label: "Most Reviewed", key: "1" },
  { label: "Highest Rated", key: "2" },
  { label: "Newest", key: "3" },
  { label: "Lowest Price", key: "4" },
  { label: "Highest Price", key: "5" },
];

const SearchResultPage = () => {
  const [activeFilters, setActiveFilters] = useState({
    BrandMilk: false,
    Company: false,
    Country: false,
    AgeRange: false,
  });
  const [filterOptions, setFilterOptions] = useState({
    BrandMilk: [],
    Company: [],
    Country: [],
    AgeRange: [],
  });

  const [lsProducts, setLsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  const nav = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const searchTerm = query.get("search") || "";
  const [sortOption, setSortOption] = useState("0");

  const handleActiveFilter = (filterName) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handleSortChange = ({ key }) => {
    setSortOption(key);
  };

  const handleItemClick = (productItemId) => {
    nav(`/productitems/${productItemId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/productitems");
        setLsProducts(response.data.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchFilters = async () => {
      try {
        const [brandMilkRes, companyRes, countryRes, ageRangeRes] =
          await Promise.all([
            api.get("/api/brandmilks"),
            api.get("/api/companies"),
            api.get("/api/countries"),
            api.get("/api/age-ranges"),
          ]);

        const brandMilkData = brandMilkRes.data.data || [];
        const companyData = companyRes.data.data || [];
        const countryData = countryRes.data.data || [];
        const ageRangeData = ageRangeRes.data.data || [];

        const companyMap = companyData.reduce((map, company) => {
          map[company.companyID] = company;
          return map;
        }, {});

        const countryMap = countryData.reduce((map, country) => {
          map[country.countryId] = {
            ...country,
            companies: []
          };
          return map;
        }, {});

        brandMilkData.forEach((brand) => {
          const company = companyMap[brand.companyID];
          if (company) {
            company.brands = company.brands || [];
            company.brands.push({
              label: brand.brandName,
              value: brand.brandName
            });
          }
        });

        companyData.forEach((company) => {
          const country = countryMap[company.countryID];
          if (country) {
            country.companies.push({
              label: company.companyName,
              value: company.companyName,
              children: company.brands || []
            });
          }
        });

        const countryOptions = Object.values(countryMap).map((country) => ({
          label: country.countryName,
          value: country.countryId,
          children: country.companies
        }));

        const ageRangeOptions = ageRangeData.map((item) => ({
          label: item.baby || item.mama,
          value: item.productItemID,
        }));

        setFilterOptions({
          BrandMilk: countryOptions,
          Company: [],
          Country: [],
          AgeRange: ageRangeOptions,
        });
      } catch (err) {
        setError(err);
      }
    };

    fetchProducts();
    fetchFilters();
  }, []);

  useEffect(() => {
    if (Array.isArray(lsProducts)) {
      const filteredProducts = lsProducts.filter((product) =>
        product.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const sorted = sort(filteredProducts, sortOption);
      setSortedProducts(sorted);
    }
  }, [lsProducts, searchTerm, sortOption]);

  const sort = (products, sortOption) => {
    switch (sortOption) {
      case "1":
        return [...products].sort((a, b) => b.reviews - a.reviews); // Most Reviewed
      case "2":
        return [...products].sort((a, b) => b.averageRating - a.averageRating); // Highest Rated
      case "3":
        return [...products].sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        ); // Newest
      case "4":
        return [...products].sort((a, b) => a.price - b.price); // Lowest Price
      case "5":
        return [...products].sort((a, b) => b.price - a.price); // Highest Price
      default:
        return products; // Most Relevant or default
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="search-title-bar">
        <Breadcrumb
          style={{
            margin: "16px 0",
            fontSize: "18px",
            fontWeight: "500",
          }}
          items={[
            {
              title: <Link to={"/"}>Trang chủ</Link>,
            },
            {
              title: "Cửa hàng",
            },
          ]}
        />
        <h1 style={{ fontWeight: "500", marginTop: "1em" }}>Cửa hàng</h1>
      </div>
      <div className="container search-result">
        <div className="filters">
          <div className="filter-title">
            <h3>Bộ lọc tìm kiếm</h3>
            <ConfigProvider theme={{ token: { marginXS: 4 } }}>
              <Dropdown
                menu={{
                  items: sortOptions,
                  onClick: handleSortChange,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="filters-title-item">
                    Sort <IoMdArrowDropdown />
                  </Space>
                </a>
              </Dropdown>
            </ConfigProvider>
          </div>
          {Object.entries(filterOptions).map(([filterName, options]) => (
            <FilterComponent
              key={filterName}
              title={filterName}
              options={options}
              activeFilter={activeFilters[filterName]}
              handleActiveFilter={() => handleActiveFilter(filterName)}
            />
          ))}
        </div>
        <div className="search-result-item">
          <h2>{sortedProducts.length} Sản phẩm</h2>
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onClick={() => handleItemClick(product.productId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
