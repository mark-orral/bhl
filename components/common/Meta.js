import { ArticleJsonLd, NextSeo } from "next-seo";

const Meta = ({ seo, hasJsonLd }) => {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <NextSeo
        title={seo?.title}
        description={seo?.description}
        canonical={seo?.canonical}
        openGraph={{
          title: seo?.title,
          description: seo?.description,
          images: [{ url: seo?.opengraphImage?.sourceUrl }],
          url: seo?.canonical,
        }}
        nofollow={"follow" !== seo?.robots?.follow}
        noindex={"index" !== seo?.robots?.index}
      />

      {!!hasJsonLd && (
        <ArticleJsonLd
          url={seo?.canonical}
          title={seo?.title}
          images={[seo?.opengraphImage?.sourceUrl]}
          datePublished={seo?.opengraphPublishedTime}
          dateModified={seo?.opengraphModifiedTime}
          authorName={seo?.opengraphAuthor}
          description={seo?.description}
        />
      )}
    </>
  );
};

export default Meta;
