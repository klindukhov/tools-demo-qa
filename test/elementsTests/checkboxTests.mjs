import { By, until } from "selenium-webdriver";
import { getDriver } from "../../utils/webDriverSetup.mjs";
import { expect } from "chai";

describe("Check box page", async () => {
  let driver;

  const checkBoxTreeWrapper = () =>
    driver.findElement(By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]'));
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
      By.xpath('./button[@class="rct-collapse rct-collapse-btn"]')
    );

  const isExpanded = async (element) =>
    (
      await (await element.findElement(By.xpath(".."))).getAttribute("class")
    ).includes("rct-node-expanded");

  const getCheckBox = async (element) =>
    await element.findElement(By.xpath("./label[1]"));

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
    it("can be selected", async () => {
      await (await getCheckBox(home())).click();

      await driver.wait(async () => {
        const wrapperElements = await checkBoxTreeWrapper().findElements(
          By.xpath("./*")
        );
        return wrapperElements.length === 2;
      }, 2000);

      const selectedElementsString = await selectedList().getText();

      for (let element of [
        "desktop",
        "notes",
        "commands",
        "documents",
        "workspace",
        "react",
        "angular",
        "veu",
        "office",
        "public",
        "private",
        "classified",
        "general",
        "downloads",
        "wordFile",
        "excelFile",
      ]) {
        expect(selectedElementsString).to.contain(element);
      }
    });
    it("can be deselected", async () => {
      await (await home().findElement(By.xpath("./label[1]"))).click();

      await driver.wait(async () => {
        const wrapperElements = await checkBoxTreeWrapper().findElements(
          By.xpath("./*")
        );
        return wrapperElements.length === 1;
      }, 2000);

      try {
        await selectedList().getText();
      } catch (error) {
        expect(error.name).to.contain("NoSuchElementError");
      }
    });
  });

  context("Subdirectories", async () => {
    before(async () => {
      await (await getExpandButton(home())).click();
    });

    it("can be expanded", async () => {
      await (await getExpandButton(desktop())).click();
      await driver.wait(async () => {
        return await isExpanded(desktop());
      }, 2000);

      for (let element of [
        home,
        desktop,
        notes,
        commands,
        documents,
        downloads,
      ]) {
        expect(await element().isDisplayed()).to.be.true;
      }

      await (await getExpandButton(documents())).click();
      await driver.wait(async () => {
        return await isExpanded(documents());
      }, 2000);

      for (let element of [
        home,
        desktop,
        notes,
        commands,
        documents,
        workspace,
        office,
        downloads,
      ]) {
        expect(await element().isDisplayed()).to.be.true;
      }

      await (await getExpandButton(downloads())).click();
      await driver.wait(async () => {
        return await isExpanded(downloads());
      }, 2000);

      for (let element of [
        home,
        desktop,
        notes,
        commands,
        documents,
        workspace,
        office,
        downloads,
        wordFile,
        excelFile,
      ]) {
        expect(await element().isDisplayed()).to.be.true;
      }
    });
    it("can be collapsed", async () => {
      await (await getExpandButton(desktop())).click();
      await (await getExpandButton(documents())).click();
      await (await getExpandButton(downloads())).click();

      for (let element of [
        notes,
        commands,
        workspace,
        office,
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
    it("can be selected", async () => {
      for (let element of [
        [desktop, ["desktop", "notes", "commands"]],
        [
          documents,
          [
            "documents",
            "workspace",
            "react",
            "angular",
            "veu",
            "office",
            "public",
            "private",
            "classified",
            "general",
          ],
        ],
        [downloads, ["downloads", "wordFile", "excelFile"]],
      ]) {
        await (await getCheckBox(element[0]())).click();

        await driver.wait(async () => {
          const wrapperElements = await checkBoxTreeWrapper().findElements(
            By.xpath("./*")
          );
          return wrapperElements.length === 2;
        }, 2000);

        const selectedElementsString = await selectedList().getText();

        for (let elementName of element[1]) {
          expect(selectedElementsString).to.contain(elementName);
        }
      }
    });
    it("can be deselected", async () => {
      await (await getCheckBox(desktop())).click();
      await (await getCheckBox(documents())).click();
      await (await getCheckBox(downloads())).click();

      await driver.wait(async () => {
        const wrapperElements = await checkBoxTreeWrapper().findElements(
          By.xpath("./*")
        );
        return wrapperElements.length === 1;
      }, 2000);

      try {
        await selectedList();
      } catch (error) {
        expect(error.name).to.contain("NoSuchElementError");
      }
    });
  });

  context("Checkboxes", async () => {
    it("display correct icon while not selected", async () => {
      await expandAll().click();
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
        const checkboxElement = await getCheckBox(element());

        const svgElement = await checkboxElement.findElement(
          By.xpath('.//span[@class="rct-checkbox"]/*[local-name()="svg"]')
        );

        expect(await svgElement.getAttribute("class")).to.contain(
          "rct-icon-uncheck"
        );
      }
    });
    it("display correct icon while selected", async () => {
      await (await getCheckBox(home())).click();

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
        const checkboxElement = await getCheckBox(element());

        const svgElement = await checkboxElement.findElement(
          By.xpath('.//span[@class="rct-checkbox"]/*[local-name()="svg"]')
        );

        expect(await svgElement.getAttribute("class")).to.contain(
          "rct-icon-check"
        );
      }
      await (await getCheckBox(home())).click();
    });
    it("display correct icon while partially selected", async () => {
      await driver.executeScript("arguments[0].scrollIntoView(true);", veu());
      await (await getCheckBox(veu())).click();

      for (let element of [home, documents, workspace]) {
        const checkboxElement = await getCheckBox(element());

        const svgElement = await checkboxElement.findElement(
          By.xpath('.//span[@class="rct-checkbox"]/*[local-name()="svg"]')
        );

        expect(await svgElement.getAttribute("class")).to.contain(
          "rct-icon-half-check"
        );
      }

      for (let element of [
        desktop,
        notes,
        commands,
        react,
        angular,
        office,
        publicFile,
        privateFile,
        classified,
        general,
        downloads,
        wordFile,
        excelFile,
      ]) {
        const checkboxElement = await getCheckBox(element());

        const svgElement = await checkboxElement.findElement(
          By.xpath('.//span[@class="rct-checkbox"]/*[local-name()="svg"]')
        );

        expect(await svgElement.getAttribute("class")).to.contain(
          "rct-icon-uncheck"
        );
      }
    });
  });

  context("Expand arrows", async () => {
    it("displays arrow right while collapsed");
    it("displays arrow down while expanded");
  });
});
