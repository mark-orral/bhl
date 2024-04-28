import cn from "classnames";
import Link from "next/link";
import PropTypes from "prop-types";
import styles from "./link.module.scss";

const Links = ({
  url,
  aria,
  colour,
  type,
  external = false,
  className,
  children,
  ...rest
}) => {
  const classes = cn(
    className,
    colour && styles[`component_text--${colour}`],
    type && styles[type],
    styles.component
  );

  if (url) {
    return external ? (
      <a
        href={url}
        className={classes}
        aria-label={aria}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        {children}
      </a>
    ) : (
      <Link href={url} className={classes} aria-label={aria} {...rest}>
        {children}
      </Link>
    );
  }
};

export default Links;

Links.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  aria: PropTypes.string,
  className: PropTypes.string,
  colour: PropTypes.oneOf(["beige"]),
  type: PropTypes.oneOf(["button--block", "button--hollow"]),
  external: PropTypes.bool,
};
