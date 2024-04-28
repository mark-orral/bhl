import Marquee from "react-fast-marquee";

const Ticker = ({ children, ...rest }) => {
  return (
    <Marquee gradient={false} {...rest}>
      {children}
    </Marquee>
  );
};

export default Ticker;
