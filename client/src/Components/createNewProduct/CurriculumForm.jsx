/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { DeleteOutlined, ExclamationCircleOutlined, FileTextOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Form, Input, Modal, Row, Tabs } from 'antd';
import { useFormik } from 'formik';
import React, { forwardRef, useEffect, useImperativeHandle, useReducer } from 'react';
import * as Yup from 'yup';
import './CurriculumForm.scss';

const { confirm } = Modal;

const initialState = {
  sections: [],
  currentSection: '',
  sectionModalOpen: false,
  lectureModalOpen: false,
  editModalOpen: false,
  editItem: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_SECTION':
      return { ...state, sections: [...state.sections, action.section] };
    case 'ADD_LECTURE':
      return {
        ...state,
        sections: state.sections.map(section =>
          section.name === state.currentSection
            ? { ...section, lectures: [...section.lectures, action.lecture] }
            : section
        ),
      };
    case 'EDIT_ITEM':
      const { sectionName, type, index, values } = action.payload;
      if (type === 'sections') {
        return {
          ...state,
          sections: state.sections.map((section, i) =>
            i === index ? { ...section, name: values.sectionName } : section
          ),
        };
      } else {
        return {
          ...state,
          sections: state.sections.map(section =>
            section.name === sectionName
              ? {
                  ...section,
                  [type]: section[type].map((item, i) => (i === index ? values : item)),
                }
              : section
          ),
        };
      }
    case 'DELETE_ITEM':
      const { sectionName: delSectionName, type: delType, index: delIndex } = action.payload;
      if (delType === 'sections') {
        return {
          ...state,
          sections: state.sections.filter((_, i) => i !== delIndex),
        };
      } else {
        return {
          ...state,
          sections: state.sections.map(section =>
            section.name === delSectionName
              ? { ...section, [delType]: section[delType].filter((_, i) => i !== delIndex) }
              : section
          ),
        };
      }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const CurriculumForm = forwardRef((props, ref) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const savedState = localStorage.getItem('curriculumFormState');
    return savedState ? JSON.parse(savedState) : initial;
  });

  useEffect(() => {
    localStorage.setItem('curriculumFormState', JSON.stringify(state));
  }, [state]);

  useImperativeHandle(ref, () => ({
    validateCurriculum: () => {
      if (state.sections.length === 0) {
        return false;
      }
      for (let section of state.sections) {
        if (section.lectures.length === 0) {
          return false;
        }
      }
      return true;
    },
    getSections: () => state.sections,
  }));

  const showSectionModal = () => dispatch({ type: 'SET_FIELD', field: 'sectionModalOpen', value: true });
  const showLectureModal = (section) => {
    dispatch({ type: 'SET_FIELD', field: 'currentSection', value: section });
    dispatch({ type: 'SET_FIELD', field: 'lectureModalOpen', value: true });
  };
  const showEditModal = (item) => {
    dispatch({ type: 'SET_FIELD', field: 'editItem', value: item });
    dispatch({ type: 'SET_FIELD', field: 'editModalOpen', value: true });
  };
  const showDeleteConfirm = (sectionName, type, index) => {
    confirm({
      title: 'Are you sure you want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch({ type: 'DELETE_ITEM', payload: { sectionName, type, index } });
      },
      onCancel() {},
    });
  };

  const handleCancel = () => {
    dispatch({ type: 'SET_FIELD', field: 'sectionModalOpen', value: false });
    dispatch({ type: 'SET_FIELD', field: 'lectureModalOpen', value: false });
    dispatch({ type: 'SET_FIELD', field: 'editModalOpen', value: false });
  };

  const handleAddSection = (values) => {
    dispatch({ type: 'ADD_SECTION', section: { name: values.sectionName, lectures: [], assignments: [] } });
    dispatch({ type: 'SET_FIELD', field: 'sectionModalOpen', value: false });
  };

  const handleAddLecture = (values) => {
    dispatch({ type: 'ADD_LECTURE', lecture: values });
    dispatch({ type: 'SET_FIELD', field: 'lectureModalOpen', value: false });
  };

  const handleEditItem = (values) => {
    dispatch({
      type: 'EDIT_ITEM',
      payload: { ...state.editItem, values },
    });
    dispatch({ type: 'SET_FIELD', field: 'editModalOpen', value: false });
  };

  const buttonStyle = {
    backgroundColor: '#ff4500',
    borderColor: '#ff4500',
    color: '#fff',
  };

  const renderSectionContent = (section) => (
    <>
      {section.lectures.map((lecture, i) => (
        <div key={i} className="curriculum-item">
          <div className="curriculum-item-content">
            <FileTextOutlined /> {lecture.title}
          </div>
          <span className="curriculum-item-icons">
            <FormOutlined onClick={() => showEditModal({ sectionName: section.name, type: 'lectures', index: i })} />
            <DeleteOutlined onClick={() => showDeleteConfirm(section.name, 'lectures', i)} />
          </span>
        </div>
      ))}
      <div className="curriculum-footer">
        <Button icon={<PlusOutlined />} onClick={() => showLectureModal(section.name)} style={buttonStyle}>
          Lecture
        </Button>
      </div>
    </>
  );

  const collapseItems = state.sections.map((section, index) => ({
    key: index.toString(),
    label: section.name,
    children: renderSectionContent(section),
    extra: (
      <div>
        <FormOutlined style={{ marginRight: '8px' }} onClick={() => showEditModal({ sectionName: section.name, type: 'sections', index })} />
        <DeleteOutlined onClick={() => showDeleteConfirm(section.name, 'sections', index)} />
      </div>
    ),
  }));

  const sectionValidationSchema = Yup.object().shape({
    sectionName: Yup.string().required('Section name is required'),
  });

  const lectureValidationSchema = Yup.object().shape({
    title: Yup.string().required('Lecture title is required'),
    description: Yup.string().required('Description is required'),
  });

  const SectionForm = ({ onSubmit, initialValues = { sectionName: '' } }) => {
    const formik = useFormik({
      initialValues,
      validationSchema: sectionValidationSchema,
      onSubmit,
    });

    return (
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item label="Section Name*" required>
          <Input name="sectionName" value={formik.values.sectionName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.sectionName && formik.errors.sectionName ? <div className="error">{formik.errors.sectionName}</div> : null}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={buttonStyle}>{initialValues.sectionName ? 'Edit Section' : 'Add Section'}</Button>
        </Form.Item>
      </Form>
    );
  };

  const LectureForm = ({ onSubmit, initialValues = { title: '', description: '' } }) => {
    const formik = useFormik({
      initialValues,
      validationSchema: lectureValidationSchema,
      onSubmit,
    });

    return (
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item label="Lecture Title*" required>
          <Input name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.title && formik.errors.title ? <div className="error">{formik.errors.title}</div> : null}
        </Form.Item>
        <Form.Item label="Description*" required>
          <Input.TextArea rows={4} name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.description && formik.errors.description ? <div className="error">{formik.errors.description}</div> : null}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={buttonStyle}>Add Lecture</Button>
        </Form.Item>
      </Form>
    );
  };

  const tabItemsLecture = [
    {
      key: '1',
      label: 'Basic',
      children: <LectureForm onSubmit={handleAddLecture} />,
    },
    { key: '2', label: 'Video', children: <p>Video content</p> },
    { key: '3', label: 'Attachments', children: <p>Attachment content</p> },
  ];

  return (
    <div className="curriculum-form">
      <Row justify="space-between" align="middle" className="curriculum-header">
        <Col>
          <h3>Curriculum</h3>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={showSectionModal} style={buttonStyle}>
            New Section
          </Button>
        </Col>
      </Row>
      <Collapse items={collapseItems} />

      <Modal title="New Section" open={state.sectionModalOpen} onCancel={handleCancel} footer={null}>
        <SectionForm onSubmit={handleAddSection} />
      </Modal>

      <Modal title="Add Lecture" open={state.lectureModalOpen} onCancel={handleCancel} footer={null}>
        <Tabs defaultActiveKey="1" items={tabItemsLecture} />
      </Modal>

      {state.editItem && (
        <Modal title="Edit Item" open={state.editModalOpen} onCancel={handleCancel} footer={null}>
          {state.editItem.type === 'lectures' && (
            <LectureForm
              onSubmit={handleEditItem}
              initialValues={state.sections.find(section => section.name === state.editItem.sectionName).lectures[state.editItem.index]}
            />
          )}
          {state.editItem.type === 'sections' && (
            <SectionForm onSubmit={handleEditItem} initialValues={{ sectionName: state.sections[state.editItem.index]?.name }} />
          )}
        </Modal>
      )}
    </div>
  );
});

export default CurriculumForm;
