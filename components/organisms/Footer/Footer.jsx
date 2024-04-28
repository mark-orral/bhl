// import { useContentContext } from "@/components/common/providers/ContentProvider";

import Container from "@/components/atoms/Container";
import Image from "@/components/atoms/Image";
import Link from "@/components/atoms/Link";
import Logo from "@/components/molecules/Logo";
import Navigation from "@/components/molecules/Navigation";
import NavigationGroup from "@/components/molecules/NavigationGroup";

import styles from "./footer.module.scss";
import { CMS_URL_LOGIN } from "@/lib/utils/constants";
import { useContentContext } from "@/components/common/providers/ContentProvider";

const socialLinks = [
  {
    url: "https://www.instagram.com/blackhorse_collective/",
    label: "Instagram",
  },
  {
    url: "https://twitter.com/BlackhorseColl1",
    label: "Twitter",
  },
  {
    url: "https://linkedin.com/company/blackhorsecollective",
    label: "LinkedIn",
  },
];

const policyLinks = [
  {
    url: "/accessibility",
    label: "Accessibility",
  },
  {
    url: "/privacy-policy",
    label: "Privacy",
  },
];

// const communityLinks = [
//   {
//     url: "/community/notices",
//     label: "Notices",
//   },
//   {
//     url: "/community/events",
//     label: "Events",
//   },
//   {
//     url: "/community/jobs",
//     label: "Jobs",
//   },
//   {
//     url: "/community/news",
//     label: "News",
//   },
// ];

// const spacesLinks = [
//   {
//     url: "/spaces/private-studios",
//     label: "Private studios",
//   },
//   {
//     url: "/spaces/co-working",
//     label: "Co-working",
//   },
//   {
//     url: "/spaces/retail",
//     label: "Retail",
//   },
//   {
//     url: "/spaces/events",
//     label: "Event space",
//   },
// ];

const directoryLinks = [
  {
    url: "/directory?view=map",
    label: "Map",
  },
  {
    url: "/directory",
    label: "List",
  },
];

// const resourcesLinks = [
//   {
//     url: "/skills-and-training/training-courses",
//     label: "Training Courses",
//   },
//   {
//     url: "/skills-and-training/advice-and-guidance",
//     label: "Advice + Guidance",
//   },
//   {
//     url: "/skills-and-training/further-support",
//     label: "Further Support",
//   },
// ];

const icon = () => {
  return (
    <svg
      className={styles.icon}
      xmlns='http://www.w3.org/2000/svg'
      width='21.98'
      height='18.929'
      viewBox='0 0 21.98 18.929'
    >
      <path
        d='M0,0V13.342H13.452L7.241,19.922,9.41,21.98l9.519-10.255L9.41,1.47,7.241,3.528l6.211,6.543H2.9V0Z'
        transform='translate(0 18.929) rotate(-90)'
        fill='#1a1a1a'
      />
    </svg>
  );
};

const Footer = () => {
  const { footerCategories } = useContentContext();

  const communityLinks = footerCategories?.community?
    .filter((item) => item.attributes.count > 0)
    .map((item) => {
      return {
        label: item.attributes.name,
        url: `/community/${item.attributes.slug}`,
      };
    });

  const spacesLinks = footerCategories?.spaces?
    .filter((item) => item.attributes.count > 0)
    .map((item) => {
      return {
        label: item.attributes.name,
        url: `/spaces/${item.attributes.slug}`,
      };
    });

  const resourcesLinks = footerCategories?.resources?
    .filter((item) => item.attributes.count > 0)
    .map((item) => {
      return {
        label: item.attributes.name,
        url: `/skills-and-training/${item.attributes.slug}`,
      };
    });

  return (
    <footer className={styles.component}>
      <div className={styles.component_row_primary}>
        <Container type='content'>
          <div className={styles.component_row_primary_layout}>
            <nav className={styles.component_row_primary_layout_column}>
              <NavigationGroup
                heading='Community'
                links={communityLinks}
                className={styles.links_group}
              />

              <NavigationGroup
                heading='Spaces'
                links={spacesLinks}
                className={styles.links_group}
              />

              <NavigationGroup
                heading='Directory'
                links={directoryLinks}
                className={styles.links_group}
              />

              <NavigationGroup
                heading='Skills &amp; Training'
                links={resourcesLinks}
                className={styles.links_group}
              />
            </nav>
            <div className={styles.component_row_primary_layout_column}>
              <Link
                external
                url={CMS_URL_LOGIN}
                type='button--hollow'
                className={styles.component_row_primary_layout_column_link}
              >
                Login
              </Link>
              <Link
                url='/register'
                type='button--hollow'
              >
                Register a business
              </Link>
            </div>
          </div>
          <div className={styles.component_anchor}>
            <a href='#top'>{icon()} Back to top</a>
          </div>
        </Container>
      </div>
      <div className={styles.component_row_secondary}>
        <Container type='content'>
          <div className={styles.component_row_secondary_layout}>
            <div className={styles.component_row_secondary_layout_column}>
              <Logo
                condensed
                height='45'
                width='45'
              />

              <div className={styles.social_links_container}>
                <span>Follow us</span>
                <ul className={styles.social_links}>
                  {socialLinks.map((link, index) => {
                    return (
                      <li key={index}>
                        <Link
                          url={link.url}
                          external
                        >
                          <Image
                            src={`/images/social/${link.label
                              .toLowerCase()
                              .replace(" ", "")}.svg`}
                            height='25'
                            width='25'
                            alt={link.label}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.component_row_secondary_layout_column}>
              <Image
                src='/images/lbwf.svg'
                height='42'
                width='75'
                alt='Waltham Forest'
              />

              <Image
                src='/images/mol.svg'
                height='33'
                width='150'
                alt='Mayor Of London'
              />
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.component_row_tertiary}>
        <Container type='content'>
          <div className={styles.component_row_tertiary_layout}>
            <div className={styles.component_row_tertiary_layout_column}>
              <Navigation
                className={styles.navigation}
                links={policyLinks}
                colour='beige'
              />
            </div>
            <div className={styles.component_row_tertiary_layout_column}>
              &copy; Blackhorse Collective<sup>&#8482;</sup> WP CEZ Est &rarr;
              2022
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
