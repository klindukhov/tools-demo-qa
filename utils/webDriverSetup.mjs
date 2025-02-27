import { Builder, Browser } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox.js";

let driver;

const firefoxOptions = new firefox.Options();

export async function getDriver() {
  if (!driver) {
    driver = await new Builder()
      .forBrowser(Browser.FIREFOX)
      .setFirefoxOptions(firefoxOptions)
      .build();
  }
  return driver;
}

export async function closeDriver() {
  if (driver) {
    await driver.quit();
    driver = null;
  }
}
