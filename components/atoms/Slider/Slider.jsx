import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";

const Slider = ({ content, slidesClass, ...rest }) => {
  const [slides] = useState([...content, ...content, ...content]);

  const renderedSlides = (items) => {
    return items.map((item, index) => (
      <SwiperSlide key={index} className={slidesClass}>
        {item}
      </SwiperSlide>
    ));
  };

  return <Swiper {...rest}>{renderedSlides(slides)}</Swiper>;
};

export default Slider;
