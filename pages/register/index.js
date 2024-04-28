import Page from "@/components/common/Page";
import RegisterForm from "@/components/organisms/RegisterForm";
import pages from "@/lib/data/pages/pages.json";
// import menus from "@/lib/data/global/navigation.json";

//* Example component data which would normally be fetched from an API call
// import { exampleComponentData } from "@/lib/services/wordpress/pages/exampleComponentData";

const Register = ({ page }) => {
  return (
    <Page seo={{ title: "Register", description: "Register your business" }}>
      <RegisterForm type={"single"} />
    </Page>
  );
};

export default Register;

// export async function getStaticProps(context) {
//   //* Example of how to fetch data for use
//   // const pages = await getAllPages();
//   // console.log(pages);

//   const page = pages.find((page) => page.slug === "/");

//   //* Example of how to render 404 on static pages
//   if (!page) {
//     return {
//       notFound: true,
//     };
//   }

//   //* This will be passed to the page component as props
//   return {
//     props: { page, menus },
//   };
// }
