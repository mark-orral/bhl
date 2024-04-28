import Image from "@/components/atoms/Image";
import Container from "@/components/atoms/Container";
import cmsFetch from "@/lib/utils/cmsFetch";

import styles from "./single-page-image.module.scss";

const SinglePageImage = ({ src }) => {
  return src ? (
    <section className={styles.component}>
      <Container className={styles.container} type="single">
        <Image
          src={cmsFetch(
            src?.attributes?.formats?.xlarge?.url || src?.attributes?.url
          )}
          alt={src?.attributes?.alternateText}
          height={
            src?.attributes?.formats?.xlarge?.height || src?.attributes?.height
          }
          width={
            src?.attributes?.formats?.xlarge?.width || src?.attributes?.width
          }
          // fill
          // objectFit="cover"
          // objectPosition="center center"
        />
      </Container>
    </section>
  ) : null;
};

export default SinglePageImage;
