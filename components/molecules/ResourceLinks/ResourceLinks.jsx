import Link from "@/components/atoms/Link";

import styles from "./resource-links.module.scss";

const ResourceLinks = ({ links }) => {
  return (
    <ul className={styles.element}>
      {links?.map((link, index) => {
        return (
          <li key={index}>
            <Link
              className={styles.button}
              type='button--hollow'
              url={link?.url}
              external={link?.type === "external"}
            >
              {link?.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ResourceLinks;
