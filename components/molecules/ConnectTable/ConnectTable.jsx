import Image from "@/components/atoms/Image";
import Link from "@/components/atoms/Link";

import { useContentContext } from "@/components/common/providers/ContentProvider";

import styles from "./connect-table.module.scss";

const ConnectTable = ({ website, email, phone, socials }) => {
  const { company } = useContentContext();

  const renderedWebsite = website || company?.website;
  const renderedEmail = email || company?.email_address;
  const renderedPhone = phone || company?.phone_number;

  return renderedWebsite || renderedEmail || renderedPhone || socials ? (
    <table className={styles.component}>
      {renderedWebsite && (
        <tr>
          <td>Website</td>
          <td>
            <Link url={renderedWebsite} external>
              {renderedWebsite}
            </Link>
          </td>
        </tr>
      )}
      {renderedEmail && (
        <tr>
          <td>Email</td>
          <td>
            <Link url={`mailto:${renderedEmail}`} external>
              {renderedEmail}
            </Link>
          </td>
        </tr>
      )}
      {renderedPhone && (
        <tr>
          <td>Phone</td>
          <td>{renderedPhone}</td>
        </tr>
      )}
      {socials && (
        <tr>
          <td>Social</td>
          <td>
            <table>
              <tr>
                {socials?.instagram && (
                  <td>
                    <Link url={socials?.instagram} external>
                      <Image
                        src={`/images/social/instagram.svg`}
                        height="18"
                        width="18"
                        alt="Instagram"
                      />
                    </Link>
                  </td>
                )}
                {socials?.twitter && (
                  <td>
                    <Link url={socials?.twitter} external>
                      <Image
                        src={`/images/social/twitter.svg`}
                        height="18"
                        width="18"
                        alt="Instagram"
                      />
                    </Link>
                  </td>
                )}
                {socials?.linkedin && (
                  <td>
                    <Link url={socials?.linkedin} external>
                      <Image
                        src={`/images/social/linkedin.svg`}
                        height="18"
                        width="18"
                        alt="LinkedIn"
                      />
                    </Link>
                  </td>
                )}
              </tr>
            </table>
          </td>
        </tr>
      )}
    </table>
  ) : null;
};

export default ConnectTable;
