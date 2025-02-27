import { By, until } from "selenium-webdriver";
import { getDriver } from "../../utils/webDriverSetup.mjs";
import { expect } from "chai";

describe("Text Box page", async () => {
  let driver;

  let fullName;
  let email;
  let currentAdress;
  let permanentAddress;
  let submitButton;
  let output;

  before(async () => {
    driver = await getDriver();
    await driver.get("https://demoqa.com/text-box");
    await driver.wait(until.urlIs("https://demoqa.com/text-box"));

    fullName = await driver.findElement(By.xpath('//*[@id="userName"]'));
    email = await driver.findElement(By.xpath('//*[@id="userEmail"]'));
    currentAdress = await driver.findElement(
      By.xpath('//*[@id="currentAddress"]')
    );
    permanentAddress = await driver.findElement(
      By.xpath('//*[@id="permanentAddress"]')
    );
    submitButton = await driver.findElement(By.xpath('//*[@id="submit"]'));
    output = await driver.findElement(By.xpath('//*[@id="output"]'));
  });

  it("contains the required fields", async () => {
    expect(await fullName.isDisplayed()).to.be.true;
    expect(await email.isDisplayed()).to.be.true;
    expect(await currentAdress.isDisplayed()).to.be.true;
    expect(await permanentAddress.isDisplayed()).to.be.true;
    expect(await submitButton.isDisplayed()).to.be.true;
  });
  context("Form", async () => {
    it("can be filled", async () => {
      expect(await fullName.isEnabled()).to.be.true;
      expect(await email.isEnabled()).to.be.true;
      expect(await currentAdress.isEnabled()).to.be.true;
      expect(await permanentAddress.isEnabled()).to.be.true;
      expect(await submitButton.isEnabled()).to.be.true;
    });
    it("cannot be submitted with invalid email", async () => {
      const currentOutput = await output.getText();

      await fullName.sendKeys("name");
      await email.sendKeys("email");
      await currentAdress.sendKeys("address");
      await permanentAddress.sendKeys("address1");
      await submitButton.click();

      expect(await email.getAttribute("class")).to.contain("field-error");
      expect(await output.getText()).to.equal(currentOutput);
    });
    it("can be submitted with valid email", async () => {
      const currentOutput = await output.getText();

      await email.sendKeys("@email.com");
      await submitButton.click();

      expect(await email.getAttribute("class")).to.not.contain("field-error");
      expect(await output.getText()).to.not.equal(currentOutput);
    });
    it("saves the information correctly", async () => {
      expect(await email.getAttribute("class")).to.not.contain("field-error");
      expect(await output.getText()).to.equal(
        "Name:name\nEmail:email@email.com\nCurrent Address :address\nPermananet Address :address1"
      );
    });
  });
});
