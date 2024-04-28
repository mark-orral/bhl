import { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import styles from "./alphabet-filter.module.scss";

const AlphabetFilter = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const router = useRouter();
  const handleLetterSelection = (letter) => {
    setSelectedLetter(letter);
    const query = {
      ...router.query,
      starts_with: letter,
    };

    router.push(
      {
        query: query,
      },
      undefined,
      {
        scroll: false,
      }
    );
  };
  return (
    <div className={styles.alphabet_filter}>
      <div
        onClick={() => {
          handleLetterSelection(null);
        }}
      >
        Clear
      </div>
      {Array.from(Array(26).keys()).map((i) => {
        const letter = String.fromCharCode(65 + i);
        return (
          <div
            className={classNames(
              styles.alphabet_filter_letter,
              selectedLetter === letter && styles.active
            )}
            role="button"
            onClick={() => handleLetterSelection(letter)}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export default AlphabetFilter;
