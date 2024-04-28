const switchFn =
  (lookupObject, defaultCase = "default") =>
  (expression) =>
    (lookupObject[expression.__component] || lookupObject[defaultCase])(
      expression
    );

export default switchFn;
