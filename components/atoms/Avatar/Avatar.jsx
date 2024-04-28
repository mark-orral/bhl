import cn from "classnames";
import cmsFetch from "@/lib/utils/cmsFetch";
import Image from "@/components/atoms/Image";

import styles from "./avatar.module.scss";

const defaultAvatar = "/images/bc_avatar.png";

const Avatar = ({
  className,
  url,
  alt,
  size = { height: 140, width: 140 },
  large,
}) => {
  return url ? (
    <Image
      className={cn(
        styles.element,
        large && styles["element_large"],
        className
      )}
      src={cmsFetch(url)}
      alt={alt}
      height={size.height}
      width={size.width}
    />
  ) : (
    <Image
      className={cn(
        styles.element,
        large && styles["element_large"],
        className
      )}
      src={defaultAvatar}
      alt=""
      height={140}
      width={140}
    />
  );
};

export default Avatar;
