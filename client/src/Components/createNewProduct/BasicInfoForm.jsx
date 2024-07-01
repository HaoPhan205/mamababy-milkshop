import { Col, Form, Input, Row, Select, Typography } from "antd";
import { useFormik } from "formik";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useReducer,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import "./BasicInfoForm.scss";

const { Option } = Select;
const { Title } = Typography;

const validationSchema = Yup.object().shape({
  courseTitle: Yup.string()
    .required("Course title is required")
    .max(100, "Maximum length is 100 characters"),
  shortDescription: Yup.string()
    .required("Short description is required")
    .max(220, "Maximum length is 220 words"),
  courseDescription: Yup.string().required("Course description is required"),
  learnings: Yup.string().required("This field is required"),
  requirements: Yup.string().required("This field is required"),
  level: Yup.string().required("Course level is required"),
  audioLanguage: Yup.string().required("Audio language is required"),
  captionLanguage: Yup.string().required("Caption language is required"),
  category: Yup.string().required("Course category is required"),
});

const initialState = {
  courseTitle: "",
  shortDescription: "",
  courseDescription: "",
  learnings: "",
  requirements: "",
  level: "",
  audioLanguage: "",
  captionLanguage: "",
  category: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const BasicInfoForm = forwardRef((props, ref) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const savedState = localStorage.getItem("formState");
    return savedState ? JSON.parse(savedState) : initial;
  });

  useEffect(() => {
    localStorage.setItem("formState", JSON.stringify(state));
  }, [state]);

  const formik = useFormik({
    initialValues: state,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (props.onNext) {
        props.onNext(values);
      }
    },
  });

  useEffect(() => {
    Object.keys(state).forEach((key) => {
      formik.setFieldValue(key, state[key], false);
    });
  }, [state]);

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formik.handleSubmit();
    },
  }));

  const handleFieldChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
    formik.setFieldValue(field, value);
  };

  return (
    <div className="basic-info-form">
      <Title level={4}>Basic Information</Title>
      <Form layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Course Title*"
              help={
                formik.touched.courseTitle && formik.errors.courseTitle
                  ? formik.errors.courseTitle
                  : ""
              }
              validateStatus={
                formik.touched.courseTitle && formik.errors.courseTitle
                  ? "error"
                  : ""
              }
              required
            >
              <Input
                placeholder="Course title here"
                maxLength={100}
                name="courseTitle"
                value={formik.values.courseTitle}
                onChange={(e) =>
                  handleFieldChange("courseTitle", e.target.value)
                }
                onBlur={formik.handleBlur}
              />
              <div className="character-count">60</div>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Short Description*"
              help={
                formik.touched.shortDescription &&
                formik.errors.shortDescription
                  ? formik.errors.shortDescription
                  : ""
              }
              validateStatus={
                formik.touched.shortDescription &&
                formik.errors.shortDescription
                  ? "error"
                  : ""
              }
              required
            >
              <ReactQuill
                value={formik.values.shortDescription}
                onChange={(val) => handleFieldChange("shortDescription", val)}
                onBlur={formik.handleBlur}
              />
              <div className="word-count">220 words</div>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Course Description*"
              help={
                formik.touched.courseDescription &&
                formik.errors.courseDescription
                  ? formik.errors.courseDescription
                  : ""
              }
              validateStatus={
                formik.touched.courseDescription &&
                formik.errors.courseDescription
                  ? "error"
                  : ""
              }
              required
            >
              <ReactQuill
                value={formik.values.courseDescription}
                onChange={(val) => handleFieldChange("courseDescription", val)}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="What will students learn in your course?*"
              help={
                formik.touched.learnings && formik.errors.learnings
                  ? formik.errors.learnings
                  : ""
              }
              validateStatus={
                formik.touched.learnings && formik.errors.learnings
                  ? "error"
                  : ""
              }
              required
            >
              <ReactQuill
                value={formik.values.learnings}
                onChange={(val) => handleFieldChange("learnings", val)}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Requirements*"
              help={
                formik.touched.requirements && formik.errors.requirements
                  ? formik.errors.requirements
                  : ""
              }
              validateStatus={
                formik.touched.requirements && formik.errors.requirements
                  ? "error"
                  : ""
              }
              required
            >
              <ReactQuill
                value={formik.values.requirements}
                onChange={(val) => handleFieldChange("requirements", val)}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Course Level*"
              help={
                formik.touched.level && formik.errors.level
                  ? formik.errors.level
                  : ""
              }
              validateStatus={
                formik.touched.level && formik.errors.level ? "error" : ""
              }
              required
            >
              <Select
                placeholder="Select level"
                name="level"
                value={formik.values.level}
                onChange={(val) => handleFieldChange("level", val)}
                onBlur={formik.handleBlur}
              >
                <Option value="beginner">Beginner</Option>
                <Option value="intermediate">Intermediate</Option>
                <Option value="advanced">Advanced</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Audio Language*"
              help={
                formik.touched.audioLanguage && formik.errors.audioLanguage
                  ? formik.errors.audioLanguage
                  : ""
              }
              validateStatus={
                formik.touched.audioLanguage && formik.errors.audioLanguage
                  ? "error"
                  : ""
              }
              required
            >
              <Select
                placeholder="Select audio language"
                name="audioLanguage"
                value={formik.values.audioLanguage}
                onChange={(val) => handleFieldChange("audioLanguage", val)}
                onBlur={formik.handleBlur}
              >
                <Option value="english">English</Option>
                <Option value="spanish">Spanish</Option>
                <Option value="french">French</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Close Caption*"
              help={
                formik.touched.captionLanguage && formik.errors.captionLanguage
                  ? formik.errors.captionLanguage
                  : ""
              }
              validateStatus={
                formik.touched.captionLanguage && formik.errors.captionLanguage
                  ? "error"
                  : ""
              }
              required
            >
              <Select
                placeholder="Select caption language"
                name="captionLanguage"
                value={formik.values.captionLanguage}
                onChange={(val) => handleFieldChange("captionLanguage", val)}
                onBlur={formik.handleBlur}
              >
                <Option value="english">English</Option>
                <Option value="spanish">Spanish</Option>
                <Option value="french">French</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Course Category*"
              help={
                formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : ""
              }
              validateStatus={
                formik.touched.category && formik.errors.category ? "error" : ""
              }
              required
            >
              <Select
                placeholder="Select category"
                name="category"
                value={formik.values.category}
                onChange={(val) => handleFieldChange("category", val)}
                onBlur={formik.handleBlur}
              >
                <Option value="web-development">Web Development</Option>
                <Option value="data-science">Data Science</Option>
                <Option value="graphic-design">Graphic Design</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export default BasicInfoForm;
