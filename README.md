# Tools QA Demo test suite

## Overview

This repository contains an automated test suite built using **Selenium WebDriver**, **Mocha**, and **Mochawesome** for testing various UI elements of [Demo Tools QA](https://demoqa.com/) web page.

## Prerequisites

Ensure you have the following installed before running the tests:

- **Node.js** (latest LTS recommended)
- **npm** (comes with Node.js)

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/klindukhov/tools-demo-qa.git
cd tools-demo-qa
npm i
```

## Running Tests

To execute tests, run:

```sh
npm test
```

## Test Reports

Mochawesome generates HTML test reports. After running tests, find reports in:

```sh
./mochawesome-report/mochawesome.html
```

## Project structure

```sh
📂 tools-demo-qa
│── 📂 test                 # Test scripts
│── 📂 utils                # Helper functions
│── 📂 mochawesome-report   # Generated reports
│── 📜 .mocharc.cjs         # Mocha configuration
│── 📜 testSetup.mjs        # Tests setup and teardown
│── 📜 package.json         # Dependencies and scripts
│── 📜 README.md            # Project summary
```
