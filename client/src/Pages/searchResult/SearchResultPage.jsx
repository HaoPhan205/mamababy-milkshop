import React, { useState, useEffect, useCallback } from "react";
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
  Spin,
  Alert,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import api from "../../config/axios";
import icon1 from "../../Assets/ticker-cute-1.png";
import icon2 from "../../Assets/ticker-cute-2.png";
import ProductCard from "../../Components/productCard/ProductCard";

const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const SearchResultPage = ({ user }) => {
  const navigate = useNavigate();

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
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const itemsPerPage = 16;
  const columns = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [productResponse, brandResponse, countryResponse, companyResponse] =
        await Promise.all([
          api.get("/api/productitems"),
          api.get("/api/brandmilks"),
          api.get("/api/countries"),
          api.get("/api/companies"),
        ]);

      setProducts(productResponse.data);
      setFilteredProducts(productResponse.data);
      setBrands(
        brandResponse.data.sort((a, b) =>
          a.brandName.localeCompare(b.brandName)
        )
      );
      setCountries(
        countryResponse.data.sort((a, b) =>
          a.countryName.localeCompare(b.countryName)
        )
      );
      setCompanies(
        companyResponse.data.sort((a, b) =>
          a.companyName.localeCompare(b.companyName)
        )
      );
    } catch (err) {
      setError(err);
      message.error("Đã có lỗi xảy ra khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        selectedCountry.length
          ? selectedCountry.includes(product.countryName)
          : true
      )
      .filter((product) =>
        selectedCompany.length
          ? selectedCompany.includes(product.companyName)
          : true
      )
      .filter(
        (product) =>
          product.total >= priceRange[0] && product.total <= priceRange[1]
      );

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "ascend") return a.total - b.total;
      if (sortOrder === "descend") return b.total - a.total;
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

  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <Alert message="Lỗi" description={error.message} type="error" showIcon />
    );

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
        <span> / </span>
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
              <Checkbox.Group
                options={countries.map((country) => ({
                  label: country.countryName,
                  value: country.countryName,
                }))}
                onChange={handleCountryChange}
                style={{ display: "flex", flexDirection: "column" }}
              />
            </Panel>
            <Panel header="Công ty" key="3">
              <Checkbox.Group
                options={companies.map((company) => ({
                  label: company.companyName,
                  value: company.companyName,
                }))}
                onChange={handleCompanyChange}
                style={{ display: "flex", flexDirection: "column" }}
              />
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
