import { ProtractorPlugin, ProtractorBrowser } from "protractor";
import * as webdriver from "selenium-webdriver";
import { Report } from "./Report";
const AxeBuilder = require("axe-webdriverjs");

export class AxeAccessibility implements ProtractorPlugin {
  config: any;
  private report: Report = new Report();
  axe: any;

  private fail(
    message?: string,
    info?: { specName?: string; stackTrace?: string }
  ): void {
    const { warnOnly } = this.config;
    if (warnOnly) {
      this.addWarning && this.addWarning(message, info);
    } else {
      this.addFailure && this.addFailure(message, info);
    }
  }

  teardown(): void | Promise<void> {
    return new Promise((resolve) => {
      if (this.report.hasErrors) {
        this.report.records.forEach(({ msg, content }) =>
          this.fail(msg, content)
        );
      } else {
        this.addSuccess && this.addSuccess();
      }
      resolve();
    });
  }

  waitForPromise(browser: ProtractorBrowser): webdriver.promise.Promise<void> {
    const processAxeResults = (results: any) =>
      results.violations.forEach(this.report.createRecord);

    return new Promise((resolve) =>
      AxeBuilder(browser.driver)
        .options(this.axe)
        .analyze((results: any) => {
          resolve(results);
        })
    ).then(processAxeResults);
  }

  addFailure(
    message?: string,
    info?: { specName?: string; stackTrace?: string }
  ): void {}
  addSuccess(info?: { specName?: string }): void {}
  addWarning(
    message?: string,
    info?: { specName?: string; stackTrace?: string }
  ): void {}
}
