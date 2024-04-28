import cn from "classnames";
import styles from "./container.module.scss";

const Container = ({ children, type, className }) => {
  const classes = cn(
    styles.component,
    type && styles[`component_type_${type}`],
    className
  );

  return <div className={classes}>{children}</div>;
};

export default Container;
