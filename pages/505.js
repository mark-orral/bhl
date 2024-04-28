import Page from "../components/common/Page";
import Container from "@/components/atoms/Container";

const Error505 = () => {
  return (
    <Page seo={{ title: "Server Error", index: false }}>
      <Container>
        <h1>505 - Server Error</h1>
      </Container>
    </Page>
  );
};

export default Error505;
