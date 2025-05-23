import { By, error, until } from "selenium-webdriver";
import { getDriver } from "../../utils/webDriverSetup.mjs";
import { expect } from "chai";

describe("Web Tables Page", async () => {
  let driver;

  const getTable = async () =>
    await driver.findElement(
      By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]/div[3]/div[1]/div[2]')
    );

  const getTableData = async () => {
    const table = await getTable();
    const data = [];
    for (let row of await table.findElements(By.xpath("./*"))) {
      const entry = [];
      for (let cell of await row.findElements(By.xpath("./div/*"))) {
        entry.push(await cell.getText());
      }
      if (entry[0] != " ") {
        data.push(entry.slice(0, 6));
      }
    }
    return data;
  };

  const firstNameInput = async () =>
    await driver.findElement(By.xpath('//*[@id="firstName"]'));
  const lastNameInput = async () =>
    await driver.findElement(By.xpath('//*[@id="lastName"]'));
  const emailInput = async () =>
    await driver.findElement(By.xpath('//*[@id="userEmail"]'));
  const ageInput = async () =>
    await driver.findElement(By.xpath('//*[@id="age"]'));
  const salaryInput = async () =>
    await driver.findElement(By.xpath('//*[@id="salary"]'));
  const departmentInput = async () =>
    await driver.findElement(By.xpath('//*[@id="department"]'));

  before(async () => {
    driver = await getDriver();
    await driver.get("https://demoqa.com/webtables");
    await driver.wait(until.urlIs("https://demoqa.com/webtables"));
  });

  it("contains all the UI elements", async () => {
    const addButton = await driver.findElement(
      By.xpath('//*[@id="addNewRecordButton"]')
    );
    const searchBar = await driver.findElement(
      By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]/div[2]/div[2]/div')
    );
    const webTable = await driver.findElement(
      By.xpath('//*[@id="app"]/div/div/div/div[2]/div[2]/div[3]')
    );

    for (let element of [addButton, searchBar, webTable]) {
      expect(await element.isDisplayed()).to.be.true;
    }
  });

  context("Search", async () => {
    const getSearchBox = async () =>
      await driver.findElement(By.xpath('//*[@id="searchBox"]'));

    it("is enabled for text input", async () => {
      expect(await (await getSearchBox()).isEnabled()).to.be.true;
    });

    it("causes correct results to be displayed", async () => {
      (await getSearchBox()).sendKeys("Vega");

      expect((await getTableData()).length).to.equal(1);
      expect((await getTableData())[0].join("")).to.equal(
        "CierraVega39cierra@example.com10000Insurance"
      );
    });

    it('causes "No Rows found" to be displayed', async () => {
      await (await getSearchBox()).sendKeys("gibberish");

      expect((await getTableData()).length).to.equal(0);
    });
  });

  context("Adding an Entry", async () => {
    it("pressing the button opens a Form");
    it("submitting a correctly filled out form ads an Entry to the Table");
    it("the newly created Entry contains correct information");
  });

  context("Deleting an Entry", async () => {
    it("an Entry can be deleted");
    it("the deleted Entry is not displayed in the Table");
  });

  context("Editing an Entry", async () => {
    it("an Entry can be edited");
    it("the information is saved correctly");
  });

  context("Table", async () => {
    it("contains headers, rows and navigation sections");
    it("contains all the Columns");
    it("the entries can be sorted by any column");
    it("the number of rows is displayed");
    it("the number of rows can be changed manually");
    it("the page number can be changed manually");
    it("the page number can be changed using previous next buttons");
    it("th rows can be resized");
  });

  context("Form", async () => {
    const isFormOpen = async () => {
      try {
        return await (
          await driver.findElement(By.xpath("/html/body/div[4]/div/div"))
        ).isDisplayed();
      } catch (error) {
        return !error.name.includes("NoSuchElementError");
      }
    };

    const openForm = async () => {
      try {
        await driver.findElement(By.xpath("/html/body/div[4]/div/div"));
      } catch {
        await driver
          .findElement(By.xpath('//*[@id="addNewRecordButton"]'))
          .click();
      }
    };

    it("opens upon the press of Add button", async () => {
      await openForm();
      expect(await isFormOpen()).to.be.true;
    });

    it("closes after pressing x or clicking off", async () => {
      await openForm();
      await driver
        .findElement(By.xpath("/html/body/div[4]/div/div/div[1]/button"))
        .click();

      expect(await isFormOpen()).to.be.false;

      await openForm();

      const actions = driver.actions({ async: true });
      await (await actions.move({ x: 10, y: 10 })).click().perform();

      await driver.wait(async () => !(await isFormOpen()), 2000);

      expect(await isFormOpen()).to.be.false;
    });
    it("contains all the required fields", async () => {
      await openForm();
      const form = await driver.findElement(
        By.xpath("/html/body/div[4]/div/div/div[2]")
      );

      let labels = [];
      for (let labelElement of await form.findElements(By.xpath(".//label"))) {
        labels.push(await labelElement.getText());
      }

      for (let labelName of [
        "First Name",
        "Last Name",
        "Email",
        "Age",
        "Salary",
        "Department",
      ]) {
        expect(labels).to.contain(labelName);
      }

      let inputs = [];
      for (let inputElement of await form.findElements(By.xpath(".//input"))) {
        inputs.push(await inputElement.getAttribute("placeholder"));
      }

      for (let inputName of [
        "First Name",
        "Last Name",
        "name@example.com",
        "Age",
        "Salary",
        "Department",
      ]) {
        expect(inputs).to.contain(inputName);
      }
    });

    it("can be submitted correctly filled out", async () => {
      await openForm();

      await (await firstNameInput()).sendKeys("Name");
      await (await lastNameInput()).sendKeys("Surname");
      await (await emailInput()).sendKeys("email@ex.com");
      await (await ageInput()).sendKeys("4");
      await (await salaryInput()).sendKeys("500");
      await (await departmentInput()).sendKeys("Sales");

      await (await driver.findElement(By.id("submit"))).click();

      expect(await isFormOpen()).to.be.false;
    });
    it("cannot be submitted incorrectly filled out", async () => {
      await openForm();

      await (await firstNameInput()).sendKeys("Name");
      await (await lastNameInput()).sendKeys("Surname");
      await (await emailInput()).sendKeys("emailex.com");
      await (await ageInput()).sendKeys("4");
      await (await salaryInput()).sendKeys("500");
      await (await departmentInput()).sendKeys("Sales");

      await (await driver.findElement(By.id("submit"))).click();

      expect(await isFormOpen()).to.be.true;
    });

    it("provides a visual clue for incorrectly filled out fields");
  });
});
