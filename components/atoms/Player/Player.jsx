import cn from "classnames";

import styles from "./player.module.scss";

const Player = ({ className, src }) => {
  return src ? (
    <div className={cn(styles.component, className)}>
      <video
        width="100%"
        height="100%"
        disablePictureInPicture
        muted
        // loop
        autoPlay
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  ) : null;
};

export default Player;
