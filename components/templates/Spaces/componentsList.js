import SinglePageText from "@/components/molecules/SinglePageText/SinglePageText";
import SinglePageImage from "@/components/molecules/SinglePageImage";
import SpecificsList from "@/components/molecules/SpecificsList";
import SinglePageSection from "@/components/molecules/SinglePageSection/SinglePageSection";

const componentsList = {
  ["global.text"]: (component) => {
    return (
      <SinglePageText key={Math.random()}>{component.text}</SinglePageText>
    );
  },
  ["global.image"]: (component) => {
    return component?.image?.data ? (
      <SinglePageImage key={Math.random()} src={component?.image?.data} />
    ) : (
      false
    );
  },
  ["global.specifics"]: (component) => {
    return (
      <SinglePageSection
        key={Math.random()}
        flex
        split
        border
        heading="Specifics"
        component={<SpecificsList items={component?.list} />}
      />
    );
  },
  default: (component) => {
    console.log(
      `The component :: ${component.__component} has content available for this page but there is no component available to render`
    );
    return null;
  },
};

export default componentsList;
