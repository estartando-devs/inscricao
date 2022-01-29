const STAGES = {
  dev: {
    BASE_URL: "http://localhost:5001/estartando-devs-platform/us-central1/platform/subscribe",
  },
  stg: {
    BASE_URL: "",
  },
  prod: {
    BASE_URL: "https://us-central1-estartando-devs-platform.cloudfunctions.net/platform/subscribe",
  },
};

const env = process.env.REACT_APP_STAGE || "prod";
const config = STAGES[env];

export default config;
