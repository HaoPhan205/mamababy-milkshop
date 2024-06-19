import React, { useEffect, useState } from "react";
import "./SlideIndex.scss";
import images from "./dataSlide.js";

console.log("Imported images:", images);

export default function SlideIndex({ interval = 3000 }) {
  const [activeStep, setActiveStep] = useState(0);
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const response = await fetch(
  //       "https://6601c3c89d7276a755521e4b.mockapi.io/IMAGE"
  //     );
  //     const data = await response.json();
  //     const loadedItems = data.map((image, index) => (
  //       <img
  //         className="carousel_pic"
  //         key={index}
  //         src={image.img}
  //         alt={`Slide ${index + 1}`}
  //         style={{ width: "100%" }}
  //       />
  //     ));
  //     setItems(loadedItems);
  //   };

  //   fetchImages();
  // }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setActiveStep((prevActiveStep) => (prevActiveStep + 1) % items.length);
  //   }, interval);

  //   return () => clearInterval(timer);
  // }, [items, interval]);

  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      console.log("Images array:", images);
      const loadedItems = images.map((img, index) => (
        <img
          className="carousel_pic"
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          style={{ width: "100%" }}
        />
      ));
      setItems(loadedItems);
    } else {
      console.error("Images is not an array or is empty:", images);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      const timer = setInterval(() => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % items.length);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [items, interval]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % items.length);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep + items.length - 1) % items.length
    );
  };

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        {items.length > 0 ? items[activeStep] : <p>Loading...</p>}
      </div>
      <div className="carousel-controls">
        <button
          onClick={handleBack}
          disabled={items.length <= 1}
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          onClick={handleNext}
          disabled={items.length <= 1}
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </div>
      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === activeStep ? "active" : ""}`}
            onClick={() => setActiveStep(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
