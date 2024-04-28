import SinglePageText from "@/components/molecules/SinglePageText/SinglePageText";
import SinglePageSection from "@/components/molecules/SinglePageSection/SinglePageSection";
import DateTimeList from "@/components/molecules/DateTimeList/DateTimeList";

const componentsList = {
  ["global.text"]: (component) => {
    return (
      <SinglePageText key={Math.random()}>{component.text}</SinglePageText>
    );
  },
  ["global.dates"]: (component) => {
    return (
      <SinglePageSection
        key={Math.random()}
        flex
        border
        heading="Dates & times"
        component={<DateTimeList dates={component.dates} />}
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
