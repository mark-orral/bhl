import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const ContentContext = createContext();

export function useContentContext() {
  return useContext(ContentContext);
}

export default function ContentProvider(props) {
  const { value, children } = props;

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

ContentProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  value: PropTypes.object,
};
