import { By, until } from "selenium-webdriver";
import { getDriver } from "../../utils/webDriverSetup.mjs";
import { assert, expect } from "chai";

describe("Radio button page", async () => {
  let driver;

  before(async () => {
    driver = await getDriver();
    await driver.get("https://demoqa.com/radio-button");
    await driver.wait(until.urlIs("https://demoqa.com/radio-button"));
  });

  it("contains the title and all radio buttons", async () => {
    const title = await driver.findElement(
      By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]/div[1]')
    );
    expect(await title.getText()).to.contain("Do you like the site?");

    const formDiv = await driver.findElement(
      By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]')
    );
    expect(
      (await formDiv.findElements(By.xpath('.//input[@type="radio"]'))).length
    ).to.equal(3);
    expect(await formDiv.getText()).to.contain("Yes");
    expect(await formDiv.getText()).to.contain("Impressive");
    expect(await formDiv.getText()).to.contain("No");
  });

  it("does not contain the results before interacting with the radio buttons", async () => {
    try {
      await driver.findElement(
        By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]/p')
      );
    } catch (error) {
      expect(error.name).to.contain("NoSuchElementError");
    }
  });

  context("radio buttons", async () => {
    it('are enabled ("Yes", "Impressive")', async () => {
      const yesRadio = await driver.findElement(
        By.xpath('//input[@id="yesRadio"]')
      );
      const impressiveRadio = await driver.findElement(
        By.xpath('//input[@id="impressiveRadio"]')
      );

      expect(await yesRadio.getAttribute("disabled")).to.be.null;
      expect(await impressiveRadio.getAttribute("disabled")).to.be.null;
    });

    it('are disable ("No")', async () => {
      const noRadio = await driver.findElement(
        By.xpath('//input[@id="noRadio"]')
      );
      expect(await noRadio.getAttribute("disabled")).to.equal("true");
    });

    it("can be clicked if enabled", async () => {
      const yesRadioLabel = await driver.findElement(
        By.xpath('//label[@for="yesRadio"]')
      );
      const impressiveRadioLabel = await driver.findElement(
        By.xpath('//label[@for="impressiveRadio"]')
      );

      try {
        await yesRadioLabel.click();
        await impressiveRadioLabel.click();
      } catch (error) {
        assert.fail();
      }

      expect(
        (
          await (
            await driver.findElement(
              By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]')
            )
          ).findElements(By.xpath("./*"))
        ).length
      ).to.equal(5);
    });

    it("cannot be clicked if disabled", async () => {
      driver.navigate().refresh();
      const noRadioLabel = await driver.findElement(
        By.xpath('//label[@for="noRadio"]')
      );

      await noRadioLabel.click();

      expect(
        (
          await (
            await driver.findElement(
              By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]')
            )
          ).findElements(By.xpath("./*"))
        ).length
      ).to.equal(4);
    });
  });
  context("result field", async () => {
    it("is displayed after selecting any radio button option", async () => {
      const yesRadioLabel = await driver.findElement(
        By.xpath('//label[@for="yesRadio"]')
      );
      const impressiveRadioLabel = await driver.findElement(
        By.xpath('//label[@for="impressiveRadio"]')
      );

      await yesRadioLabel.click();

      expect(
        await (
          await driver.findElement(
            By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]/p')
          )
        ).isDisplayed()
      ).to.be.true;

      await impressiveRadioLabel.click();

      expect(
        await (
          await driver.findElement(
            By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]/p')
          )
        ).isDisplayed()
      ).to.be.true;
    });
    it("displays the correct value", async () => {
      const yesRadioLabel = await driver.findElement(
        By.xpath('//label[@for="yesRadio"]')
      );
      const impressiveRadioLabel = await driver.findElement(
        By.xpath('//label[@for="impressiveRadio"]')
      );

      await yesRadioLabel.click();

      expect(
        await (
          await driver.findElement(
            By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]/p/span')
          )
        ).getText()
      ).to.equal("Yes");

      await impressiveRadioLabel.click();

      expect(
        await (
          await driver.findElement(
            By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]/p/span')
          )
        ).getText()
      ).to.equal("Impressive");
    });
  });
});
