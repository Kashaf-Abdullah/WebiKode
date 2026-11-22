import { useState } from 'react';

export default function ImageSlider({ images, label, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const showControls = images.length > 1;
  const changeImage = (offset) => {
    setActiveIndex((index) => (index + offset + images.length) % images.length);
  };

  return (
    <div className={`image-slider ${className}`} role="group" aria-label={label}>
      <img src={images[activeIndex]} alt={`${label} ${activeIndex + 1} of ${images.length}`} />
      {showControls && (
        <>
          <button className="image-slider__arrow image-slider__arrow--previous" type="button" aria-label="Previous image" onClick={() => changeImage(-1)}>‹</button>
          <button className="image-slider__arrow image-slider__arrow--next" type="button" aria-label="Next image" onClick={() => changeImage(1)}>›</button>
          <div className="image-slider__dots" aria-label="Choose image">
            {images.map((image, index) => (
              <button
                key={image}
                className="image-slider__dot"
                type="button"
                aria-label={`Show image ${index + 1}`}
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
