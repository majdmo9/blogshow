import { convertKeysToCamelCase } from "@blogshow/utils/camelize";
import axios from "axios";
import { fetchAuthSession, signOut } from "aws-amplify/auth";

const Axios = axios.create({ headers: { "Cache-Control": "no-cache", Pragma: "no-cache", Expires: "0" } });

Axios.interceptors.request.use(async config => {
  if (config.params) {
    config.params = convertKeysToCamelCase(config.params);
  }

  // attempt to attach the auth header to the request
  try {
    if (!(config as any).headers["Authorization"]) {
      const authHeader = (await fetchAuthSession()).tokens?.idToken?.toString();
      (config as any).headers.authorization = authHeader;

      return config;
    }
  } catch (e) {
    return config;
  }
  return config;
});

// catch 401 responses
Axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error?.response?.status === 401) {
      signOut();
    }
    return Promise.reject(error);
  }
);

export default Axios;
