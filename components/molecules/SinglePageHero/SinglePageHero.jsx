import Image from "@/components/atoms/Image";
import Container from "@/components/atoms/Container";
import HeroSlider from "@/components/organisms/HeroSlider/HeroSlider";
import cmsFetch from "@/lib/utils/cmsFetch";

import styles from "./single-page-hero.module.scss";

const SinglePageHero = ({ src }) => {
  return src?.length > 0 ? (
    <section className={styles.component}>
      {src.length === 1 ? (
        <Container className={styles.container} type="single">
          <Image
            src={cmsFetch(
              src[0]?.attributes?.formats?.xlarge?.url ||
                src[0]?.attributes?.url
            )}
            alt={src[0]?.attributes?.alternateText}
            height={
              src[0]?.attributes?.formats?.xlarge?.height ||
              src[0]?.attributes?.height
            }
            width={
              src[0]?.attributes?.formats?.xlarge?.width ||
              src[0]?.attributes?.width
            }
          />
        </Container>
      ) : (
        <HeroSlider heroes={src} />
      )}
    </section>
  ) : null;
};

export default SinglePageHero;
