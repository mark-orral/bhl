import { useState } from "react";
import Container from "@/components/atoms/Container";
// import Heading from "@/components/atoms/Heading";
import Player from "@/components/atoms/Player";
// import Ticker from "@/components/atoms/Ticker";
import TickerBanner from "@/components/molecules/TickerBanner";

import styles from "./hero.module.scss";

const HeroVideo = "/files/Blackhorse_Collective_Logotype_Image_Reveal_02.mp4";

const banner = [
  {
    title: "Connect",
  },
  {
    title: "Collaborate",
  },
  {
    title: "Thrive",
  },
];

const Hero = () => {
  const [bannerData, setBannerData] = useState(banner);

  return (
    <section className={styles.component}>
      <div className={styles.component_row}>
        <Container className={styles.component_container}>
          <div className={styles.component_container_inner}>
            {HeroVideo && (
              <Player className={styles.component_player} src={HeroVideo} />
            )}
          </div>
        </Container>
      </div>
      {/* <div className={styles.component_row}>
        <Container className={styles.component_container}>
          <div className={styles.component_container_inner}>
            <Ticker className={styles.component_ticker} speed="40">
              <div className={styles.component_ticker_item}>
                <Heading type="h1">Vibrant. Independent. Diverse.</Heading>
              </div>
            </Ticker>
          </div>
        </Container>
      </div> */}
      {bannerData && (
        <div className={styles.component_row}>
          <TickerBanner content={bannerData} repeat={10} />
        </div>
      )}
    </section>
  );
};

export default Hero;
