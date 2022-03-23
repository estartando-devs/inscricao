const { REACT_APP_BASE_URL_DEV, REACT_APP_BASE_URL_STG, REACT_APP_BASE_URL_PROD } = process.env;

const STAGES = {
  dev: {
    BASE_URL: REACT_APP_BASE_URL_DEV,
  },
  stg: {
    BASE_URL: REACT_APP_BASE_URL_STG,
  },
  prod: {
    BASE_URL: REACT_APP_BASE_URL_PROD,
  },
};

const env = process.env.REACT_APP_STAGE || "prod";
const config = STAGES[env].BASE_URL;
export default config;
