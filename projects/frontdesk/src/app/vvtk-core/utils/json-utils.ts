export class TryJSON {
  static parse(text: string, reviver?: (key: any, value: any) => any, defaultValue?: any) {
    try {
      return JSON.parse(text, reviver);
    } catch (error) {
      return defaultValue;
    }
  }

  static stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number, defaultValue?: any) {
    try {
      return JSON.stringify(value, replacer, space);
    } catch (error) {
      return defaultValue;
    }
  }
}
