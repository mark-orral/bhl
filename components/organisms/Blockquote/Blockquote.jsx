import Container from "@/components/atoms/Container";

import styles from "./blockquote.module.scss";

const Blockquote = ({ children, person, business, colour = "blue" }) => {
  return (
    <section className={styles.component}>
      <Container>
        <p className={styles.component_quote}>&quot;{children}&quot;</p>
        {person && (
          <p className={styles.component_author}>
            {person} {business && <span>{business}</span>}
          </p>
        )}
      </Container>
    </section>
  );
};

export default Blockquote;
