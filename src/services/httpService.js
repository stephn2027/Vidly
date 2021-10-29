import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';


//bi directional dependencies if auth and http are depending on each to pass data. there should be one higher level heirarchy between the two. in this case, it's our http.

axios.defaults.baseURL=process.env.ReaREACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log("logging the error", error);
    // alert("An unexpected error occurred.");
    logger.log(error);
    toast.error('An unexpected error occurred.');
  }

  return Promise.reject(error);
});

export function setJwt(jwt){
axios.defaults.headers.common['x-auth-token'] = jwt;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
