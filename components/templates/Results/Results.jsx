import { useState, useEffect } from "react";

import Loader from "@/components/atoms/Loader";

import styles from "./results.module.scss";
import classNames from "classnames";

const Results = ({
  children,
  list = [],
  noResultsMessage = "No results",
  type,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const load = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(load);
    };
  }, [list]);

  return (
    <section className={styles.component}>
      {children && <div className={styles.component_grouping}>{children}</div>}

      {loading ? (
        <div className={styles.component_loading_container}>
          <Loader />
        </div>
      ) : list.length > 0 ? (
        <div
          className={classNames(
            styles.component_list,
            styles[`component_list_${type}`]
          )}
        >
          {list}
        </div>
      ) : (
        <div>{noResultsMessage}</div>
      )}
    </section>
  );
};

export default Results;
