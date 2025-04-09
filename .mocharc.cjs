module.exports = {
  file: "testSetup.mjs",
  bail: false,
  timeout: "10000",
  spec: [
    "test/elementsTests/textboxTests.mjs",
    "test/elementsTests/checkboxTests.mjs",
  ],
  //   reporter: "mochawesome",
};
