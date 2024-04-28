import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./button.module.scss";

const Button = ({ className, type, children, ...rest }) => {
  const classes = cn(
    styles.component,
    type === "block" && styles.component_block,
    type === "hollow" && styles.component_hollow,
    className
  );

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["block", "hollow"]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
