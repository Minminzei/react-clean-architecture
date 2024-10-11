const getKeys = <T extends { [key: string]: unknown }>(obj: T): (keyof T)[] =>
  Object.keys(obj);

type Nil = null | undefined;
type Empty = Nil | "" | false;

function isNil(data: unknown): data is Nil {
  return data === null || data === undefined;
}

function isEmpty(data: unknown): data is Empty {
  return data === null || data === undefined || data === "" || data === false;
}

function isString(data: unknown): data is string {
  return typeof data === "string";
}

function isNumber(data: unknown): data is number {
  return typeof data === "number";
}

function truncate(
  words: string | null | undefined,
  params: {
    length: number;
    omission?: string;
  }
): string {
  if (isNil(words)) {
    return "";
  }
  const { length, omission } = params;
  if (words.length <= length) {
    return words;
  }
  return `${words.slice(0, length)}${omission ?? "..."}`;
}

function max(collection: (number | undefined | null)[]): number | null {
  if (collection.length === 0) {
    return null;
  }
  const numericCollection = collection.filter(isNumber);
  return Math.max(...numericCollection);
}

function min(collection: (number | undefined | null)[]): number | null {
  if (collection.length === 0) {
    return null;
  }
  const numericCollection = collection.filter(isNumber);
  return Math.min(...numericCollection);
}

function head<T>(collection: T[] | undefined | null) {
  if (isNil(collection) || collection.length === 0) {
    return undefined;
  }
  return collection[0];
}

function numberFormat(
  data: string | number | null | undefined,
  option: {
    threshold?: number;
    unit?: string;
    underUnit?: string;
    prefix?: string;
  }
) {
  const target = Number(data);
  if (!isNil(data) && !Number.isNaN(target)) {
    if (!isNil(option.threshold)) {
      if (target < option.threshold) {
        return `${option.prefix ?? ""}${Number(data).toLocaleString()}${
          option.underUnit ?? ""
        }`;
      }
      const summary = Math.round((target / option.threshold) * 10) / 10;
      return `${option.prefix ?? ""}${summary}${option.unit ?? ""}`;
    }
    return `${option.prefix ?? ""}${Number(data).toLocaleString()}`;
  }
  return "";
}

export {
  getKeys,
  truncate,
  isNil,
  isEmpty,
  isString,
  isNumber,
  max,
  min,
  head,
  numberFormat,
};
