import React, { useState, useEffect } from "react";
import "./SearchResultPage.scss";
import {
  Row,
  Col,
  message,
  Pagination,
  Input,
  Select,
  Button,
  Checkbox,
  Collapse,
  Slider,
} from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../../config/axios";
import icon1 from "../../Assets/ticker-cute-1.png";
import icon2 from "../../Assets/ticker-cute-2.png";
import ProductCard from "../../Components/productCard/ProductCard";

const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const SearchResultPage = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]); // Khởi tạo khoảng giá mặc định
  const itemsPerPage = 16;
  const columns = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/productitems");
        const productList = response.data;
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (err) {
        setError(err);
        message.error("Đã có lỗi xảy ra khi tìm kiếm sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await api.get("/api/brandmilks");
        const sortedBrands = response.data.sort((a, b) =>
          a.brandName.localeCompare(b.brandName)
        );
        setBrands(sortedBrands);
      } catch (err) {
        message.error("Đã có lỗi xảy ra khi lấy danh sách thương hiệu.");
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await api.get("/api/countries");
        const sortedCountries = response.data.sort((a, b) =>
          a.countryName.localeCompare(b.countryName)
        );
        setCountries(sortedCountries);
      } catch (err) {
        message.error("Đã có lỗi xảy ra khi lấy danh sách xuất xứ.");
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await api.get("/api/companies");
        const sortedCompanies = response.data.sort((a, b) =>
          a.companyName.localeCompare(b.companyName)
        );
        setCompanies(sortedCompanies);
      } catch (err) {
        message.error("Đã có lỗi xảy ra khi lấy danh sách công ty.");
      }
    };

    fetchProducts();
    fetchBrands();
    fetchCountries();
    fetchCompanies();
  }, []);

  useEffect(() => {
    const filtered = products
      .filter((product) =>
        product.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((product) =>
        selectedBrands.length
          ? selectedBrands.includes(product.brandName)
          : true
      )
      .filter((product) =>
        selectedCountry ? product.country === selectedCountry : true
      )
      .filter((product) =>
        selectedCompany ? product.companyName === selectedCompany : true
      )
      .filter(
        (product) =>
          product.total >= priceRange[0] && product.total <= priceRange[1]
      );

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "ascend") {
        return a.total - b.total;
      } else if (sortOrder === "descend") {
        return b.total - a.total;
      }
      return 0;
    });

    setFilteredProducts(sorted);
  }, [
    searchQuery,
    products,
    sortOrder,
    selectedBrands,
    selectedCountry,
    selectedCompany,
    priceRange,
  ]);

  const handleItemClick = (productItemId) => {
    navigate(`/chi-tiet-san-pham/${productItemId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
    navigate(`?query=${value}`);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const handleBrandChange = (checkedValues) => {
    setSelectedBrands(checkedValues);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSortOrder("default");
    setSelectedBrands([]);
    setSelectedCountry("");
    setSelectedCompany("");
    setPriceRange([0, 10000000]);
    setCurrentPage(1);
    navigate("/cua-hang");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="productsall">
      <div className="shoppingcart">
        <Link style={{ color: "black" }} to="/">
          Trang chủ
        </Link>
        <h>/</h>
        <Link style={{ color: "black" }} to="/cua-hang">
          Cửa hàng
        </Link>
      </div>
      <div className="productsall__title">
        <img src={icon1} alt="" className="icon1" />
        <h1 style={{ padding: "20px" }}>Dành cho bạn</h1>
        <img src={icon2} alt="" className="icon2" />
      </div>

      <div className="search-sort-container">
        <Select
          defaultValue={sortOrder}
          style={{ width: 200 }}
          onChange={handleSortChange}
        >
          <Option value="default">Phù hợp</Option>
          <Option value="ascend">Giá từ thấp đến cao</Option>
          <Option value="descend">Giá từ cao đến thấp</Option>
        </Select>
        <Button onClick={handleReset} style={{ margin: "16px" }}>
          Reset
        </Button>
        <Search
          placeholder="Tìm kiếm sản phẩm"
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: "16px" }}
        />
      </div>

      <div className="product-content">
        <div className="filter-sidebar">
          <Collapse>
            <Panel header="Thương hiệu" key="1">
              <Checkbox.Group
                options={brands.map((brand) => ({
                  label: brand.brandName,
                  value: brand.brandName,
                }))}
                onChange={handleBrandChange}
                style={{ display: "flex", flexDirection: "column" }}
              />
            </Panel>
            <Panel header="Xuất xứ" key="2">
              <Select
                placeholder="Chọn xuất xứ"
                value={selectedCountry}
                onChange={handleCountryChange}
                style={{ width: "100%" }}
              >
                <Option value="">Tất cả xuất xứ</Option>
                {countries.map((country) => (
                  <Option key={country.countryID} value={country.countryName}>
                    {country.countryName}
                  </Option>
                ))}
              </Select>
            </Panel>
            <Panel header="Công ty" key="3">
              <Select
                placeholder="Chọn công ty"
                value={selectedCompany}
                onChange={handleCompanyChange}
                style={{ width: "100%" }}
              >
                <Option value="">Tất cả công ty</Option>
                {companies.map((company) => (
                  <Option key={company.companyID} value={company.companyName}>
                    {company.companyName}
                  </Option>
                ))}
              </Select>
            </Panel>
            <Panel header="Khoảng giá" key="4">
              <Slider
                range
                min={0}
                max={10000000}
                defaultValue={[0, 10000000]}
                onChange={handlePriceRangeChange}
                value={priceRange}
                tipFormatter={(value) => formatCurrency(value)}
                style={{ marginTop: "16px" }}
              />
            </Panel>
          </Collapse>
        </div>
        <div className="product-list">
          <Row gutter={[16, 16]}>
            {currentProducts.map((product) => (
              <Col key={product.productItemId} {...columns}>
                <ProductCard
                  product={product}
                  onClick={() => handleItemClick(product.productItemId)}
                />
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={filteredProducts.length}
            onChange={handlePageChange}
            className="pagination"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
