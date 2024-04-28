import Container from "@/components/atoms/Container/Container";

import styles from "./single-page-text.module.scss";

const SinglePageText = ({ children, jsxChildren }) => {
  return (
    <section className={styles.component}>
      <Container className={styles.container} type="single_text">
        <div
          className={styles.wysiwyg}
          {...(children &&
            !jsxChildren && {
              dangerouslySetInnerHTML: { __html: children },
            })}
        >
          {jsxChildren}
        </div>
      </Container>
    </section>
  );
};

export default SinglePageText;
