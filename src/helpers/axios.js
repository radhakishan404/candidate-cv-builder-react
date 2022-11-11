import * as coreAxios from "axios";
import { baseUrl } from "./constants";
import { setSnackBar } from "../store/common/commonSlice";

export const axios = coreAxios.default.create({
  baseURL: baseUrl,
});

const axiosInterceptor = (dispatch) => {
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      const { method } = response.config;
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      if (method !== "get") {
        dispatch(
          setSnackBar({
            open: true,
            message: response?.data?.message || "success",
            severity: "success",
          })
        );
      }
      return response.data;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response erro
      // console.log(error);
      // alert(error?.response?.data?.message || error.message);
      dispatch(
        setSnackBar({
          open: true,
          message: error?.response?.data?.message || error.message,
          severity: "error",
        })
      );

      return Promise.reject(error);
      // return false;
    }
  );
};

export default axiosInterceptor;
