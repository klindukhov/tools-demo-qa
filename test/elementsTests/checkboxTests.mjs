import { By, until } from "selenium-webdriver";
import { getDriver } from "../../utils/webDriverSetup.mjs";
import { expect } from "chai";

describe("Check box page", async () => {
  let driver;

  const home = () =>
    driver.findElement(By.xpath('//*[@id="tree-node"]/ol/li/span'));
  const desktop = () =>
    driver.findElement(By.xpath('//*[@id="tree-node"]/ol/li/ol/li[1]/span'));
  const notes = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[1]/ol/li[1]/span')
    );
  const commands = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[1]/ol/li[2]/span')
    );
  const documents = () =>
    driver.findElement(By.xpath('//*[@id="tree-node"]/ol/li/ol/li[2]/span'));
  const workspace = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/span')
    );
  const react = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/ol/li[1]/span')
    );
  const angular = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/ol/li[2]/span')
    );
  const veu = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/ol/li[3]/span')
    );
  const office = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/span')
    );
  const publicFile = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[1]/span')
    );
  const privateFile = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[2]/span')
    );
  const classified = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[3]/span')
    );
  const general = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[4]/span')
    );
  const downloads = () =>
    driver.findElement(By.xpath('//*[@id="tree-node"]/ol/li/ol/li[3]/span'));
  const wordFile = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[3]/ol/li[1]/span')
    );
  const excelFile = () =>
    driver.findElement(
      By.xpath('//*[@id="tree-node"]/ol/li/ol/li[3]/ol/li[2]/span')
    );

  const collapseAll = () =>
    driver.findElement(By.xpath('//*[@id="tree-node"]/div/button[2]'));
  const expandAll = () =>
    driver.findElement(By.xpath('//*[@id="tree-node"]/div/button[1]'));

  const selectedList = () => driver.findElement(By.xpath('//*[@id="result"]'));

  const getExpandButton = async (element) =>
    await element.findElement(
      By.xpath('//button[@class="rct-collapse rct-collapse-btn"]')
    );

  const isExpanded = async (element) =>
    (
      await (await element.findElement(By.xpath(".."))).getAttribute("class")
    ).includes("rct-node-expanded");

  before(async () => {
    driver = await getDriver();
    await driver.get("https://demoqa.com/checkbox");
    await driver.wait(until.urlIs("https://demoqa.com/checkbox"));
  });

  it("contains Home directory", async () => {
    expect(await home().isDisplayed()).to.be.true;
  });
  it("contains expand all button", async () => {
    expect(await collapseAll().isDisplayed()).to.be.true;
  });
  it("contains collapse all button", async () => {
    expect(await expandAll().isDisplayed()).to.be.true;
  });
  context("Home directory", async () => {
    it("can be partially expanded", async () => {
      await (await getExpandButton(home())).click();

      await driver.wait(async () => {
        return await isExpanded(home());
      }, 2000);

      for (let element of [home, desktop, documents, downloads]) {
        expect(await element().isDisplayed()).to.be.true;
      }
    });
    it("can be partially collapsed", async () => {
      await (await getExpandButton(home())).click();

      await driver.wait(async () => {
        return !(await isExpanded(home()));
      }, 2000);

      expect(await home().isDisplayed()).to.be.true;

      for (let element of [desktop, documents, downloads]) {
        try {
          await element();
        } catch (error) {
          expect(error.name).to.contain("NoSuchElementError");
        }
      }
    });
    it("can be fully expanded", async () => {
      await (await expandAll()).click();

      await driver.wait(async () => {
        return await isExpanded(home());
      }, 2000);

      expect(await home().isDisplayed()).to.be.true;

      for (let element of [
        home,
        desktop,
        notes,
        commands,
        documents,
        workspace,
        react,
        angular,
        veu,
        office,
        publicFile,
        privateFile,
        classified,
        general,
        downloads,
        wordFile,
        excelFile,
      ]) {
        expect(await element().isDisplayed()).to.be.true;
      }
    });
    it("can be fully collapsed", async () => {
      await (await collapseAll()).click();

      await driver.wait(async () => {
        return !(await isExpanded(home()));
      }, 2000);

      for (let element of [
        desktop,
        notes,
        commands,
        documents,
        workspace,
        react,
        angular,
        veu,
        office,
        publicFile,
        privateFile,
        classified,
        general,
        downloads,
        wordFile,
        excelFile,
      ]) {
        try {
          await element();
        } catch (error) {
          expect(error.name).to.contain("NoSuchElementError");
        }
      }
    });
  });
});
