import Container from "@/components/atoms/Container";
import Heading from "@/components/atoms/Heading";
import Link from "@/components/atoms/Link";

import styles from "./categories-graph.module.scss";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

const RenderedCategoryList = ({ categories, count }) => {
  const isMobile = useIsMobile();
  const totalBusinesses = count;
  const categoryList = categories?.map((category) => {
    const categoryCount = category.attributes.count;
    const percentage = (categoryCount / totalBusinesses) * 100;
    const offset = isMobile ? percentage : percentage + 35;
    const offsetPercentageByMinWidth = offset > 100 ? 100 : offset;
    return categoryCount > 0 ? (
      <li
        key={category.attributes.slug}
        className={styles.component_list_item}
        style={{ width: "100%" }}
      >
        <Link
          url={`/directory?industry=${category.attributes.slug}`}
          style={{ width: `${offsetPercentageByMinWidth.toString()}%` }}
        >
          <div className={styles.component_list_item_name}>
            {category.attributes.name}
          </div>
          <div className={styles.component_list_item_bar}>
            <span className={styles.component_list_item_count}>
              {categoryCount}
            </span>
          </div>
        </Link>
      </li>
    ) : null;
  });

  return <ul className={styles.component_list}>{categoryList}</ul>;
};
const CategoriesGraph = ({ categories, count }) => {
  return (
    <section className={styles.component}>
      <Container type="content">
        <Heading className={styles.component_heading} align="center">
          We&apos;re a diverse bunch
        </Heading>

        <p className={styles.component_description}>
          We have a directory with a huge variety of businesses that everyone is
          welcome to use if they sign up.
        </p>

        {/* <p className={styles.component_description}>
          Get in touch to find out more about adding your business by emailing{" "}
          <a href="mailto:business.growth@walthamforest.gov.uk">
            business.growth@walthamforest.gov.uk
          </a>
        </p> */}

        <RenderedCategoryList categories={categories} count={count} />

        <Link url="/directory" type="button--block">
          Search &amp; Collaborate
        </Link>
      </Container>
    </section>
  );
};

export default CategoriesGraph;
