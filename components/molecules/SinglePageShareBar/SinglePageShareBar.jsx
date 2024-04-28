import Container from "@/components/atoms/Container";
import Link from "@/components/atoms/Link";

import styles from "./single-page-share-bar.module.scss";

const SinglePageShareBar = ({ mapLink }) => {
  return (
    <section className={styles.component}>
      <Container className={styles.container} type="single">
        <div>
          {mapLink && (
            <Link url={mapLink} external>
              View On Map
            </Link>
          )}
        </div>
        <div
          data-text="Click to copy!"
          className={styles.share}
          onClick={() => {
            // console.log(navigator.clipboard.writeText(window.location.href));
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          Share
        </div>
      </Container>
    </section>
  );
};

export default SinglePageShareBar;
