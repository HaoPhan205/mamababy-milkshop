import {
  Breadcrumb,
  Checkbox,
  ConfigProvider,
  Dropdown,
  Rate,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaRegStar } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../Components/productCard/ProductCard";
import api from "../../config/axios";
import "./SearchResultPage.scss";

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
    Topic: false,
    Level: false,
    Language: false,
    Price: false,
    Features: false,
    Rating: false,
    Duration: false,
    Caption: false,
  });
  const [selectedFilters, setSelectedFilters] = useState({});
  const [lsCourses, setLsCourses] = useState([]);
  const [lsCourseByCat, setLsCourseByCat] = useState([]);
  const [lsCategory, setLsCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedCourses, setSortedCourses] = useState([]);
  const nav = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search") || "";
  const [sortOption, setSortOption] = useState("0");
  const initialCategory = query.get("category") || "";

  const filterOptions = {
    Category: lsCategory.map((category) => ({
      label: category.categoryName,
      value: category.categoryName,
    })),
    Level: [
      { label: "All Levels", value: "All Levels" },
      { label: "Beginner", value: "Beginner" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Expert", value: "Expert" },
    ],
    Language: [
      { label: "English", value: "English" },
      { label: "Español", value: "Español" },
      { label: "Português", value: "Português" },
      { label: "日本語", value: "日本語" },
      { label: "Deutsch", value: "Deutsch" },
      { label: "Türkçe", value: "Türkçe" },
      { label: "हिन्दी", value: "हिन्दी" },
      { label: "Italiano", value: "Italiano" },
      { label: "Polski", value: "Polski" },
      { label: "한국어", value: "한국어" },
      { label: "Tiếng Việt", value: "Tiếng Việt" },
    ],
    Price: [
      { label: "Paid", value: "Paid" },
      { label: "Free", value: "Free" },
    ],
    Features: [
      { label: "Captions", value: "Captions" },
      { label: "Quizzes", value: "Quizzes" },
      { label: "Coding Exercises", value: "Coding Exercises" },
      { label: "Practice Tests", value: "Practice Tests" },
    ],
    Rating: [
      {
        label: (
          <>
            <Rate
              disabled
              character={<FaRegStar />}
              defaultValue={5}
              className="rate-style"
            />{" "}
            5.0 & up
          </>
        ),
        value: "5",
      },
      {
        label: (
          <>
            <Rate
              disabled
              character={<FaRegStar />}
              defaultValue={4}
              className="rate-style"
            />{" "}
            4.0 & up
          </>
        ),
        value: "4",
      },
      {
        label: (
          <>
            <Rate
              disabled
              character={<FaRegStar />}
              defaultValue={3}
              className="rate-style"
            />{" "}
            3.0 & up
          </>
        ),
        value: "3",
      },
      {
        label: (
          <>
            <Rate
              disabled
              character={<FaRegStar />}
              defaultValue={2}
              className="rate-style"
            />{" "}
            2.0 & up
          </>
        ),
        value: "2",
      },
    ],
    Duration: [
      { label: "0-2 Hours", value: "0-2 Hours" },
      { label: "3-6 Hours", value: "3-6 Hours" },
      { label: "7-18 Hours", value: "7-18 Hours" },
      { label: "19+ Hours", value: "19+ Hours" },
    ],
  };

  const handleActiveFilter = (filterName) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handleSortChange = ({ key }) => {
    setSortOption(key);
  };

  const handleItemClick = (courseId) => {
    nav(`/course-detail/${courseId}`);
  };

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/api/productitems");
        setLsCourses(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCoursesByNameCategory = async () => {
      try {
        const formattedSearchTerm = capitalizeWords(searchTerm);
        const response = await api.get(
          `/course/category/courses-by-name/${formattedSearchTerm}`
        );
        setLsCourseByCat(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await api.get("/course/category");
        setLsCategory(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    fetchCoursesByNameCategory();
    fetchCategory();
  }, [searchTerm]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        Category: [initialCategory],
      }));
    }
  }, [initialCategory]);

  const filteredByCategory = (courses, selectedCategory) => {
    if (!selectedCategory || selectedCategory.length === 0) return courses;
    return courses.filter((course) =>
      selectedCategory.includes(course.category.categoryName)
    );
  };

  const filteredByLanguage = (courses, selectedLanguage) => {
    if (!selectedLanguage || selectedLanguage.length === 0) return courses;
    return courses.filter((course) =>
      selectedLanguage.includes(course.language)
    );
  };

  const filteredByRating = (courses, selectedRatings) => {
    if (!selectedRatings || selectedRatings.length === 0) return courses;
    const minRating = Math.min(...selectedRatings);
    return courses.filter((course) => course.averageRating >= minRating);
  };

  const filteredByPrice = (courses, selectedPrice) => {
    if (!selectedPrice || selectedPrice.length === 0) return courses;
    return courses.filter((course) => {
      if (selectedPrice.includes("Paid")) {
        return course.coursePrice > 0;
      }
      if (selectedPrice.includes("Free")) {
        return course.coursePrice === 0;
      }
      return true;
    });
  };

  useEffect(() => {
    const mergeAndDeduplicate = (list1, list2) => {
      const combined = [...list1, ...list2];
      const uniqueCourses = Array.from(
        new Map(combined.map((course) => [course.courseId, course])).values()
      );
      return uniqueCourses;
    };

    if (lsCourses.length > 0 && lsCourseByCat.length > 0) {
      const filteredCourses = lsCourses.filter((course) =>
        course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const combinedCourses = mergeAndDeduplicate(
        filteredCourses,
        lsCourseByCat
      );
      let filteredCoursesByCategory = filteredByCategory(
        combinedCourses,
        selectedFilters.Category
      );
      let filteredCoursesByLanguage = filteredByLanguage(
        filteredCoursesByCategory,
        selectedFilters.Language
      );
      let filteredCoursesByPrice = filteredByPrice(
        filteredCoursesByLanguage,
        selectedFilters.Price
      );
      let filteredCoursesByRating = filteredByRating(
        filteredCoursesByPrice,
        selectedFilters.Rating
      );

      const sorted = sort(filteredCoursesByRating, sortOption);
      setSortedCourses(sorted);
    }
  }, [
    lsCourses,
    lsCourseByCat,
    searchTerm,
    sortOption,
    selectedFilters.Category,
    selectedFilters.Language,
    selectedFilters.Price,
    selectedFilters.Rating,
  ]);

  const sort = (courses, sortOption) => {
    switch (sortOption) {
      case "1":
        return [...courses].sort((a, b) => b.reviews - a.reviews); // Most Reviewed
      case "2":
        return [...courses].sort((a, b) => b.averageRating - a.averageRating); // Highest Rated
      case "3":
        return [...courses].sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        ); // Newest
      case "4":
        return [...courses].sort((a, b) => a.coursePrice - b.coursePrice); // Lowest Price
      case "5":
        return [...courses].sort((a, b) => b.coursePrice - a.coursePrice); // Highest Price
      default:
        return courses; // Most Relevant or default
    }
  };

  const handleFilterChange = (title, selectedValues) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [title]: selectedValues,
    }));
  };

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
              title: <Link to={"/"}>Home</Link>,
            },
            {
              title: "Search Results",
            },
          ]}
        />
        <h1 style={{ fontWeight: "500", marginTop: "1em" }}>Search Results</h1>
      </div>
      <div className="container search-result">
        <div className="filters">
          <div className="filter-title">
            <h3>Filters</h3>
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
              onChange={handleFilterChange}
              selectedFilters={selectedFilters[filterName]}
            />
          ))}
        </div>
        <div className="search-result-item">
          <h2>{sortedCourses.length} Results</h2>
          {sortedCourses.map((course, index) => (
            <ProductCard
              key={index}
              course={course}
              onClick={() => handleItemClick(course.courseId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const FilterComponent = ({
  title,
  options,
  activeFilter,
  handleActiveFilter,
  onChange,
  selectedFilters,
}) => {
  const handleCheckboxChange = (checkedValues) => {
    onChange(title, checkedValues);
  };

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
            onChange={handleCheckboxChange}
            className="checkbox-group"
            value={selectedFilters}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default SearchResultPage;
