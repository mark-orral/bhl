import { createElement } from "react";
import cn from "classnames";

import styles from "./heading.module.scss";

const Heading = ({ children, type = "div", align, className }) => {
  return createElement(
    type,
    {
      className: cn(
        styles.component,
        align && styles[`component_${align}`],
        className
      ),
    },
    children
  );
};

export default Heading;
