"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxeAccessibility = void 0;
const Report_1 = require("./Report");
const AxeBuilder = require("axe-webdriverjs");
class AxeAccessibility {
    constructor() {
        this.report = new Report_1.Report();
    }
    fail(message, info) {
        const { warnOnly } = this.config;
        if (warnOnly) {
            this.addWarning && this.addWarning(message, info);
        }
        else {
            this.addFailure && this.addFailure(message, info);
        }
    }
    teardown() {
        return new Promise((resolve) => {
            if (this.report.hasErrors) {
                this.report.records.forEach(({ msg, content }) => this.fail(msg, content));
            }
            else {
                this.addSuccess && this.addSuccess();
            }
            resolve();
        });
    }
    waitForPromise(browser) {
        const processAxeResults = (results) => results.violations.forEach(this.report.createRecord);
        return new Promise((resolve) => AxeBuilder(browser.driver)
            .options(this.axe)
            .analyze((results) => {
            resolve(results);
        })).then(processAxeResults);
    }
    addFailure(message, info) { }
    addSuccess(info) { }
    addWarning(message, info) { }
}
exports.AxeAccessibility = AxeAccessibility;
