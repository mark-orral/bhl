import Container from "@/components/atoms/Container";
import Heading from "@/components/atoms/Heading";

import styles from "./single-page-section.module.scss";

const SinglePageSection = ({
  heading,
  description,
  component,
  flex,
  split,
  border,
  contained = true,
}) => {
  return (
    <section className={styles.component}>
      <Container
        className={`${styles.container} ${flex && styles.flex} ${
          split && styles.split
        } ${border && styles.border}`}
        type="single"
      >
        {heading && (
          <div className={styles.col}>
            <Heading type="h2">{heading}</Heading>
            {description && <p>{description}</p>}
          </div>
        )}
        {contained && <div className={styles.col}>{component}</div>}
      </Container>
      {!contained && <div>{component}</div>}
    </section>
  );
};

export default SinglePageSection;
