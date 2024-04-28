import switchFn from "./switchComponents";

const displayComponents = (componentsData, components) => {
  const switchComponents = switchFn(components, "default");

  const renderedComponents = componentsData
    ? componentsData.map((component) => switchComponents(component))
    : null;

  return renderedComponents;
};

export default displayComponents;
