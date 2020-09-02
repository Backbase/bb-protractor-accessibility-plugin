"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = exports.TEST_HEADER = void 0;
exports.TEST_HEADER = "Accessibility report : ";
class Report {
    constructor() {
        this._records = [];
        this.createRecord = (result) => {
            const label = result.nodes.length === 1 ? " element " : " elements ";
            let msg = result.nodes.reduce((msg, node) => {
                return msg + "\t\t" + node.html + "\n";
            }, "\n");
            msg =
                "\n\t\t" +
                    result.nodes.length +
                    label +
                    "failed:" +
                    msg +
                    "\n\n\t\t" +
                    result.helpUrl;
            const record = {
                msg,
                content: { specName: exports.TEST_HEADER + result.help },
            };
            if (!this.exists(record)) {
                this.add(record);
            }
        };
    }
    add(record) {
        this._records.push(record);
    }
    exists(value) {
        return (this._records.find((item) => item.msg === value.msg &&
            item.content.specName === value.content.specName) !== undefined);
    }
    get records() {
        return [...this._records];
    }
    get hasErrors() {
        return this.records.length > 0;
    }
}
exports.Report = Report;
