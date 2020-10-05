export const TEST_HEADER = "Accessibility report : ";
export interface ReportError {
  specName: string;
  helpUrl: string;
  elements: Set<string>;
}
export interface AccessibilityResult {
  msg: string;
  content: { specName?: string; stackTrace?: string };
}
export class Report {
  private errors: Map<string, ReportError> = new Map();
  get records(): AccessibilityResult[] {
    return Array.from(this.errors.values(), (error) => {
      const label = error.elements.size === 1 ? " element " : " elements ";
      const elements = Array.from(error.elements).reduce(
        (msg, element) => msg + "\t\t" + element + "\n\n",
        "\n"
      );
      const message =
        `\n\n\t` +
        `${error.elements.size}${label} failed:\n` +
        `${elements}\t` +
        `${error.helpUrl}\n\n`;
      return {
        msg: message,
        content: { specName: error.specName },
      };
    });
  }
  get hasErrors(): boolean {
    return this.errors.size > 0;
  }
  createRecord = ({
    id,
    help,
    helpUrl,
    nodes,
  }: {
    id: string;
    help: string;
    helpUrl: string;
    nodes: any[];
  }): void => {
    if (!this.errors.has(id)) {
      this.errors.set(id, {
        specName: TEST_HEADER + help,
        helpUrl,
        elements: new Set(),
      });
    }
    nodes
      .map((node: any) => `${node.target.join("")}\n\t\t${node.html}`)
      .forEach((element) => this.errors.get(id)!.elements.add(element));
  };
}
