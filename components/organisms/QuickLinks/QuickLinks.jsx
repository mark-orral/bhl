import Container from "@/components/atoms/Container";
import styles from "./quick-links.module.scss";
import Image from "@/components/atoms/Image";
import Links from "@/components/atoms/Link/Link";
import cmsFetch from "@/lib/utils/cmsFetch";
const QuickLinks = ({ Quicklinks }) => {
  return (
    <section className={styles.component}>
      <Container className={styles.container} type={"single"}>
        {Quicklinks.map((link, i) => (
          <Card key={i} {...link} />
        ))}
      </Container>
    </section>
  );
};
const lookup = {
  Spaces: { link: "/spaces/all", defaultImage: "/images/defaults/spaces.jpeg" },
  Directory: {
    link: "/directory",
    defaultImage: "/images/defaults/directory.jpeg",
  },
  "Skills + Training": {
    link: "/skills-and-training/all",
    defaultImage: "/images/defaults/resources.jpeg",
  },
  Community: {
    link: "/community/all",
    defaultImage: "/images/defaults/community.jpeg",
  },
  About: { link: "/about", defaultImage: "/images/defaults/about.jpeg" },
};
const Card = ({ Link_Text, Link, ...rest }) => {
  const src = rest.Image.data.attributes.url;
  return (
    <Links className={styles.image_container} url={lookup[Link].link}>
      <Image
        src={src ? cmsFetch(src) : lookup[Link].defaultImage}
        width={300}
        height={380}
      />
      <div className={styles.image_text_container}>
        <div className={styles.image_text}>{Link_Text}</div>
        <div className={styles.image_category}>{Link}</div>
      </div>
      <Icon />
    </Links>
  );
};
const Icon = (colour = "#1a1a1a", size = { height: "20", width: "18" }) => {
  return (
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="20"
      viewBox="0 0 30 30"
    >
      <path
        d="M0,24.221V9.519H14.824L7.979,2.269,10.369,0,20.859,11.3,10.369,22.6l-2.39-2.268,6.844-7.21H3.2v11.1Z"
        transform="translate() "
        fill="#000"
      />
    </svg>
  );
};

export default QuickLinks;
