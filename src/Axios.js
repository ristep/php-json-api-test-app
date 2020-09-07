import axios from "axios";

const axParams = {
  baseURL: "http://phptest.sman/php-json-api/",
  headers: {
    Authorization: "dummy-key",
    "Content-type": "application/json",
  },
};

const Axios = axios.create(axParams);

export default Axios;