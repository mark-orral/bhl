import Heading from "@/components/atoms/Heading";
import Slider from "@/components/atoms/Slider";
import Link from "@/components/atoms/Link";

import usePosts from "@/lib/hooks/usePosts";

import styles from "./posts-slider.module.scss";

const PostsSlider = ({ posts }) => {
  const cards = usePosts(posts);

  const slider_width = cards.length >= 7 ? "large" : "small";

  return posts ? (
    <section className={styles.component}>
      <Heading type="h2" align="center" className={styles.component_heading}>
        From the community
      </Heading>

      <Slider
        className={`${styles.component_slider} ${
          styles[`component_slider_${slider_width}`]
        }`}
        slidesClass={styles.component_slides}
        content={cards}
        // onSwiper={(swiper) => console.log(swiper)}
        slidesPerView={"auto"}
        spaceBetween={0}
        loop={true}
        centeredSlides={true}
      />
      <Link url="/community/all" type="button--block">
        View All
      </Link>
    </section>
  ) : null;
};

export default PostsSlider;
