import { Button, Col, Modal, Row, Steps } from 'antd';
import React, { useRef, useState } from 'react';
import BasicInfoForm from '../../../components/createNewCourse/BasicInfoForm';
import CurriculumForm from '../../../components/createNewCourse/CurriculumForm';
import MediaForm from '../../../components/createNewCourse/MediaForm';
import PriceForm from '../../../components/createNewCourse/PriceForm';
import Publish from '../../../components/createNewCourse/Publish';
import useNotification from '../../../hook/useNotification';
import './CreateNewCourse.scss';

const { Step } = Steps;
const { confirm } = Modal;

const steps = [
  {
    title: 'Basic',
    content: (formikRef, onNext) => <BasicInfoForm ref={formikRef} onNext={onNext} />,
  },
  {
    title: 'Curriculum',
    content: (formikRef, onNext, curriculumRef) => <CurriculumForm ref={curriculumRef} />,
  },
  {
    title: 'Media',
    content: () => <MediaForm />,
  },
  {
    title: 'Price',
    content: () => <PriceForm />,
  },
  {
    title: 'Publish',
    content: () => <Publish />,
  },
];

const CreateNewCourse = () => {
  const [current, setCurrent] = useState(0);
  const formikRef = useRef(null);
  const curriculumRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { alertSuccess, alertFail } = useNotification();

  const next = () => {
    if (current === 0) {
      formikRef.current.submitForm();
    } else if (current === 1) {
      if (curriculumRef.current.validateCurriculum()) {
        setCurrent(current + 1);
      } else {
        setIsModalVisible(true);
      }
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => setCurrent(current - 1);

  const onNext = () => {
    setCurrent(current + 1);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleDone = () => {
    confirm({
      title: 'Do you want to create the course ?',
      onOk() {
        alertSuccess("Your course has been created! You will be moved to the Course Management Page in 2 seconds.");
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const buttonStyle = {
    backgroundColor: '#ff4500',
    borderColor: '#ff4500',
    color: '#fff',
  };

  return (
    <div className="create-new-course">
      <div className="create-course-container">
        <div className="create-course-title">
          <h2>Create New Course</h2>
        </div>
        <Steps current={current} className="custom-steps">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content(formikRef, onNext, curriculumRef)}</div>
        <Row className="steps-action" justify="space-between">
          <Col>
            {current > 0 && (
              <Button onClick={() => prev()} style={buttonStyle}>
                Previous
              </Button>
            )}
          </Col>
          <Col>
            {current < steps.length - 1 && (
              <Button type="primary" className="custom-next-button" onClick={() => next()} style={buttonStyle}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" className="custom-next-button" onClick={handleDone} style={buttonStyle}>
                Done
              </Button>
            )}
          </Col>
        </Row>
      </div>
      <Modal
        title={<span style={{ color: '#ff4500' }}>Validation Error</span>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        okButtonProps={{ style: { backgroundColor: '#ff4500', borderColor: '#ff4500' } }}
      >
        <p>Please ensure there is at least one section with one lecture.</p>
      </Modal>
    </div>
  );
};

export default CreateNewCourse;
