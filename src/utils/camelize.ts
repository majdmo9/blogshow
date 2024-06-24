import mapKeys from "lodash/mapKeys";
import camelCase from "lodash/camelCase";

export const convertKeysToCamelCase = (obj: Record<string, any>) => {
  return mapKeys(obj, (_value, key) => camelCase(key));
};
