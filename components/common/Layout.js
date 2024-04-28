import PropTypes from "prop-types";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};
