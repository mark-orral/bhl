import Container from "@/components/atoms/Container";
import Heading from "@/components/atoms/Heading";
import Avatar from "@/components/atoms/Avatar";

import styles from "./single-page-intro.module.scss";

const SinglePageIntro = ({
  title,
  avatar,
  displayAvatar = true,
  category,
  company,
  attributes,
  events_meta,
}) => {
  return (
    <section className={styles.component}>
      <Container className={styles.container} type="single">
        <div className={styles.row}>
          <Heading className={styles.title} type="h1">
            {title}
          </Heading>

          {displayAvatar && (
            <Avatar
              className={styles.avatar}
              url={
                avatar?.data?.attributes?.formats?.xsmall?.url ||
                avatar?.data?.attributes?.url
              }
              alt={avatar?.data?.attributes?.alternativeText}
              size={{
                height: avatar?.data?.attributes?.formats?.xsmall?.height,
                width: avatar?.data?.attributes?.formats?.xsmall?.width,
              }}
              large
            />
          )}
        </div>

        {category && !events_meta && (
          <div className={styles.row}>{category}</div>
        )}
        {events_meta?.occurrence && (
          <div className={styles.row} style={{ marginBottom: "1rem" }}>
            {`${events_meta?.occurrence} ${category.slice(
              0,
              category?.length - 1
            )} 
            ${
              events_meta?.time
                ? `@ ${tConvert(
                    events_meta?.time.slice(0, events_meta?.time.length - 7)
                  )}`
                : ""
            } `}
          </div>
        )}
        {company?.name && <div className={styles.row}>{company.name}</div>}
        {company?.address && (
          <div className={styles.row}>{company.address}</div>
        )}
        {company?.slogan && (
          <div className={`${styles.row} ${styles.slogan}`}>
            {company.slogan}
          </div>
        )}

        {attributes && attributes.length > 0 && (
          <div className={styles.row}>{attributes.join(" | ")}</div>
        )}
      </Container>
    </section>
  );
};

export default SinglePageIntro;
function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}
