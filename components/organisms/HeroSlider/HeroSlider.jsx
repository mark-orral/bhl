import Slider from "@/components/atoms/Slider";

import useImages from "@/lib/hooks/useImages";

import styles from "./hero-slider.module.scss";

const HeroSlider = ({ heroes }) => {
  const images = heroes?.map((item) => {
    return item?.attributes;
  });

  const renderedImages = useImages(images);
  return images ? (
    <div className={styles.component}>
      {renderedImages && (
        <Slider
          className={`${styles.component_slider}`}
          wrapperClass={`swiper-wrapper ${styles.component_slider_wrapper}`}
          slidesClass={styles.component_slides}
          content={renderedImages}
          slidesPerView={"auto"}
          spaceBetween={0}
          loop={renderedImages.length > 1}
          centeredSlides={true}
        />
      )}
    </div>
  ) : null;
};

export default HeroSlider;
