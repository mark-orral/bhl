import cn from "classnames";
import styles from "./card.module.scss";

const Card = ({ children, type, subType }) => {
  return (
    <div
      className={cn(
        styles.component,
        type && styles[type],
        subType && styles[subType]
      )}
    >
      {children}
    </div>
  );
};

export default Card;
