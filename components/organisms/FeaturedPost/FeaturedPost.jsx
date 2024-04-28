import Container from "@/components/atoms/Container";
import Image from "@/components/atoms/Image";
import Heading from "@/components/atoms/Heading";
import Card, * as CardElement from "@/components/atoms/Card";
import cmsFetch from "@/lib/utils/cmsFetch";

import styles from "./featured-post.module.scss";

const exampleImage = "/uploads/Write_Club_at_Creative_Works_5360e59b4a.jpg";

//! Restrict heading to 68 characters
//! Restrict description to 180 characters

const FeaturedPost = ({ post }) => {
  const {
    title,
    description,
    slug,
    hero,
    category: {
      data: { attributes: category },
    },
  } = post;

  return (
    <section className={styles.component}>
      <Container type='content'>
        <div className={styles.card}>
          <div className={styles.card_image}>
            <Image
              src={cmsFetch(hero.images.data[0].attributes.url)}
              alt=''
              fill
              objectFit='cover'
              objectPosition='center center'
            />
          </div>
          <div className={styles.card_info}>
            <div className={styles.card_info_header}>
              <div className={styles.card_info_header_tag}>Events</div>
              <div>Featured</div>
            </div>

            <Heading
              type='h2'
              className={styles.card_info_heading}
            >
              {title}
            </Heading>

            <p className={styles.card_info_description}>{description}</p>
          </div>
          <CardElement.Link
            className={styles.card_info_link}
            url={`/community/${category?.slug}/${slug}`}
          />
        </div>
      </Container>
    </section>
  );
};

export default FeaturedPost;
