import Page from "../components/common/Page";
import Container from "@/components/atoms/Container";

const Error404 = () => {
  return (
    <Page seo={{ title: "Page Not Found", index: false }}>
      <Container>
        <h1>404 - Page Not Found</h1>
      </Container>
    </Page>
  );
};

export default Error404;
