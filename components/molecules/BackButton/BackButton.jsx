import { useRouter } from "next/router";

import styles from "./BackButton.module.scss";

const BackButton = ({ href, label = "home" }) => {
  const router = useRouter();

  const handleClick = (href) => {
    const link = href ? href : "/";
    router.push(link);
  };

  return (
    <div className={styles.component} onClick={() => handleClick(href)}>
      {label}
    </div>
  );
};

export default BackButton;
