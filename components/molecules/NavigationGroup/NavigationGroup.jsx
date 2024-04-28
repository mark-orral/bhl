import PropTypes from "prop-types";
import cn from "classnames";

import Navigation from "@/components/molecules/Navigation";

import styles from "./navigation-group.module.scss";

const NavigationGroup = ({ heading, links, className }) => {
  const classes = cn(styles.component, className);

  return links ? (
    <div className={classes}>
      {heading && <h4 className={styles.component_heading}>{heading}</h4>}
      <Navigation
        className={styles.component_list}
        links={links}
      />
    </div>
  ) : null;
};

export default NavigationGroup;

NavigationGroup.propTypes = {
  heading: PropTypes.string,
  links: PropTypes.array,
  className: PropTypes.string,
};
