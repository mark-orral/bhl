import cn from "classnames";
import styles from "./logo.module.scss";

import Link from "@/components/atoms/Link";
import Image from "next/image";

import LogoAnimated from "/public/images/logo_animated.gif";
import LogoCondensed from "/public/images/logo_condensed.svg";

const Logo = ({ className, height, width, condensed }) => {
  const classes = cn(styles.component, className);
  const source = condensed ? LogoCondensed : LogoAnimated;

  return (
    <Link url="/" className={styles.component_link}>
      <Image
        className={classes}
        src={source}
        alt="Blackhorse Collective"
        height={height}
        width={width}
        priority
        // fill
        // objectFit="cover"
        // objectPosition="center center"
      />
    </Link>
  );
};

export default Logo;
