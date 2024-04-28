import SinglePageText from "@/components/molecules/SinglePageText/SinglePageText";
import SinglePageSection from "@/components/molecules/SinglePageSection/SinglePageSection";
import DateTimeList from "@/components/molecules/DateTimeList/DateTimeList";
import ConnectTable from "@/components/molecules/ConnectTable";
import PortfolioSlider from "@/components/organisms/PortfolioSlider";

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
  ["global.connect"]: (component) => {
    return (
      <SinglePageSection
        key={Math.random()}
        flex
        border
        heading="Connect"
        component={
          <ConnectTable
            website={component?.website}
            email={component?.email}
            phone={component?.phone}
            socials={component?.social_links}
          />
        }
      />
    );
  },
  ["global.work"]: (component) => {
    return (
      <SinglePageSection
        key={Math.random()}
        flex
        border
        contained={false}
        heading="Our work"
        component={<PortfolioSlider portfolio={component.portfolio_items} />}
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
