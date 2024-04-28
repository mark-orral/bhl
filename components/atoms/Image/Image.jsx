import cn from "classnames";
import Image from "next/image";

import styles from "./image.module.scss";

const Img = ({
  className,
  src,
  alt = "",
  objectFit,
  objectPosition,
  ...rest
}) => {
  const classes = cn(
    className,
    objectFit && styles[`fit_${objectFit}`],
    objectPosition && styles[`position_${objectPosition.replace(" ", "_")}`]
  );

  return <Image className={classes} src={src} alt={alt} {...rest} />;
};

export default Img;
