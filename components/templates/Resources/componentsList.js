import SinglePageText from "@/components/molecules/SinglePageText/SinglePageText";
import SinglePageImage from "@/components/molecules/SinglePageImage";
import SinglePageSection from "@/components/molecules/SinglePageSection/SinglePageSection";
import ResourceLinks from "@/components/molecules/ResourceLinks";
import SpecificsList from "@/components/molecules/SpecificsList";

const componentsList = {
  ["global.text"]: (component) => {
    return component.text ? (
      <SinglePageText key={Math.random()}>{component.text}</SinglePageText>
    ) : (
      false
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
  ["global.call-to-action"]: (component) => {
    return (
      <SinglePageSection
        key={Math.random()}
        flex
        border
        heading="How to apply"
        description={component?.description}
        component={<ResourceLinks links={component?.links} />}
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
