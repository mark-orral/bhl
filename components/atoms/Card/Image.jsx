import Image from "@/components/atoms/Image";
import cmsFetch from "@/lib/utils/cmsFetch";

import styles from "./card.module.scss";

const defaultImage = "/images/temp/news-card.png";

const CardImage = ({ src, alt = "", defaultType }) => {
  return (
    <div className={styles.image}>
      <Image
        src={cmsFetch(src) || defaultType || defaultImage}
        alt={alt}
        fill
        objectFit="cover"
        objectPosition="center center"
      />
    </div>
  );
};

export { CardImage };
