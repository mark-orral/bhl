import Hero from "../../organisms/Hero";

const homeComponentList = {
  hero: (component) => {
    return !!component && <Hero key={component.id} />;
  },
  default: (component) => {
    console.log(
      `The component :: ${component.acf_fc_layout} has content available for this page but no component to render in position :: ${component.id}`,
      index
    );
  },
};

export default homeComponentList;
