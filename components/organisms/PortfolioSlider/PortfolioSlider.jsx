import Slider from "@/components/atoms/Slider";

import useImages from "@/lib/hooks/useImages";

import styles from "./portfolio-slider.module.scss";

const PortfolioSlider = ({ portfolio }) => {
  const images = portfolio?.reduce((prev, item) => {
    if (item?.image?.data?.attributes) {
      prev.push(item?.image?.data?.attributes);
    }
    return prev;
  }, []);
  const renderedImages = useImages(images);

  const slider_width = renderedImages.length >= 7 ? "large" : "small";

  return portfolio ? (
    <div className={styles.component}>
      <Slider
        className={styles.component_slider}
        wrapperClass={`swiper-wrapper ${styles.component_slider_wrapper}`}
        slidesClass={styles.component_slides}
        content={renderedImages}
        // onSwiper={(swiper) => console.log(swiper)}
        slidesPerView={"auto"}
        spaceBetween={0}
        loop={true}
        // centeredSlides={true}
      />
    </div>
  ) : null;
};

export default PortfolioSlider;
