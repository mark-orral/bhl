import { limitCharacters } from "@/lib/utils/limitCharacters";

import Heading from "@/components/atoms/Heading";
import Avatar from "@/components/atoms/Avatar";

import styles from "./card.module.scss";

const Header = ({ title: { text, limit = 50 }, avatar, displayAvatar }) => {
  const title = limitCharacters(text, limit);

  return title ? (
    <div className={styles.header}>
      <Heading className={styles.title} type="h2">
        {title}
      </Heading>

      {displayAvatar && (
        <Avatar
          className={styles.avatar}
          url={avatar?.attributes?.formats?.xsmall?.url}
          alt={avatar?.attributes?.alternativeText}
          size={{
            height: avatar?.attributes?.formats?.xsmall?.height,
            width: avatar?.attributes?.formats?.xsmall?.width,
          }}
        />
      )}
    </div>
  ) : null;
};

export { Header };
