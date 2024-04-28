import { limitCharacters } from "@/lib/utils/limitCharacters";

import styles from "./card.module.scss";

const Text = ({ children, limit = 102, multiline }) => {
  const text = limitCharacters(children, limit);

  return text ? (
    <div className={`${styles.text} ${multiline && styles.text_multiline}`}>
      {text}
    </div>
  ) : null;
};

export { Text };
