import SingleMap from "@/components/atoms/SingleMap";

import styles from "./map-with-details.module.scss";

const MapWithDetails = ({ company }) => {
  const location = [
    {
      id: company.name,
      attributes: {
        ...company,
      },
    },
  ];

  return (
    <div className={styles.component}>
      {company.lat && company.lng && (
        <div className={styles.mb}>
          <SingleMap locations={location} />
        </div>
      )}

      {company.name && (
        <div className={`${styles.name} ${styles.mb}`}>{company.name}</div>
      )}

      {company.address ||
      company.google_maps_link ||
      company.citymapper_link ||
      company.phone_number ||
      company.size ? (
        <div className={styles.columns}>
          {company.address && (
            <div className={styles.column}>
              <div className={styles.address}>{company.address}</div>
            </div>
          )}
          <div className={styles.column}>
            {company.google_maps_link && (
              <div className={styles.google}>
                <a
                  className={styles.underline}
                  href={company.google_maps_link}
                  target="_blank"
                >
                  Google Maps
                </a>
              </div>
            )}
            {company.citymapper_link && (
              <div className={styles.mb}>
                <a
                  className={styles.underline}
                  href={company.citymapper_link}
                  target="_blank"
                >
                  CityMapper
                </a>
              </div>
            )}
            {company.phone_number && (
              <div className={styles.bold}>{company.phone_number}</div>
            )}
            {/* {company.email_address && (
            <div className={styles.bold}>
              <a href={`mailto:${company.email_address}`} target="_blank">
                {company.email_address}
              </a>
            </div>
          )} */}
            {company.size && (
              <div className={styles.bold}>
                Size <br />
                <span className={styles.light}>{company.size}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        false
      )}

      {company.email_address && (
        <div className={`${styles.name} ${styles.mb} ${styles.bold}`}>
          <a href={`mailto:${company.email_address}`} target="_blank">
            {company.email_address}
          </a>
        </div>
      )}
      {company.website && (
        <div className={styles.website}>
          <a href={company.website} target="_blank">
            {company.name} website
          </a>
        </div>
      )}
    </div>
  );
};

export default MapWithDetails;
