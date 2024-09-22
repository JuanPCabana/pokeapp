interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}

const makeQueryParams = (params: QueryParams) => {
  console.log("🚀 ~ makeQueryParams ~ params:", params);
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
