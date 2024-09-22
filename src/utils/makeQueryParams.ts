interface QueryParams {
  [key: string]: string | number | boolean;
}

const makeQueryParams = (params: QueryParams) => {
  return Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
};

export default makeQueryParams;
