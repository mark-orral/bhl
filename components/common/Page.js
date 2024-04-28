import Meta from "./Meta";
import Layout from "./Layout";

const Page = ({ children, seo, hasJsonLd }) => {
  return (
    <>
      <Meta seo={seo} hasJsonLd={hasJsonLd} />
      <Layout>{children}</Layout>
    </>
  );
};

export default Page;
