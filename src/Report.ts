export const TEST_HEADER = "aXe - ";
export interface AccessibiltyResult {
  msg: string;
  content: { specName?: string; stackTrace?: string };
}

export class Report {
  private _records: AccessibiltyResult[] = [];

  private add(record: AccessibiltyResult) {
    this._records.push(record);
  }

  private exists(value: AccessibiltyResult) {
    return (
      this._records.find(
        (item) =>
          item.msg === value.msg &&
          item.content.specName === value.content.specName
      ) !== undefined
    );
  }

  get records() {
    return [...this._records];
  }

  get hasErrors() {
    return this.records.length > 0;
  }

  createRecord = (result: any) => {
    const label = result.nodes.length === 1 ? " element " : " elements ";
    let msg = result.nodes.reduce((msg: any, node: any) => {
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
    const record: AccessibiltyResult = {
      msg,
      content: { specName: TEST_HEADER + result.help },
    };

    if (!this.exists(record)) {
      this.add(record);
    }
  };
}
