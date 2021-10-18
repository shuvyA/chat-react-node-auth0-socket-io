export const ACCESS_TOKEN = "access_token";

const isProduction = process.env.NODE_ENV === "production";

export const BASE_API_URL = isProduction
  ? ''
  : process.env.REACT_APP_BASE_API_URL_DEV;

export const MEDIA_QUERY_MOBILE = 600;
