module.exports = {
  file: "testSetup.mjs",
  bail: false,
  timeout: "10000",
  spec: [
    "test/elementsTests/textboxTests.mjs",
    "test/elementsTests/checkboxTests.mjs",
    "test/elementsTests/radioButtonTests.mjs",
    "test/elementsTests/webTablesTests.mjs",
  ],
  //   reporter: "mochawesome",
};
