interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * Make query params
 * @param {QueryParams} params - Query params
 * @returns {string} Query params string
 * @example
 * makeQueryParams({ name: "pikachu", type: "electric" });
 * // returns "name=pikachu&type=electric"
 */
const makeQueryParams = (params: QueryParams) => {
  return Object.keys(params)
    .filter(
      (key) =>
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== "none"
    )
    .map((key) => `${key}=${params[key]}`)
    .join("&");
};

export default makeQueryParams;
