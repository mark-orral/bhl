import Page from "@/components/common/Page";
// import HomeTemplate from "@/components/templates/home";
// import getAllPages from "../lib/wordpress/pages/getAllPages";
import pages from "@/lib/data/pages/pages.json";
// import menus from "@/lib/data/global/navigation.json";

//* Example component data which would normally be fetched from an API call
// import { exampleComponentData } from "@/lib/services/wordpress/pages/exampleComponentData";

const About = ({ page }) => {
  return (
    <Page seo={{ title: page.seo.title, description: page.seo.description }}>
      ABOUT
    </Page>
  );
};

export default About;

export async function getStaticProps(context) {
  //* Example of how to fetch data for use
  // const pages = await getAllPages();
  // console.log(pages);

  const page = pages.find((page) => page.slug === "/");

  //* Example of how to render 404 on static pages
  if (!page) {
    return {
      notFound: true,
    };
  }

  //* This will be passed to the page component as props
  return {
    props: { page },
  };
}
