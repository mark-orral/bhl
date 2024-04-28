import Ticker from "@/components/atoms/Ticker";

import styles from "./ticker-banner.module.scss";

const TickerBanner = ({
  content,
  repeat = 1,
  direction = "right",
  speed = "40",
  play = true,
}) => {
  const renderedItems = (content, repeat) => {
    return Array(repeat)
      .fill([...content])
      .flat()
      .map((item, index) => (
        <div key={index} className={styles.component_item}>
          <span>{item.title}</span>
          <span>&#9679;</span>
        </div>
      ));
  };

  return (
    <Ticker
      className={styles.component}
      direction={direction}
      speed={speed}
      play={play}
    >
      {renderedItems(content, repeat)}
    </Ticker>
  );
};

export default TickerBanner;
